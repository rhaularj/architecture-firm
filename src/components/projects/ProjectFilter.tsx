"use client";

import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "px-4 py-2 text-sm rounded-sm border transition-all duration-200 capitalize",
            active === cat
              ? "bg-gold-400 text-charcoal border-gold-400"
              : "border-warm-300 text-warm-500 hover:border-gold-400 hover:text-gold-400"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
