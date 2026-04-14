"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const TIMINGS = {
  doorsOpen: 2600,
  walkthrough: 3800,
  fadeStart: 5000,
  done: 6200,
};

function getInitialPhase(): string {
  if (typeof window === "undefined") return "done";
  if (sessionStorage.getItem("mn-intro")) return "done";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
  return "closed";
}

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState(getInitialPhase);
  const didInit = useRef(phase !== "done");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!didInit.current) return;

    const t1 = setTimeout(() => setPhase("opening"), TIMINGS.doorsOpen);
    const t2 = setTimeout(() => setPhase("walkthrough"), TIMINGS.walkthrough);
    const t3 = setTimeout(() => setPhase("fading"), TIMINGS.fadeStart);
    const t4 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("mn-intro", "1");
    }, TIMINGS.done);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Play video when doors start opening
  useEffect(() => {
    if (phase === "opening" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);

  // Skip intro — no overlay at all
  if (!didInit.current) return <>{children}</>;

  const doorsOpen = phase !== "closed" && phase !== "init";
  const isWalking = phase === "walkthrough" || phase === "fading";
  const isFading = phase === "fading";
  const showSite = phase === "fading" || phase === "done";

  return (
    <div className="relative">
      {/*
        Children: opacity 0 until fading phase.
        This prevents the flash — content is in DOM but invisible.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSite ? 1 : 0 }}
        transition={{ duration: 1.2, ease: easeEditorial }}
      >
        {children}
      </motion.div>

      {/* ─── Intro Overlay ─── */}
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          transition={
            isFading
              ? { duration: 1.2, ease: easeEditorial }
              : { duration: 0 }
          }
          style={{ pointerEvents: isFading ? "none" : "auto" }}
        >
          {/* ── BG: Walkthrough video ── */}
          <motion.div
            className="absolute inset-[-5%]"
            style={{ zIndex: 0 }}
            animate={
              isWalking
                ? { scale: 1.4 }
                : doorsOpen
                  ? { scale: 1.05 }
                  : { scale: 1 }
            }
            transition={{
              duration: isWalking ? 2.4 : 1.2,
              ease: easeEditorial,
            }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              style={{
                filter: "grayscale(40%) contrast(1.15) brightness(0.4) sepia(15%)",
              }}
            >
              <source src="/video/walkthrough.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-brass/8 via-ink/30 to-ink/70 mix-blend-multiply" />
          </motion.div>

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              background:
                "radial-gradient(ellipse at center, transparent 25%, rgba(10,10,10,0.75) 100%)",
            }}
          />

          {/* ── Left door ── */}
          <motion.div
            className="absolute inset-y-0 left-0 overflow-hidden bg-ink"
            initial={{ width: "50.1%" }}
            animate={doorsOpen ? { width: "0%", x: "-3%" } : { width: "50.1%" }}
            transition={{ duration: 1.0, ease: easeEditorial }}
            style={{ zIndex: 3 }}
          >
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(242,236,225,0.5) 28px, rgba(242,236,225,0.5) 29px)",
                }}
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/30 to-transparent" />
            <motion.div
              className="absolute right-8 top-1/2 -translate-y-1/2"
              animate={doorsOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-24 w-[2px] rounded-full bg-brass/25 shadow-[0_0_12px_rgba(138,106,59,0.15)]" />
              <div className="mt-1 h-2 w-2 rounded-full bg-brass/20 mx-auto" />
            </motion.div>
          </motion.div>

          {/* ── Right door ── */}
          <motion.div
            className="absolute inset-y-0 right-0 overflow-hidden bg-ink"
            initial={{ width: "50.1%" }}
            animate={doorsOpen ? { width: "0%", x: "3%" } : { width: "50.1%" }}
            transition={{ duration: 1.0, ease: easeEditorial }}
            style={{ zIndex: 3 }}
          >
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(242,236,225,0.5) 28px, rgba(242,236,225,0.5) 29px)",
                }}
              />
            </div>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/30 to-transparent" />
            <motion.div
              className="absolute left-8 top-1/2 -translate-y-1/2"
              animate={doorsOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-24 w-[2px] rounded-full bg-brass/25 shadow-[0_0_12px_rgba(138,106,59,0.15)]" />
              <div className="mt-1 h-2 w-2 rounded-full bg-brass/20 mx-auto" />
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
                    width: 2,
                    opacity: [0, 0.15, 0.5, 1],
                    boxShadow: [
                      "0 0 0px rgba(138,106,59,0)",
                      "0 0 20px rgba(138,106,59,0.15)",
                      "0 0 50px rgba(138,106,59,0.35)",
                      "0 0 100px rgba(138,106,59,0.6)",
                    ],
                  }
                : { width: 0, opacity: 0 }
            }
            transition={
              phase === "closed"
                ? { duration: 2.2, delay: 0.3, ease: "easeIn" }
                : { duration: 0.15 }
            }
          >
            <div className="h-full w-full bg-gradient-to-b from-brass/50 via-brass to-brass/50" />
          </motion.div>

          {/* ── Light flood ── */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0 }}
            animate={
              phase === "opening"
                ? { opacity: [0, 0.35, 0.15, 0.05] }
                : { opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(242,236,225,0.2) 0%, rgba(138,106,59,0.1) 40%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* ── Text: Maison Noir + Enter ── */}
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
                  : { opacity: 0, y: -40, scale: 1.2, filter: "blur(8px)" }
              }
              transition={
                phase === "closed"
                  ? { duration: 1.4, delay: 0.1, ease: easeEditorial }
                  : { duration: 0.6, ease: easeEditorial }
              }
            >
              Maison Noir
            </motion.p>
            <motion.div
              className="mt-5 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase === "closed"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -20 }
              }
              transition={
                phase === "closed"
                  ? { duration: 0.6, delay: 1.2, ease: easeEditorial }
                  : { duration: 0.3 }
              }
            >
              <motion.span
                className="h-px bg-brass/40"
                initial={{ width: 0 }}
                animate={phase === "closed" ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: easeEditorial }}
              />
              <span className="small-caps text-xs tracking-[0.3em] text-brass/80">
                Enter
              </span>
              <motion.span
                className="h-px bg-brass/40"
                initial={{ width: 0 }}
                animate={phase === "closed" ? { width: 24 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: easeEditorial }}
              />
            </motion.div>
          </div>

          {/* ── Walkthrough depth blur ── */}
          {isWalking && (
            <motion.div
              className="absolute inset-0"
              style={{ zIndex: 6, pointerEvents: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full w-full"
                style={{
                  backdropFilter: "blur(0px)",
                }}
                animate={{
                  backdropFilter: isFading
                    ? "blur(12px)"
                    : "blur(3px)",
                }}
                transition={{ duration: 1.5, ease: easeEditorial }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
