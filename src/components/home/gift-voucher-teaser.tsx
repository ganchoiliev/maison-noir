"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function GiftVoucherTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-fog py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: easeEditorial }}
          >
            <p className="small-caps text-sm text-brass">The Perfect Gift</p>
            <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
              Give an Unforgettable Evening
            </h2>
            <p className="mt-4 leading-relaxed text-bone/60">
              Our dining vouchers are delivered beautifully by email and redeemable for any available
              seating within twelve months. From a single tasting menu to the complete wine-paired
              experience for two.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="border border-border bg-ink/50 px-4 py-3">
                <p className="font-display text-lg text-bone">£185</p>
                <p className="text-xs text-muted">Tasting menu</p>
              </div>
              <div className="border border-border bg-ink/50 px-4 py-3">
                <p className="font-display text-lg text-bone">£280</p>
                <p className="text-xs text-muted">With wine pairing</p>
              </div>
              <div className="border border-border bg-ink/50 px-4 py-3">
                <p className="font-display text-lg text-bone">£560</p>
                <p className="text-xs text-muted">Experience for two</p>
              </div>
            </div>
            <Link
              href="/gift-vouchers"
              className="mt-8 inline-block border border-ember bg-ember px-6 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover hover:shadow-[0_0_20px_rgba(138,106,59,0.15)]"
            >
              Purchase a Voucher
            </Link>
          </motion.div>

          {/* Video */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0 0 0%)" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: easeEditorial }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(30%) contrast(1.1) brightness(0.7) sepia(10%)" }}
            >
              <source src="/video/cocktail.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-l from-brass/10 via-transparent to-ink/40 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
