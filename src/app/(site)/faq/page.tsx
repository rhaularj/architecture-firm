import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { CTAButton } from "@/components/ui/CTAButton";
import faqData from "@/content/faq.json";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our architecture, millwork, and design services.",
};

export default function FAQPage() {
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-site section-padding text-center">
          <h1 className="font-display italic text-display-xl text-charcoal">
            Frequently Asked Questions
          </h1>
          <GoldDivider className="mx-auto mt-6" />
          <p className="mt-6 text-warm-500 max-w-xl mx-auto">
            Everything you need to know about working with us. Can&apos;t find what
            you&apos;re looking for? Get in touch directly.
          </p>
        </div>
      </section>

      <section className="pb-section">
        <div className="max-site section-padding max-w-3xl mx-auto">
          <FAQAccordion items={faqData} />

          <div className="mt-16 text-center">
            <p className="text-warm-500 mb-4">Still have questions?</p>
            <CTAButton href="/contact" variant="outlined">
              Get in Touch
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
