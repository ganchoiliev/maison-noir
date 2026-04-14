"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const testimonials = [
  {
    quote:
      "From the first amuse-bouche to the final mignardise, every course felt like a quiet revelation. This is not dinner — it is an event.",
    guest: "A.L.",
    occasion: "Anniversary dinner",
  },
  {
    quote:
      "The counter format changes everything. Watching the brigade work with that level of focus and calm — it made me appreciate the craft in a way I never had before.",
    guest: "M.R.",
    occasion: "Birthday celebration",
  },
  {
    quote:
      "We've eaten at most of the starred restaurants in London. Maison Noir is the one we keep going back to. The menu changes, the standards don't.",
    guest: "J.K. & S.K.",
    occasion: "Regular guests",
  },
  {
    quote:
      "The wine pairing was extraordinary. Elena matched a 2018 Banyuls with the chocolate course and the table went silent. That's the kind of moment you remember.",
    guest: "T.W.",
    occasion: "Wine pairing evening",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  return (
    <section ref={ref} className="border-y border-border bg-ink py-section">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">Guest Voices</p>
        </motion.div>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: easeEditorial }}
            >
              <p className="font-display text-xl leading-relaxed text-bone md:text-2xl lg:text-3xl">
                &ldquo;{testimonials[current]?.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="text-sm text-bone">{testimonials[current]?.guest}</p>
                <p className="text-xs text-muted">{testimonials[current]?.occasion}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-brass" : "w-1.5 bg-border hover:bg-muted"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
