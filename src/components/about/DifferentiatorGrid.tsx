"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const differentiators = [
  {
    number: "01",
    title: "Craftsmanship at Its Finest",
    body: "Every piece is handcrafted by master artisans with decades of experience. We use traditional joinery techniques elevated by modern precision technology.",
  },
  {
    number: "02",
    title: "Personalized Service",
    body: "You work directly with our principal designers from concept through installation. No hand-offs, no miscommunication — just a dedicated team invested in your vision.",
  },
  {
    number: "03",
    title: "Quality Materials",
    body: "We source only certified, sustainably harvested hardwoods and premium finishes. Every material is selected for beauty, durability, and environmental responsibility.",
  },
  {
    number: "04",
    title: "Tailored Solutions",
    body: "No two projects are alike. We design bespoke solutions that respond to your unique space, lifestyle, and aesthetic sensibility — never off-the-shelf compromises.",
  },
  {
    number: "05",
    title: "Local Roots",
    body: "Based in Mississauga, we understand the local architecture, climate considerations, and building codes intimately. Our relationships with local suppliers ensure quality and efficiency.",
  },
  {
    number: "06",
    title: "Attention to Detail",
    body: "From grain direction to shadow gaps, from hardware selection to finish sheen — we obsess over the details that transform good design into exceptional spaces.",
  },
];

export function DifferentiatorGrid() {
  return (
    <section className="bg-warm-100 py-section">
      <div className="max-site section-padding">
        <ScrollReveal>
          <SectionHeader title="What sets us apart" />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {differentiators.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-[80px] font-display text-warm-200 leading-none select-none pointer-events-none">
                  {item.number}
                </span>
                <div className="relative pt-12">
                  <h3 className="font-display text-xl text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
