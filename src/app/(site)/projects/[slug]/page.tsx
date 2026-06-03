import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectsFromDrive } from "@/lib/googleDrive";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { CTAButton } from "@/components/ui/CTAButton";
import type { Project } from "@/types/project";

export const revalidate = 3600;

function normalizeSlug(value: string) {
  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return decoded
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findProjectBySlug(projects: Project[], routeSlug: string) {
  const normalizedRouteSlug = normalizeSlug(routeSlug);

  return projects.find(
    (project) =>
      normalizeSlug(project.slug) === normalizedRouteSlug ||
      normalizeSlug(project.title) === normalizedRouteSlug
  );
}

export async function generateStaticParams() {
  const projects = await getProjectsFromDrive();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjectsFromDrive();
  const project = findProjectBySlug(projects, slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjectsFromDrive();
  const project = findProjectBySlug(projects, slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="bg-warm-50">
      {/* ============== HERO ============== */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="max-site section-padding">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-warm-200 text-xs tracking-[0.25em] uppercase hover:text-gold-300 transition-colors group"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-1"
              />
              All Projects
            </Link>
          </div>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 lg:pb-24">
          <div className="max-site section-padding">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold-400" />
                <p className="text-gold-300 text-xs tracking-[0.3em] uppercase font-sans">
                  {project.category}
                </p>
                <span className="text-warm-300 text-xs">/</span>
                <p className="text-warm-300 text-xs tracking-[0.2em] uppercase font-mono">
                  {project.year}
                </p>
              </div>
              <h1 className="font-display italic text-warm-50 text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight text-balance">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INTRO / OVERVIEW ============== */}
      <section className="relative bg-warm-50 -mt-px">
        <div className="max-site section-padding py-section">
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-32">
                <p className="text-xs tracking-[0.3em] uppercase text-warm-500 font-sans">
                  Overview
                </p>
                <GoldDivider className="mt-4 w-12" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9">
              {project.description && (
                <p className="font-display text-display-md lg:text-3xl text-charcoal leading-[1.35] text-balance">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============== METADATA STRIP ============== */}
      <section className="bg-charcoal text-warm-50">
        <div className="max-site section-padding py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <MetaItem label="Year" value={String(project.year)} />
            <MetaItem
              label="Category"
              value={
                project.category.charAt(0).toUpperCase() +
                project.category.slice(1)
              }
            />
            {project.designer && (
              <MetaItem label="Design" value={project.designer} />
            )}
            {project.contractor && (
              <MetaItem label="Contractor" value={project.contractor} />
            )}
            {project.photographer && (
              <MetaItem label="Photography" value={project.photographer} />
            )}
          </div>
        </div>
      </section>

      {/* ============== GALLERY ============== */}
      {project.images.length > 0 && (
        <section className="bg-warm-50">
          <div className="max-site section-padding py-section">
            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-warm-500 font-sans">
                  Gallery
                </p>
                <h2 className="mt-4 font-display italic text-display-lg text-charcoal">
                  Selected views
                </h2>
                <GoldDivider className="mt-4 w-12" />
              </div>
              <p className="hidden md:block text-xs font-mono text-warm-500">
                {String(project.images.length).padStart(2, "0")} images
              </p>
            </div>

            <GalleryGrid images={project.images} title={project.title} />
          </div>
        </section>
      )}

      {/* ============== CTA ============== */}
      <section className="bg-warm-100">
        <div className="max-site section-padding py-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-warm-500 font-sans">
                Start a project
              </p>
              <h2 className="mt-4 font-display italic text-display-lg text-charcoal text-balance whitespace-pre-line">
                {"Have a vision in mind?\nLet's build it together."}
              </h2>
              <GoldDivider className="mt-6 w-12" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <CTAButton href="/contact" variant="filled">
                Book a Discovery Call
              </CTAButton>
              <CTAButton href="/projects" variant="outlined">
                View More Projects
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============== ADJACENT PROJECT NAV ============== */}
      {(prevProject || nextProject) && (
        <section className="bg-charcoal text-warm-50 border-t border-warm-800">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevProject ? (
              <AdjacentLink project={prevProject} direction="prev" />
            ) : (
              <div className="hidden md:block" />
            )}
            {nextProject ? (
              <AdjacentLink project={nextProject} direction="next" />
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </section>
      )}
    </article>
  );
}

/* ============== SUB-COMPONENTS ============== */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-gold-300 font-sans mb-3">
        {label}
      </p>
      <p className="font-display text-lg lg:text-xl text-warm-50 leading-tight">
        {value}
      </p>
    </div>
  );
}

function GalleryGrid({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6">
      {images.map((img, i) => {
        const span = getSpanForIndex(i, images.length);
        const aspect = getAspectForIndex(i);

        return (
          <div
            key={i}
            className={`${span} relative overflow-hidden rounded-sm bg-warm-200 group`}
          >
            <div className={`relative ${aspect}`}>
              <Image
                src={img}
                alt={`${title} — Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
              />
            </div>
            <span className="absolute top-4 left-4 text-xs font-mono text-warm-50/90 bg-charcoal/40 backdrop-blur-sm px-2 py-1 rounded-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function getSpanForIndex(index: number, total: number): string {
  if (total === 1) return "col-span-12";

  const pattern = index % 5;
  switch (pattern) {
    case 0:
      return "col-span-12";
    case 1:
      return "col-span-12 md:col-span-7";
    case 2:
      return "col-span-12 md:col-span-5";
    case 3:
      return "col-span-12 md:col-span-5";
    case 4:
      return "col-span-12 md:col-span-7";
    default:
      return "col-span-12";
  }
}

function getAspectForIndex(index: number): string {
  const pattern = index % 5;
  switch (pattern) {
    case 0:
      return "aspect-[16/9]";
    case 1:
      return "aspect-[4/3]";
    case 2:
      return "aspect-[4/5]";
    case 3:
      return "aspect-[3/4]";
    case 4:
      return "aspect-[4/3]";
    default:
      return "aspect-[4/3]";
  }
}

function AdjacentLink({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${encodeURIComponent(project.slug)}`}
      className={`group relative block p-10 lg:p-16 overflow-hidden ${
        isNext ? "md:text-right md:border-l border-warm-800" : ""
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <Image
          src={project.coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>

      <div className="relative z-10">
        <div
          className={`flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-gold-300 ${
            isNext ? "md:justify-end" : ""
          }`}
        >
          {!isNext && (
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-1"
            />
          )}
          <span>{isNext ? "Next Project" : "Previous Project"}</span>
          {isNext && (
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          )}
        </div>
        <h3 className="mt-4 font-display italic text-3xl lg:text-4xl text-warm-50 group-hover:text-gold-300 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-xs text-warm-400 font-mono uppercase tracking-wider">
          {project.category} · {project.year}
        </p>
      </div>
    </Link>
  );
}