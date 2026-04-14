"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300 });
  const springY = useSpring(y, { damping: 25, stiffness: 300 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      isTouch.current = true;
    };
    window.addEventListener("touchstart", checkTouch, { once: true });

    const handleMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      x.set(e.clientX - 20);
      y.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", checkTouch);
    };
  }, [x, y]);

  // Hide on touch devices and when reduced motion is preferred
  if (typeof window !== "undefined") {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-10 w-10 rounded-full bg-bone mix-blend-difference md:block"
      style={{ x: springX, y: springY }}
    />
  );
}
