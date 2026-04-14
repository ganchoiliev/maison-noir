"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function VideoDivider({
  src,
  height = "h-[30vh] md:h-[40vh]",
}: {
  src: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${height}`}>
      <motion.div className="absolute inset-[-5%]" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(60%) contrast(1.15) brightness(0.4)" }}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/50" />
        <div className="bg-noise absolute inset-0" />
      </motion.div>
    </div>
  );
}
