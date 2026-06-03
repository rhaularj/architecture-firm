"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/types/project";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.slice(0, 3);
  const [main, ...rest] = featured;

  return (
    <section className="bg-charcoal py-section">
      <div className="max-site section-padding">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-gold-300 text-sm tracking-widest uppercase mb-2">
                Portfolio
              </p>
              <h2 className="font-display italic text-display-xl text-warm-50">
                Selected Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 text-gold-400 text-sm hover:text-gold-300 transition-colors"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large card */}
          {main && (
            <ScrollReveal className="lg:col-span-2">
              <ProjectCard project={main} aspect="aspect-[16/9]" />
            </ScrollReveal>
          )}

          {/* Two smaller cards */}
          <div className="flex flex-col gap-4">
            {rest.map((project, i) => (
              <ScrollReveal key={project.id} delay={0.1 + i * 0.1}>
                <ProjectCard project={project} aspect="aspect-[4/3]" />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-gold-400 text-sm hover:text-gold-300 transition-colors md:hidden"
        >
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  aspect,
}: {
  project: Project;
  aspect: string;
}) {
  return (
    <Link href={`/projects/${encodeURIComponent(project.slug)}`} className="block group relative overflow-hidden rounded-sm">
      <motion.div
        className={`relative ${aspect} w-full`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div>
          <p className="text-gold-300 text-xs tracking-widest uppercase mb-1">
            {project.category}
          </p>
          <h3 className="font-display italic text-xl text-warm-50">
            {project.title}
          </h3>
        </div>
        <ArrowRight className="text-warm-50 ml-auto" size={20} />
      </div>
    </Link>
  );
}