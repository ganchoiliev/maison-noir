"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: easeEditorial }}
    >
      {children}
    </motion.div>
  );
}

/* ── Parallax image ── */
function ParallaxImage({
  src,
  alt,
  height = "h-[50vh] md:h-[60vh]",
}: {
  src: string;
  alt: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${height}`}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(50%) contrast(1.1) brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/40" />
      </motion.div>
    </div>
  );
}

/* ── Main content ── */
export function PhilosophyContent() {
  return (
    <div className="min-h-screen">
      {/* ══════ HERO — Video ══════ */}
      <div className="relative flex h-[70vh] items-end overflow-hidden md:h-[80vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(50%) contrast(1.15) brightness(0.3) sepia(10%)" }}
        >
          <source src="/video/kitchen.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
        <div className="vignette" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 md:pb-20 lg:px-8">
          <motion.p
            className="small-caps text-sm text-brass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: easeEditorial }}
          >
            Our Approach
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-5xl text-bone md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: easeEditorial }}
          >
            Philosophy
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-bone/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: easeEditorial }}
          >
            Four principles guide every decision we make — from what we grow to what we plate, from
            how we cook to how we serve.
          </motion.p>
        </div>
      </div>

      {/* ══════ I. SEASONALITY ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="font-display text-6xl text-brass/10 md:text-8xl">I</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Seasonality</h2>
              <div className="mt-6 space-y-4 text-bone/60 leading-relaxed">
                <p>
                  Our menu changes with the calendar, not against it. Every dish begins with what the
                  land and sea offer this week — not what we wish they would.
                </p>
                <p>
                  We work with a small network of growers, foragers, and day-boat fishermen across
                  the British Isles, each chosen for their commitment to soil health and sustainable
                  practice. When the English asparagus arrives in late April, it defines the menu.
                  When the last of the winter truffle disappears, we let it go.
                </p>
                <p>
                  This is not a limitation. It is freedom. Constraints force creativity, and the
                  calendar is the most honest constraint there is.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=70&auto=format"
                  alt="Fresh seasonal produce"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.8)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-brass/10 mix-blend-multiply" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Parallax break ── */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=1200&q=70&auto=format"
        alt="Hands preparing ingredients"
        height="h-[40vh] md:h-[50vh]"
      />

      {/* ══════ II. THE COUNTER ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Image first on desktop (reversed) */}
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                  style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.65)" }}
                >
                  <source src="/video/restaurant.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-brass/10 mix-blend-multiply" />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="order-1 md:order-2">
              <p className="font-display text-6xl text-brass/10 md:text-8xl">II</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">The Counter</h2>
              <div className="mt-6 space-y-4 text-bone/60 leading-relaxed">
                <p>
                  Twelve seats arranged around an open kitchen. No barriers between the pass and the
                  guest. This is dining as conversation — you see every cut, every flame, every plate
                  leave the section.
                </p>
                <p>
                  The format is deliberate: intimacy over scale, attention over throughput. When
                  there are only twelve covers, every guest is the only guest. The chef can look you
                  in the eye as a dish is placed before you and know that it was made for you.
                </p>
                <p>
                  The counter is not a trend. It is the oldest form of hospitality — the shared
                  hearth — returned to its proper place.
                </p>
              </div>
              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "14", label: "Seats" },
                  { value: "1", label: "Counter" },
                  { value: "360°", label: "View" },
                ].map((s) => (
                  <div key={s.label} className="border-t border-border pt-3">
                    <p className="font-display text-2xl text-bone">{s.value}</p>
                    <p className="text-xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Chef quote ── */}
      <section className="border-y border-border bg-fog py-section">
        <div className="bg-noise relative">
          <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
            <svg className="mx-auto h-8 w-8 text-brass/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            <blockquote className="mt-6 font-display text-2xl leading-relaxed text-bone md:text-3xl lg:text-4xl">
              The best cooking happens when you listen to the ingredient first and your ego second.
            </blockquote>
            <div className="mt-6">
              <p className="text-sm text-bone">Chef Daniel Moreau</p>
              <p className="text-xs text-muted">Founder, Maison Noir</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ III. RESTRAINT ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="font-display text-6xl text-brass/10 md:text-8xl">III</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Restraint</h2>
              <div className="mt-6 space-y-4 text-bone/60 leading-relaxed">
                <p>
                  We believe the hardest discipline in cooking is knowing when to stop. A dish with
                  three elements, each perfect, will always surpass one with twelve competing for
                  attention.
                </p>
                <p>
                  Technique serves flavour here — never the reverse. We don&apos;t add foam because
                  we can. We don&apos;t sous vide because it&apos;s modern. Every method earns its
                  place by making the ingredient more itself, not less.
                </p>
                <p>
                  If a carrot tastes extraordinary roasted whole with nothing but salt and heat, then
                  that is how it will arrive. The art is in recognising when doing less is doing
                  everything.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=70&auto=format"
                  alt="Precisely plated dish"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.75)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-brass/5 mix-blend-multiply" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Video divider ── */}
      <div className="relative h-[35vh] overflow-hidden md:h-[45vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(50%) contrast(1.15) brightness(0.35)" }}
        >
          <source src="/video/flames.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/50" />
        <div className="bg-noise absolute inset-0" />
      </div>

      {/* ══════ IV. PROVENANCE ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=70&auto=format"
                  alt="Fresh ingredients from local suppliers"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: "grayscale(30%) contrast(1.1) brightness(0.8)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-brass/10 mix-blend-multiply" />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="order-1 md:order-2">
              <p className="font-display text-6xl text-brass/10 md:text-8xl">IV</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Provenance</h2>
              <div className="mt-6 space-y-4 text-bone/60 leading-relaxed">
                <p>
                  We name our suppliers on the menu not for marketing, but for accountability. Every
                  ingredient has a story, a place, and a person behind it.
                </p>
                <p>
                  Our cod comes from day boats out of Newlyn. Our beef is 28-day dry-aged Hereford
                  from Swaledale. Our cheese is selected weekly from Neal&apos;s Yard Dairy. Our wild
                  garlic is foraged by hand from the woodlands of the Kent Downs.
                </p>
                <p>
                  Knowing where your food comes from is not a luxury — it is a responsibility we take
                  seriously. When we say seasonal and local, we mean it. We can name every farm.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ OUR SUPPLIERS ══════ */}
      <section className="border-y border-border bg-fog py-section">
        <div className="bg-noise relative">
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <Reveal className="mb-12 text-center">
              <p className="small-caps text-sm text-brass">Our Partners</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
                The People Who Feed Us
              </h2>
            </Reveal>

            <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {suppliers.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.05} className="bg-fog p-6">
                  <p className="small-caps text-xs text-brass">{s.category}</p>
                  <h3 className="mt-2 font-display text-lg text-bone">{s.name}</h3>
                  <p className="mt-1 text-sm text-bone/50">{s.detail}</p>
                  <p className="mt-2 text-xs text-bone/25">{s.region}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ TIMELINE ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <p className="small-caps text-sm text-brass">Our Journey</p>
            <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Milestones</h2>
          </Reveal>

          <div className="relative border-l border-border pl-8">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border border-border bg-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass/50" />
                </span>
                <p className="font-display text-sm text-brass">{m.year}</p>
                <h3 className="mt-1 text-bone">{m.title}</h3>
                <p className="mt-1 text-sm text-bone/45">{m.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="border-t border-border bg-fog/50 py-16">
        <Reveal className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h3 className="font-display text-2xl text-bone md:text-3xl">
            Experience the Philosophy
          </h3>
          <p className="mt-3 text-sm text-bone/50">
            The best way to understand what we do is to sit at the counter and taste it.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/reserve"
              className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover hover:shadow-[0_0_20px_rgba(138,106,59,0.15)]"
            >
              Reserve a Seat
            </Link>
            <Link
              href="/menu"
              className="border border-border px-8 py-3 text-sm text-bone/60 transition-all hover:border-bone/30 hover:text-bone"
            >
              View the Menu
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ── Static data ── */

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

const milestones = [
  {
    year: "2022",
    title: "The Idea",
    detail:
      "Chef Moreau and architect Léa Duval begin designing a counter-forward restaurant concept in Covent Garden.",
  },
  {
    year: "2023",
    title: "Doors Open",
    detail:
      "Maison Noir opens with 12 seats, a single tasting menu, and a handwritten wine list of 40 bottles.",
  },
  {
    year: "2024",
    title: "First Recognition",
    detail:
      "Named in the Evening Standard's 'Restaurants of the Year'. Wine list grows to 200 references.",
  },
  {
    year: "2025",
    title: "Michelin Star",
    detail:
      "Awarded one Michelin star within 18 months of opening. Chef Moreau credited with 'quiet brilliance'.",
  },
  {
    year: "2026",
    title: "World's 50 Best",
    detail:
      "Enters the World's 50 Best at #28. Expands to 14 seats. Elena Voss joins as Head Sommelier.",
  },
];
