import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StudioStory } from "@/components/about/StudioStory";
import { DifferentiatorGrid } from "@/components/about/DifferentiatorGrid";
import { CTAButton } from "@/components/ui/CTAButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { getDriveImageOrFallback } from "@/lib/googleDrive";

export const metadata = {
  title: "About",
  description: "Learn about our studio, our philosophy, and what sets us apart in construction and contracting services.",
};

export default function AboutPage() {
  const studioImage = getDriveImageOrFallback("GOOGLE_DRIVE_STUDIO_IMAGE_ID", "/images/studio-portrait.jpg");

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-20">
        <div className="max-site section-padding text-center">
          <p className="text-warm-500 text-xs tracking-widest uppercase mb-4">
            Home / About
          </p>
          <h1 className="font-display italic text-display-2xl text-warm-50">
              Elevating Interiors with Bespoke Millwork.
          </h1>
          <GoldDivider className="mx-auto mt-8" />
          <p className="mt-8 text-warm-300 text-xl max-w-2xl mx-auto">
            We are a multidisciplinary studio specializing in bespoke architecture,
            custom millwork, and interior design for discerning clients across Canada.
          </p>
        </div>
      </section>

      {/* Studio Story */}
      <StudioStory studioImage={studioImage} portraitImage={getDriveImageOrFallback("GOOGLE_DRIVE_PORTRAIT_IMAGE_ID", "/images/studio-portrait.jpg")} />

      {/* Differentiators */}
      <DifferentiatorGrid />

      {/* Discovery Call CTA */}
      <section className="bg-gold-300 py-section-sm">
        <div className="max-site section-padding text-center">
          <ScrollReveal>
            <h2 className="font-display text-display-md text-charcoal">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-lg text-charcoal/80">
              Book a discovery call and let&apos;s talk about your vision.
            </p>
            <div className="mt-8">
              <CTAButton
                href="/contact"
                variant="filled"
                className="bg-charcoal text-warm-50 hover:bg-charcoal-light"
              >
                Book a Discovery Call
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
