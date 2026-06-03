import { google } from "googleapis";
import type { Project } from "@/types/project";
import type { Resource } from "@/types/resource";

function normalizePrivateKey(privateKey: string | undefined): string | undefined {
  if (!privateKey) return undefined;

  return privateKey.trim().replace(/^['"]|['"]$/g, "").replace(/\\n/g, "\n");
}

function hasDriveCredentials(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY)
  );
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

export async function getDriveFiles(folderId: string) {
  const drive = google.drive({ version: "v3", auth: getAuth() });

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields:
      "files(id, name, mimeType, size, webViewLink, webContentLink, thumbnailLink, description)",
    orderBy: "name",
  });

  return response.data.files ?? [];
}

/**
 * List subfolders inside a parent folder.
 */
export async function getDriveSubfolders(parentFolderId: string) {
  const drive = google.drive({ version: "v3", auth: getAuth() });

  const response = await drive.files.list({
    q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id, name, description)",
    orderBy: "name",
  });

  return response.data.files ?? [];
}

/**
 * List image files inside a folder.
 */
export async function getDriveImages(folderId: string) {
  const drive = google.drive({ version: "v3", auth: getAuth() });

  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: "files(id, name, mimeType, thumbnailLink)",
    orderBy: "name",
  });

  return response.data.files ?? [];
}

/**
 * Returns an authenticated image URL via our API proxy.
 * Works with private Drive files (no public sharing needed).
 */
export function getDriveImageUrl(fileId: string): string {
  return `/api/drive-image/${encodeURIComponent(fileId)}`;
}

export function getDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function getDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
}

/**
 * Returns a Drive image URL if the env var is set, otherwise falls back to a local path.
 */
export function getDriveImageOrFallback(envVar: string, fallback: string): string {
  const fileId = process.env[envVar];
  if (fileId) return getDriveImageUrl(fileId);
  return fallback;
}

/**
 * Fetches a JSON file from Drive by its file ID and parses it.
 */
export async function getDriveJsonFile<T>(fileId: string): Promise<T> {
  const drive = google.drive({ version: "v3", auth: getAuth() });

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "text" }
  );

  return JSON.parse(response.data as string) as T;
}

/**
 * Fetch projects from a Google Drive folder structure:
 *   GOOGLE_DRIVE_PROJECTS_FOLDER_ID/
 *     projects.json  — array of Project metadata (without image URLs)
 *     <project-slug>/  — subfolder per project containing images
 *       cover.jpg
 *       1.jpg, 2.jpg, ...
 *
 * The projects.json should have shape: Array<Omit<Project, 'coverImage' | 'images'>>
 * Images are resolved automatically from subfolders.
 */
export async function getProjectsFromDrive(): Promise<Project[]> {
  const projectsFolderId = process.env.GOOGLE_DRIVE_PROJECTS_FOLDER_ID;
  if (!projectsFolderId || projectsFolderId.startsWith("your_")) {
    console.warn("GOOGLE_DRIVE_PROJECTS_FOLDER_ID not set, returning empty projects");
    return [];
  }

  if (!hasDriveCredentials()) {
    console.warn("Google Drive credentials not set, returning empty projects");
    return [];
  }

  try {
    // 1. Find and fetch projects.json in the folder
    const files = await getDriveFiles(projectsFolderId);
    const jsonFile = files.find(
      (f) => f.name?.toLowerCase() === "projects.json" && f.id
    );

    if (!jsonFile?.id) {
      console.warn("projects.json not found in Drive projects folder");
      return [];
    }

    type ProjectMeta = Omit<Project, "coverImage" | "images"> & {
      coverImage?: string;
      images?: string[];
    };
    const projectsMeta = await getDriveJsonFile<ProjectMeta[]>(jsonFile.id);

    // 2. Get subfolders (one per project slug)
    const subfolders = await getDriveSubfolders(projectsFolderId);
    const folderMap = new Map(subfolders.map((f) => [f.name!, f.id!]));

    // 3. Resolve images for each project
    const projects: Project[] = await Promise.all(
      projectsMeta.map(async (meta) => {
        const folderId = folderMap.get(meta.slug);
        if (!folderId) {
          return {
            ...meta,
            coverImage: meta.coverImage ?? "/images/placeholder.jpg",
            images: meta.images ?? [],
          } as Project;
        }

        const images = await getDriveImages(folderId);
        const coverFile = images.find((img) =>
          img.name?.toLowerCase().startsWith("cover")
        );
        const otherImages = images.filter(
          (img) => !img.name?.toLowerCase().startsWith("cover")
        );

        return {
          ...meta,
          coverImage: coverFile?.id
            ? getDriveImageUrl(coverFile.id)
            : meta.coverImage ?? "/images/placeholder.jpg",
          images: otherImages.map((img) => getDriveImageUrl(img.id!)),
        } as Project;
      })
    );

    return projects;
  } catch (error) {
    console.warn("Unable to load Google Drive projects, returning empty projects", error);
    return [];
  }
}

/**
 * Fetch resources/catalogue from a Google Drive folder.
 * Expects GOOGLE_DRIVE_RESOURCES_FOLDER_ID env var pointing to a folder
 * containing downloadable files (PDFs, docs, etc.)
 *
 * File descriptions in Drive are used as resource descriptions.
 * File names become titles (without extension).
 */
export async function getResourcesFromDrive(): Promise<Resource[]> {
  const resourcesFolderId = process.env.GOOGLE_DRIVE_RESOURCES_FOLDER_ID;
  if (!resourcesFolderId) {
    console.warn("GOOGLE_DRIVE_RESOURCES_FOLDER_ID not set, returning empty resources");
    return [];
  }

  if (!hasDriveCredentials()) {
    console.warn("Google Drive credentials not set, returning empty resources");
    return [];
  }

  try {
    const files = await getDriveFiles(resourcesFolderId);

    return files
      .filter((f) => f.id && f.name)
      .map((f) => {
        const name = f.name!;
        const ext = name.split(".").pop()?.toLowerCase() ?? "pdf";
        const title = name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        const sizeBytes = parseInt(f.size ?? "0", 10);
        const fileSize = sizeBytes > 1048576
          ? `${(sizeBytes / 1048576).toFixed(1)} MB`
          : `${Math.round(sizeBytes / 1024)} KB`;

        // Infer category from filename or description
        let category: Resource["category"] = "catalog";
        const lower = name.toLowerCase();
        if (lower.includes("guide") || lower.includes("care")) category = "guide";
        else if (lower.includes("standard") || lower.includes("spec")) category = "standards";
        else if (lower.includes("disclaim") || lower.includes("legal")) category = "legal";

        return {
          id: f.id!,
          title,
          description: (f.description as string) ?? "",
          fileUrl: getDriveDownloadUrl(f.id!),
          fileType: (ext === "pdf" || ext === "doc" || ext === "xlsx" ? ext : "pdf") as Resource["fileType"],
          fileSize,
          category,
          driveFileId: f.id!,
        };
      });
  } catch (error) {
    console.warn("Unable to load Google Drive resources, returning empty resources", error);
    return [];
  }
}