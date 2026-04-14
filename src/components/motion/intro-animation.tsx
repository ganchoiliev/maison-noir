"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const TIMINGS = {
  doorsOpen: 2400,
  reveal: 3400,
  done: 4600,
};

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  // Start as "loading" — renders nothing until client confirms state
  const [phase, setPhase] = useState("loading");
  const shouldPlay = useRef(false);

  // First effect: determine whether to play intro (client-only)
  useEffect(() => {
    const skip =
      sessionStorage.getItem("mn-intro") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      setPhase("done");
      return;
    }

    shouldPlay.current = true;
    setPhase("closed");

    const t1 = setTimeout(() => setPhase("opening"), TIMINGS.doorsOpen);
    const t2 = setTimeout(() => setPhase("reveal"), TIMINGS.reveal);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("mn-intro", "1");
    }, TIMINGS.done);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // "loading" = first render, before hydration decides. Show black screen.
  if (phase === "loading") {
    return (
      <div className="fixed inset-0 z-[10000] bg-ink" aria-hidden="true" />
    );
  }

  // Skip intro entirely
  if (phase === "done" && !shouldPlay.current) {
    return <>{children}</>;
  }

  const doorsOpen = phase === "opening" || phase === "reveal" || phase === "done";
  const isRevealing = phase === "reveal";
  const isDone = phase === "done";

  return (
    <>
      {/* Site content — hidden until reveal, then fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone || isRevealing ? 1 : 0 }}
        transition={{ duration: isDone ? 0 : 1.2, ease: easeEditorial }}
      >
        {children}
      </motion.div>

      {/* ─── Overlay ─── */}
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          animate={{ opacity: isRevealing ? 0 : 1 }}
          transition={isRevealing ? { duration: 1.2, ease: easeEditorial } : { duration: 0 }}
          style={{ pointerEvents: isRevealing ? "none" : "auto" }}
        >
          {/* Solid black background */}
          <div className="absolute inset-0 bg-ink" />

          {/* ── Left door ── */}
          <motion.div
            className="absolute inset-y-0 left-0 overflow-hidden bg-ink"
            style={{ zIndex: 3 }}
            initial={{ width: "50.2%" }}
            animate={doorsOpen ? { width: "0%", x: "-4%" } : { width: "50.2%" }}
            transition={{ duration: 1.0, ease: easeEditorial }}
          >
            {/* Wood grain */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(242,236,225,0.5) 28px, rgba(242,236,225,0.5) 29px)",
              }}
            />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent" />
            {/* Handle */}
            <motion.div
              className="absolute right-8 top-1/2 -translate-y-1/2"
              animate={doorsOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-24 w-[2px] rounded-full bg-brass/25 shadow-[0_0_12px_rgba(138,106,59,0.15)]" />
              <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-brass/20" />
            </motion.div>
          </motion.div>

          {/* ── Right door ── */}
          <motion.div
            className="absolute inset-y-0 right-0 overflow-hidden bg-ink"
            style={{ zIndex: 3 }}
            initial={{ width: "50.2%" }}
            animate={doorsOpen ? { width: "0%", x: "4%" } : { width: "50.2%" }}
            transition={{ duration: 1.0, ease: easeEditorial }}
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(242,236,225,0.5) 28px, rgba(242,236,225,0.5) 29px)",
              }}
            />
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent" />
            <motion.div
              className="absolute left-8 top-1/2 -translate-y-1/2"
              animate={doorsOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-24 w-[2px] rounded-full bg-brass/25 shadow-[0_0_12px_rgba(138,106,59,0.15)]" />
              <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-brass/20" />
            </motion.div>
          </motion.div>

          {/* ── Door seam glow ── */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ zIndex: 4 }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              phase === "closed"
                ? {
                    width: 3,
                    opacity: [0, 0.2, 0.6, 1],
                    boxShadow: [
                      "0 0 0px rgba(138,106,59,0)",
                      "0 0 20px rgba(138,106,59,0.2)",
                      "0 0 60px rgba(138,106,59,0.4)",
                      "0 0 120px rgba(138,106,59,0.7)",
                    ],
                  }
                : { width: 0, opacity: 0 }
            }
            transition={
              phase === "closed"
                ? { duration: 2, delay: 0.3, ease: "easeIn" }
                : { duration: 0.2 }
            }
          >
            <div className="h-full w-full bg-gradient-to-b from-brass/40 via-brass to-brass/40" />
          </motion.div>

          {/* ── Warm light behind doors (visible when they open) ── */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={
              doorsOpen
                ? { opacity: [0, 0.6, 0.3, 0.1, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(138,106,59,0.25) 0%, rgba(242,236,225,0.08) 30%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* ── Text: Maison Noir ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <motion.p
              className="font-display text-4xl tracking-tight text-bone md:text-6xl"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
              animate={
                phase === "closed"
                  ? { opacity: 1, y: 0, letterSpacing: "0.02em" }
                  : { opacity: 0, y: -30, scale: 1.15, filter: "blur(8px)" }
              }
              transition={
                phase === "closed"
                  ? { duration: 1.4, delay: 0.1, ease: easeEditorial }
                  : { duration: 0.5, ease: easeEditorial }
              }
            >
              Maison Noir
            </motion.p>
            <motion.div
              className="mt-5 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={phase === "closed" ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              transition={
                phase === "closed"
                  ? { duration: 0.6, delay: 1.2, ease: easeEditorial }
                  : { duration: 0.2 }
              }
            >
              <motion.span
                className="h-px bg-brass/40"
                initial={{ width: 0 }}
                animate={phase === "closed" ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: easeEditorial }}
              />
              <span className="small-caps text-xs tracking-[0.3em] text-brass/80">Enter</span>
              <motion.span
                className="h-px bg-brass/40"
                initial={{ width: 0 }}
                animate={phase === "closed" ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: easeEditorial }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
