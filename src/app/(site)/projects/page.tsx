import { ProjectMasonryGrid } from "@/components/projects/ProjectMasonryGrid";
import { getProjectsFromDrive } from "@/lib/googleDrive";

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
  description: "Explore our portfolio of residential, commercial, and hospitality construction projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjectsFromDrive();

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-site section-padding">
          <h1 className="font-display italic text-display-xl text-charcoal text-center">
            Our Projects
          </h1>
          <p className="mt-4 text-warm-500 text-center max-w-xl mx-auto">
            A curated selection of residential, commercial, and hospitality work
            showcasing our commitment to craft and design.
          </p>
        </div>
      </section>

      <ProjectMasonryGrid projects={projects} />
    </>
  );
}
