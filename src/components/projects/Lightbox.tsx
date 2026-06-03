"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  title?: string;
  description?: string;
  onClose: () => void;
}

export function Lightbox({
  images,
  initialIndex = 0,
  title,
  description,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-charcoal/95 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-warm-50 hover:text-gold-300 transition-colors"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Main image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Image
              src={images[current]}
              alt={title || `Image ${current + 1}`}
              width={1200}
              height={800}
              className="max-h-[75vh] w-auto object-contain rounded-sm"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-warm-50 hover:text-gold-300 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-warm-50 hover:text-gold-300 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-16 h-12 relative rounded-sm overflow-hidden border-2 transition-colors ${
                  i === current ? "border-gold-400" : "border-transparent opacity-60"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        {(title || description) && (
          <div className="mt-4 text-center">
            {title && (
              <h3 className="font-display italic text-lg text-warm-50">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-warm-400 text-sm mt-1">{description}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
