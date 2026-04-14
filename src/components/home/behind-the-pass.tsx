"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function BehindThePass() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      {/* Full-width video */}
      <motion.div className="relative" style={{ opacity }}>
        <div className="relative h-[70vh] md:h-[80vh]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(50%) contrast(1.15) brightness(0.55)" }}
          >
            <source src="/video/plating.mp4" type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />
          <div className="vignette" />
          <div className="bg-noise absolute inset-0" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="max-w-2xl px-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: easeEditorial }}
            >
              <p className="small-caps text-sm tracking-widest text-brass">Behind the Pass</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-bone md:text-5xl">
                Every Plate Tells a Story
              </h2>
              <hr className="brass-rule my-6" />
              <p className="text-bone/60">
                From the first prep cut at dawn to the final garnish under service lights — our
                brigade works with the rhythm of the season, guided by precision and an obsessive
                attention to the details you may never see, but will always taste.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Process steps */}
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="grid gap-px bg-border md:grid-cols-4">
          {[
            {
              time: "06:00",
              title: "Market & Delivery",
              desc: "First deliveries arrive. The day's produce inspected and accepted by the sous chef.",
            },
            {
              time: "09:00",
              title: "Mise en Place",
              desc: "Every element prepared, every sauce reduced, every garnish prepped to exacting standards.",
            },
            {
              time: "17:30",
              title: "Final Briefing",
              desc: "The brigade gathers. Tonight's menu is walked through — every plate, every pairing, every detail.",
            },
            {
              time: "18:00",
              title: "Service",
              desc: "The first guests arrive. Twelve courses begin their journey from pass to counter.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.time}
              className="bg-ink p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: easeEditorial }}
            >
              <p className="font-display text-2xl text-ember">{step.time}</p>
              <h3 className="mt-2 text-sm font-medium text-bone">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
