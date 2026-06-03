import { ServicesOverview } from "@/components/home/ServicesOverview";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { CTAButton } from "@/components/ui/CTAButton";
import services from "@/content/services.json";

export const metadata = {
  title: "Services",
  description: "Explore our architecture and building services: custom millwork, interior architecture, commercial fit-outs, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-site section-padding text-center">
          <h1 className="font-display italic text-display-xl text-charcoal">
            Our Services
          </h1>
          <GoldDivider className="mx-auto mt-6" />
          <p className="mt-6 text-warm-500 max-w-xl mx-auto">
            From initial concept through final installation, we offer a
            comprehensive suite of architecture and building services.
          </p>
        </div>
      </section>

      <ServicesOverview services={services} />

      <section className="py-section-sm bg-charcoal">
        <div className="max-site section-padding text-center">
          <h2 className="font-display italic text-display-md text-warm-50">
            Ready to discuss your project?
          </h2>
          <p className="mt-4 text-warm-300">
            Every great space starts with a conversation.
          </p>
          <div className="mt-8">
            <CTAButton href="/contact" variant="outlined">
              Book a Discovery Call
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
