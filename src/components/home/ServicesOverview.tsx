"use client";

import {
  Layers,
  Sofa,
  Building2,
  Home,
  PenTool,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Service } from "@/types/service";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Sofa,
  Building2,
  Home,
  PenTool,
  Wrench,
};

interface ServicesOverviewProps {
  services: Service[];
  dark?: boolean;
}

export function ServicesOverview({ services, dark = false }: ServicesOverviewProps) {
  return (
    <section className={dark ? "bg-charcoal py-section" : "py-section"}>
      <div className="max-site section-padding">
        <ScrollReveal>
          <SectionHeader title="What We Build" light={dark} />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <ScrollReveal key={service.id} delay={i * 0.1}>
                <div
                  className={`group p-6 rounded-sm border-l-2 border-transparent hover:border-gold-400 transition-all duration-300 ease-out-expo hover:-translate-y-1 ${
                    dark ? "hover:bg-charcoal-light" : "hover:bg-warm-100"
                  }`}
                >
                  <Icon
                    className="text-gold-400 mb-4"
                    size={32}
                    strokeWidth={1.5}
                  />
                  <h3
                    className={`font-display text-2xl mb-2 ${
                      dark ? "text-warm-50" : "text-charcoal"
                    }`}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      dark ? "text-warm-400" : "text-warm-500"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
