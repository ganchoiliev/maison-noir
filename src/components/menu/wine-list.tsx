"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const wineCategories = [
  {
    name: "Champagne & Sparkling",
    items: [
      { wine: "NV Pierre Gimonnet, Cuvée Gastronome", region: "Champagne", glass: "£22", bottle: "£95" },
      { wine: "2018 Egly-Ouriet, Brut Grand Cru", region: "Champagne", glass: null, bottle: "£180" },
      { wine: "2022 Wiston Estate, Blanc de Blancs", region: "Sussex", glass: "£18", bottle: "£75" },
    ],
  },
  {
    name: "White",
    items: [
      { wine: "2024 Sancerre, Domaine Vacheron", region: "Loire", glass: "£16", bottle: "£68" },
      { wine: "2023 Meursault, Roulot", region: "Burgundy", glass: null, bottle: "£145" },
      { wine: "2024 Albariño, Pazo de Señorans", region: "Rías Baixas", glass: "£14", bottle: "£58" },
      { wine: "2022 Puligny-Montrachet, Leflaive", region: "Burgundy", glass: null, bottle: "£220" },
      { wine: "2023 Grüner Veltliner, Bründlmayer", region: "Kamptal", glass: "£15", bottle: "£62" },
    ],
  },
  {
    name: "Red",
    items: [
      { wine: "2023 Côtes du Rhône, E. Guigal", region: "Rhône", glass: "£14", bottle: "£56" },
      { wine: "2020 Chambolle-Musigny, Roumier", region: "Burgundy", glass: null, bottle: "£285" },
      { wine: "2019 Barolo, Giacomo Conterno", region: "Piedmont", glass: null, bottle: "£195" },
      { wine: "2021 St-Julien, Léoville-Barton", region: "Bordeaux", glass: null, bottle: "£135" },
      { wine: "2022 Pinot Noir, Felton Road", region: "Central Otago", glass: "£18", bottle: "£78" },
    ],
  },
  {
    name: "Dessert & Fortified",
    items: [
      { wine: "2018 Banyuls, Domaine du Mas Blanc", region: "Roussillon", glass: "£12", bottle: "£55" },
      { wine: "2020 Sauternes, Château Suduiraut", region: "Bordeaux", glass: "£16", bottle: null },
      { wine: "NV Manzanilla, Hidalgo La Gitana", region: "Jerez", glass: "£10", bottle: "£42" },
    ],
  },
];

const nonAlcoholic = [
  { drink: "Seedlip Garden Spritz", price: "£12" },
  { drink: "Kombucha Flight (3 varieties)", price: "£14" },
  { drink: "Fresh Juice Pairing (6 courses)", price: "£45" },
  { drink: "Sparkling Water (750ml)", price: "£5" },
  { drink: "Still Water (750ml)", price: "£5" },
  { drink: "Single Origin Coffee", price: "£5" },
  { drink: "Loose Leaf Tea Selection", price: "£5" },
];

const spirits = [
  { drink: "Digestif Selection", description: "Calvados, Grappa, Armagnac, Eau de Vie", price: "From £14" },
  { drink: "Rare Whisky", description: "Japanese, Scottish, Irish — ask our team", price: "From £18" },
  { drink: "Cognac", description: "Rémy Martin XO, Hennessy Paradis", price: "From £22" },
];

export function WineList() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState("wine");

  const tabs = [
    { id: "wine", label: "Wine" },
    { id: "non-alc", label: "Non-Alcoholic" },
    { id: "spirits", label: "Spirits & Digestifs" },
  ];

  return (
    <section ref={ref}>
      <motion.header
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeEditorial }}
      >
        <p className="small-caps text-sm text-brass">Beverage Programme</p>
        <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Wine &amp; Drinks</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-bone/50">
          Curated by Head Sommelier Elena Voss. Full pairing available at &pound;95, or explore our
          list by the glass and bottle.
        </p>
      </motion.header>

      {/* Tabs */}
      <div className="mb-10 flex justify-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-3 text-sm transition-colors duration-300 small-caps ${
              activeTab === tab.id ? "text-bone" : "text-bone/30 hover:text-bone/60"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.span
                layoutId="wine-tab"
                className="absolute bottom-0 left-0 right-0 h-px bg-brass"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "wine" && (
          <motion.div
            key="wine"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {wineCategories.map((cat) => (
              <div key={cat.name}>
                <h3 className="mb-5 small-caps text-sm text-brass">{cat.name}</h3>
                <div className="space-y-0">
                  {cat.items.map((item) => (
                    <div
                      key={item.wine}
                      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border/30 py-4 transition-colors duration-300 hover:bg-fog/30"
                    >
                      <span className="flex-1 text-sm text-bone">{item.wine}</span>
                      <span className="text-xs text-bone/25">{item.region}</span>
                      <div className="flex gap-4">
                        {item.glass && (
                          <span className="text-xs text-brass/60">
                            <span className="text-bone/20">glass </span>
                            {item.glass}
                          </span>
                        )}
                        {item.bottle && (
                          <span className="text-xs text-brass">
                            <span className="text-bone/20">bottle </span>
                            {item.bottle}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "non-alc" && (
          <motion.div
            key="non-alc"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto max-w-2xl space-y-0">
              {nonAlcoholic.map((item) => (
                <div
                  key={item.drink}
                  className="flex items-baseline justify-between border-b border-border/30 py-4"
                >
                  <span className="text-sm text-bone">{item.drink}</span>
                  <span className="text-xs text-brass">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "spirits" && (
          <motion.div
            key="spirits"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto max-w-2xl space-y-0">
              {spirits.map((item) => (
                <div
                  key={item.drink}
                  className="border-b border-border/30 py-5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-bone">{item.drink}</span>
                    <span className="text-xs text-brass">{item.price}</span>
                  </div>
                  <p className="mt-1 text-xs text-bone/35">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
