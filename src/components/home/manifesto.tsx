"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const paragraphs = [
  {
    numeral: "I",
    text: "We cook with the season, not against it. Every dish begins in the soil — with a grower, a forager, or a fisherman we know by name.",
  },
  {
    numeral: "II",
    text: "The counter is our stage. Twelve seats, twelve courses, one conversation between kitchen and guest.",
  },
  {
    numeral: "III",
    text: "Technique serves flavour, never the reverse. We respect the ingredient enough to do less, not more.",
  },
  {
    numeral: "IV",
    text: "An evening here is not a meal. It is an edition — composed, considered, and unrepeatable.",
  },
];

export function Manifesto() {
  return (
    <section className="overflow-hidden bg-ink py-section">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="space-y-20 md:space-y-28">
          {paragraphs.map((p, i) => (
            <ManifestoParagraph key={p.numeral} numeral={p.numeral} text={p.text} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoParagraph({
  numeral,
  text,
  index,
}: {
  numeral: string;
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: easeEditorial,
      }}
    >
      <p className="mb-4 font-display text-sm text-brass">{numeral}</p>
      <p className="font-display text-2xl leading-relaxed text-bone md:text-3xl lg:text-4xl">
        {text}
      </p>
    </motion.div>
  );
}
