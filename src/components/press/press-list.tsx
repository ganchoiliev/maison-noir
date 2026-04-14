"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const pressItems = [
  {
    publication: "The Times",
    quote: "A masterclass in restraint and seasonal precision.",
    year: 2026,
  },
  {
    publication: "Financial Times",
    quote: "London's most compelling new tasting counter.",
    year: 2026,
  },
  {
    publication: "The Telegraph",
    quote: "Chef Moreau cooks with an intelligence that belies the apparent simplicity.",
    year: 2025,
  },
  {
    publication: "Evening Standard",
    quote: "The counter format transforms dinner into theatre.",
    year: 2025,
  },
  {
    publication: "Condé Nast Traveller",
    quote: "An essential London dining destination.",
    year: 2026,
  },
  {
    publication: "Eater London",
    quote: "Twelve courses of quiet confidence.",
    year: 2025,
  },
];

function PressItem({
  item,
  index,
}: {
  item: (typeof pressItems)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: easeEditorial }}
      className="border-b border-border py-8 first:pt-0 last:border-0"
    >
      <p className="small-caps flex items-center gap-2 text-xs text-brass">
        <span className="inline-block h-px w-4 bg-brass" />
        {item.publication} &middot; {item.year}
      </p>
      <p className="mt-3 font-display text-xl italic text-bone md:text-2xl">
        &ldquo;{item.quote}&rdquo;
      </p>
    </motion.div>
  );
}

export function PressList() {
  return (
    <div className="space-y-0">
      {pressItems.map((item, i) => (
        <PressItem key={item.publication} item={item} index={i} />
      ))}
    </div>
  );
}
