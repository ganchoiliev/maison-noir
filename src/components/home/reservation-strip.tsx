"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";
import { useRef } from "react";

export function ReservationStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="border-y border-border bg-fog py-12">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeEditorial }}
      >
        <div>
          <p className="font-display text-xl text-bone md:text-2xl">Begin your evening.</p>
          <p className="mt-1 text-sm text-muted">
            Reservations available up to 60 days in advance. Two seatings nightly.
          </p>
        </div>
        <Link
          href="/reserve"
          className="shrink-0 border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-colors hover:bg-ember-hover"
        >
          Reserve a Seat
        </Link>
      </motion.div>
    </section>
  );
}
