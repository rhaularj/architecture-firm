export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: "pdf" | "doc" | "xlsx";
  fileSize: string;
  category: "catalog" | "guide" | "standards" | "legal";
  driveFileId?: string;
}
