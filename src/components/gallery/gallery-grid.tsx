"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

interface GalleryImage {
  src: string;
  alt: string;
  span: string;
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, i) => (
        <GalleryItem key={image.src} image={image} index={i} />
      ))}
    </div>
  );
}

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`group relative aspect-square overflow-hidden ${image.span}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.6, ease: easeEditorial }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={image.span.includes("col-span-2") ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "grayscale(30%) contrast(1.05) brightness(0.9)" }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
      <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-xs text-bone/80">{image.alt}</p>
      </div>
    </motion.div>
  );
}
