import { ResourceCard } from "@/components/resources/ResourceCard";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { getResourcesFromDrive } from "@/lib/googleDrive";

export const revalidate = 3600;

export const metadata = {
  title: "Resources",
  description: "Download our product catalogs, care guides, and technical standards.",
};

export default async function ResourcesPage() {
  const resources = await getResourcesFromDrive();

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-site section-padding text-center">
          <h1 className="font-display italic text-display-xl text-charcoal">
            Resources & Downloads
          </h1>
          <GoldDivider className="mx-auto mt-6" />
          <p className="mt-6 text-warm-500 max-w-xl mx-auto">
            Access our catalogs, technical guides, and care documentation.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="max-site section-padding max-w-3xl mx-auto space-y-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </>
  );
}
