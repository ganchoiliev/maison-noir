"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function TheSpace() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.2, ease: easeEditorial }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.65)" }}
            >
              <source src="/video/restaurant.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-brass/10 mix-blend-multiply" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: easeEditorial }}
          >
            <p className="small-caps text-sm text-brass">The Space</p>
            <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
              Twelve Seats. No Barriers.
            </h2>
            <p className="mt-4 leading-relaxed text-bone/60">
              The dining room at Maison Noir is built around a single counter of English oak,
              encircling an open kitchen. There are no tables, no private corners — just an unbroken
              view of the pass from every seat.
            </p>
            <p className="mt-4 leading-relaxed text-bone/60">
              The space was designed by Studio Ael in collaboration with Chef Moreau. Blackened steel,
              hand-thrown ceramics, and soft indirect lighting create an atmosphere that is intimate
              without being precious. Every detail — from the linen to the cutlery — was chosen to
              serve the food, not compete with it.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-2xl text-bone">14</p>
                <p className="text-xs text-muted">Seats</p>
              </div>
              <div>
                <p className="font-display text-2xl text-bone">1</p>
                <p className="text-xs text-muted">Counter</p>
              </div>
              <div>
                <p className="font-display text-2xl text-bone">360°</p>
                <p className="text-xs text-muted">Kitchen view</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
