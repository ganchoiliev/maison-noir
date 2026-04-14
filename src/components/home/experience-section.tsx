"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const details = [
  { label: "Courses", value: "12", sub: "Seasonal tasting menu" },
  { label: "Price", value: "£185", sub: "Per guest" },
  { label: "Wine Pairing", value: "+£95", sub: "Optional, curated" },
  { label: "Duration", value: "~3 hrs", sub: "Unhurried" },
  { label: "Seats", value: "14", sub: "Counter only" },
  { label: "Seatings", value: "2", sub: "18:00 & 20:45" },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-y border-border bg-ink py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">The Experience</p>
          <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
            One Menu. One Seating. No Compromise.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              className="bg-ink p-6 text-center md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5, ease: easeEditorial }}
            >
              <p className="font-display text-3xl text-bone md:text-4xl">{d.value}</p>
              <p className="mt-2 small-caps text-xs text-brass">{d.label}</p>
              <p className="mt-1 text-xs text-muted">{d.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
