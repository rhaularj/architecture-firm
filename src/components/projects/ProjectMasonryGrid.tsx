"use client";

import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import type { Project } from "@/types/project";

interface ProjectMasonryGridProps {
  projects: Project[];
}

const categories = ["all", "residential", "commercial", "hospitality", "renovation"] as const;

export function ProjectMasonryGrid({ projects }: ProjectMasonryGridProps) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pb-section">
      <div className="max-site section-padding">
        {/* Filter bar */}
        <div className="sticky top-20 z-30 bg-warm-50/95 backdrop-blur-md py-4 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 xl:-mx-20 xl:px-20 mb-8">
          <ProjectFilter
            categories={categories as unknown as string[]}
            active={active}
            onChange={setActive}
          />
        </div>

        {/* Masonry grid */}
        <LayoutGroup>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid mb-4"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
