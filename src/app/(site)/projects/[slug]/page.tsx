import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectsFromDrive } from "@/lib/googleDrive";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjectsFromDrive();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const projects = await getProjectsFromDrive();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const projects = await getProjectsFromDrive();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-site section-padding">
          <p className="text-gold-300 text-xs tracking-widest uppercase mb-2">
            {project.category} &mdash; {project.year}
          </p>
          <h1 className="font-display italic text-display-xl text-warm-50">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-section">
        <div className="max-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details sidebar */}
            <div className="space-y-6">
              {project.designer && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-warm-400">Designer</p>
                  <p className="font-display text-lg">{project.designer}</p>
                </div>
              )}
              {project.contractor && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-warm-400">Contractor</p>
                  <p className="font-display text-lg">{project.contractor}</p>
                </div>
              )}
              {project.photographer && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-warm-400">Photography</p>
                  <p className="font-display text-lg">{project.photographer}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-warm-400">Year</p>
                <p className="font-display text-lg">{project.year}</p>
              </div>
            </div>

            {/* Description & images */}
            <div className="lg:col-span-2 space-y-8">
              {project.description && (
                <p className="text-warm-600 text-lg leading-relaxed">
                  {project.description}
                </p>
              )}
              <div className="space-y-4">
                {project.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`${project.title} - Image ${i + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
