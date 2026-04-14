"use client";

import { motion } from "framer-motion";

const publications = [
  "The Times",
  "Financial Times",
  "The Telegraph",
  "Evening Standard",
  "Tatler",
  "Condé Nast Traveller",
  "Eater London",
  "Time Out",
];

export function PressMarquee() {
  return (
    <section className="overflow-hidden border-b border-border bg-ink py-10">
      <p className="mb-6 text-center text-xs small-caps tracking-widest text-brass">
        As Featured In
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-4 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
            }}
          >
            {[...publications, ...publications, ...publications].map((pub, i) => (
              <span key={`${pub}-${i}`} className="flex items-center gap-4">
                <span className="font-display text-xl text-brass/50">{pub}</span>
                <span className="text-brass/20">&#9670;</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
