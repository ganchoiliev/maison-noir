"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const suppliers = [
  {
    name: "Natoora",
    category: "Vegetables & Fruit",
    detail: "Seasonal produce direct from small-scale European growers",
    region: "Pan-European",
  },
  {
    name: "The Cornish Fishmonger",
    category: "Seafood",
    detail: "Day-boat fish landed at Newlyn, delivered within 24 hours",
    region: "Cornwall",
  },
  {
    name: "Swaledale Butchers",
    category: "Meat & Game",
    detail: "Heritage breeds, dry-aged on the bone for minimum 28 days",
    region: "Yorkshire",
  },
  {
    name: "Neal's Yard Dairy",
    category: "Cheese",
    detail: "Artisan British and Irish farmhouse cheeses, hand-selected",
    region: "London / British Isles",
  },
  {
    name: "Bread Ahead",
    category: "Bread & Flour",
    detail: "Sourdough and heritage grain loaves baked daily in Bermondsey",
    region: "London",
  },
  {
    name: "Wild Foragers Collective",
    category: "Foraged & Wild",
    detail: "Seasonal wild garlic, elderflower, sea herbs, and mushrooms",
    region: "South East England",
  },
];

export function SourcingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-noise bg-fog py-section">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">Provenance</p>
          <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
            We Know Where It Comes From
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            Every ingredient has a name, a place, and a person behind it. These are the people we
            trust to deliver the quality our kitchen demands.
          </p>
        </motion.div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-fog p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5, ease: easeEditorial }}
            >
              <p className="small-caps text-xs text-brass">{s.category}</p>
              <h3 className="mt-2 font-display text-lg text-bone">{s.name}</h3>
              <p className="mt-1 text-sm text-bone/50">{s.detail}</p>
              <p className="mt-2 text-xs text-muted/50">{s.region}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
