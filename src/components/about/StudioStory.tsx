import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface StudioStoryProps {
  studioImage?: string;
  portraitImage?: string;
}

export function StudioStory({
  studioImage = "/images/studio-kitchen.jpg",
  portraitImage = "/images/studio-portrait.jpg",
}: StudioStoryProps) {
  return (
    <section className="py-section">
      <div className="max-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
 
          {/* ── Left column: overlapping photo composition ── */}
          <ScrollReveal direction="left">
            <div className="lg:sticky lg:top-32">
 
              {/*
               * Outer wrapper sets the canvas height.
               * paddingBottom drives the aspect ratio of the total composition.
               * All children are absolutely positioned inside it.
               */}
              <div className="relative w-full" style={{ paddingBottom: "125%" }}>
 
                {/* ① Main image — top-right, large */}
                <div className="absolute top-0 right-0 w-[125%] h-[87%] overflow-hidden rounded-sm">
                  <Image
                    src={studioImage}
                    alt="Our studio workspace"
                    fill
                    className="object-cover"
                    sizes="(max-width: 2048px) 78vw, 38vw"
                    priority
                  />
                </div>
 
                {/*
                 * ② Portrait card — bottom-left, overlapping the main image.
                 *
                 * The white `bg-warm-50` card with padding recreates the
                 * "floating photo on a mat" effect visible in the reference.
                 * `shadow-2xl` + subtle ring give it layered depth.
                 */}
                <div
                  className="
                    absolute bottom-[30%] right-[-15%]
                    w-[46%] 
                    shadow-2xl
                    rounded-sm"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2px]">
                    <Image
                      src={portraitImage}
                      alt="Studio founder"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 46vw, 22vw"
                    />
                  </div>
                </div>
 
                {/*
                 * ③ Optional gold accent line — echoes the brand divider pattern.
                 * Sits between the two photos, top-right corner of the portrait card.
                 * Remove this <div> if you prefer a cleaner look.
                 */}
                {/* <div
                  className="
                    absolute
                    bg-gold-400
                    rounded-full
                  "
                  style={{
                    width: 3,
                    height: "22%",
                    left: "44%",
                    top: "54%",
                  }}
                /> */}
 
              </div>
            </div>
          </ScrollReveal>
 
          {/* ── Right column: text content ── */}
          <ScrollReveal direction="right">
            <div className="space-y-6" style={{  paddingLeft: "10%" }} >
 
              <h2 className="font-display italic text-display-lg text-charcoal">
                Our Story
              </h2>
 
              {/* Gold divider — matches the brand pattern */}
              <div className="gold-line w-16" />
 
              <p className="text-warm-600 leading-relaxed">
                We are proud to introduce Phoenix Custom Millwork, a custom millwork
                company focused on delivering high-quality commercial and residential
                woodwork solutions.
              </p>
 
              <p className="text-warm-600 leading-relaxed">
                Over the past two years, we have completed a wide range of projects
                with strong attention to detail, precision fabrication, and professional
                installation. We look forward to building long-term partnerships with
                contractors, franchises, designers, and developers.
              </p>
 
              <p className="text-warm-600 leading-relaxed">
                Experienced President with over 15 years of hands-on experience in the
                woodworking industry, specializing in woodworking, CNC machining, and
                end-to-end project execution. I bring strong expertise in business
                development, contract negotiation and management, process scheduling,
                and construction management.
              </p>
 
              <p className="text-warm-600 leading-relaxed">
                We are committed to delivering high quality interior millwork solutions
                while fostering strong, long-term client relationships. Our focus is on
                leadership, operational excellence, and project management with a
                dedication to driving sustainable growth and building future success
                for clients within the woodwork industry and beyond.
              </p>
 
            </div>
          </ScrollReveal>
 
        </div>
      </div>
    </section>
  );
}