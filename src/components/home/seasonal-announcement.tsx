"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function SeasonalAnnouncement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="border-y border-border bg-ink py-section">
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeEditorial }}
      >
        <p className="small-caps text-xs tracking-widest text-ember">New for Spring</p>
        <h2 className="mt-3 font-display text-3xl text-bone md:text-4xl">
          The Spring 2026 Menu Has Arrived
        </h2>
        <p className="mt-4 text-muted">
          Wild garlic, Cornish crab, English asparagus, and the first rhubarb of the season. Twelve
          new courses celebrating the shift from earth to light — composed by Chef Moreau and the
          brigade.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="border border-brass px-6 py-3 text-sm text-brass transition-all hover:bg-brass hover:text-ink"
          >
            View the Menu
          </Link>
          <Link
            href="/reserve"
            className="border border-ember bg-ember px-6 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover"
          >
            Reserve a Seat
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
