"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative overflow-hidden rounded-sm"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <p className="text-gold-300 text-xs tracking-widest uppercase">
          {project.category}
        </p>
        <h3 className="font-display italic text-xl text-warm-50 mt-1">
          {project.title}
        </h3>
        {project.designer && (
          <p className="text-warm-400 text-xs mt-1">
            Design: {project.designer}
          </p>
        )}
      </div>

      {/* Attribution below card */}
      {project.photographer && (
        <p className="text-xs text-warm-400 italic mt-2">
          Photo: {project.photographer}
        </p>
      )}
    </Link>
  );
}
