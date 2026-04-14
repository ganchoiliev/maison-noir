"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function PrivateDiningSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-fog py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Video */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: easeEditorial }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.7)" }}
            >
              <source src="/video/chef-prep.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-brass/10 via-transparent to-ink/40 mix-blend-multiply" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
          >
            <p className="small-caps text-sm text-brass">Private Dining</p>
            <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
              The Entire Counter, Yours.
            </h2>
            <p className="mt-4 leading-relaxed text-bone/60">
              Host an exclusive evening for up to 14 guests. A bespoke tasting menu, dedicated
              service, and the full Maison Noir experience — tailored to your occasion.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-bone">10–14 guests</p>
                <p className="text-xs text-muted">Exclusive hire</p>
              </div>
              <div>
                <p className="text-bone">Bespoke menu</p>
                <p className="text-xs text-muted">Tailored to your event</p>
              </div>
              <div>
                <p className="text-bone">From £3,500</p>
                <p className="text-xs text-muted">Minimum spend</p>
              </div>
            </div>
            <Link
              href="/private-dining"
              className="mt-8 inline-block border border-brass px-6 py-3 text-sm text-brass transition-all hover:bg-brass hover:text-ink"
            >
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
