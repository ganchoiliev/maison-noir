"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function ChefPortrait() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image with parallax + reveal */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ y }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0 0 0)" } : {}}
              transition={{ duration: 1.2, ease: easeEditorial }}
            >
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&auto=format"
                alt="Chef Daniel Moreau in the Maison Noir kitchen"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
              />
              {/* Duotone tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-brass/20 via-transparent to-ink/70 mix-blend-multiply" />
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: easeEditorial }}
          >
            <blockquote className="font-display text-2xl leading-relaxed text-bone md:text-3xl">
              &ldquo;The best dishes are the ones where you taste the place and the moment — not the
              chef.&rdquo;
            </blockquote>
            <div className="mt-6 border-t border-brass/30 pt-4">
              <p className="text-sm font-medium text-bone">Chef Daniel Moreau</p>
              <p className="small-caps text-xs text-brass">Executive Chef &amp; Founder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
