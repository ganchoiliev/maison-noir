"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ImageDivider({
  src,
  alt,
  height = "h-[30vh] md:h-[40vh]",
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
          style={{ filter: "grayscale(60%) contrast(1.1) brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/40" />
      </motion.div>
    </div>
  );
}
