"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/components/motion/reduced-motion";
import { easeEditorial } from "@/lib/utils/motion";
import { Typewriter } from "./typewriter";
import { AwardsBadge } from "./awards-badge";

const lineVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: easeEditorial,
    },
  }),
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink"
    >
      {/* Video background with parallax */}
      <motion.div
        className="absolute inset-[-10%]"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1280&q=50&auto=format"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.6)" }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Duotone color wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-brass/15 via-ink/50 to-ink/85 mix-blend-multiply" />
      </motion.div>

      {/* Dark gradient for text legibility */}
      <div className="gradient-overlay-bottom" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Noise texture */}
      <div className="bg-noise absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-5xl leading-tight tracking-tight text-bone md:text-6xl lg:text-7xl"
            variants={lineVariants}
            initial={reducedMotion ? "visible" : "hidden"}
            animate="visible"
            custom={0}
          >
            An edition of{" "}
            <span className="italic text-ember">twelve courses</span>,
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-5xl leading-tight tracking-tight text-bone md:text-6xl lg:text-7xl"
            variants={lineVariants}
            initial={reducedMotion ? "visible" : "hidden"}
            animate="visible"
            custom={1}
          >
            served nightly.
          </motion.h1>
        </div>

        <AwardsBadge />
        <hr className="brass-rule my-4" />

        <motion.div
          className="space-y-4"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm tracking-widest text-brass">
            <Typewriter /> · Service 18:00 – 22:30
          </p>
          <Link
            href="/reserve"
            className="mt-2 inline-block border border-ember bg-ember px-8 py-3 text-sm font-medium tracking-wide text-bone transition-all hover:bg-ember-hover hover:shadow-[0_0_20px_rgba(138,106,59,0.15)]"
          >
            Reserve a Seat
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reducedMotion ? { opacity: 0.4 } : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-bone/30 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-bone/50"
            animate={reducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
