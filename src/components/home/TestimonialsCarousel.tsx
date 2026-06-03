"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="bg-warm-100 py-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-site section-padding">
        <ScrollReveal>
          <p className="text-center text-xs tracking-widest uppercase text-gold-400 mb-12">
            What clients say
          </p>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Decorative quote mark */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[120px] text-gold-200 leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-16"
            >
              <blockquote className="font-display italic text-2xl text-charcoal leading-relaxed">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <p className="mt-6 text-sm text-warm-500 font-sans">
                &mdash; {testimonials[current].author},{" "}
                {testimonials[current].project}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 border border-warm-300 rounded-sm hover:border-gold-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-warm-500" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-gold-400" : "bg-warm-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 border border-warm-300 rounded-sm hover:border-gold-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-warm-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
