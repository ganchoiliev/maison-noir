"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70&auto=format",
    alt: "Artfully plated main course",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=70&auto=format",
    alt: "Vibrant seasonal salad",
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=70&auto=format",
    alt: "Morning pastry and coffee",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&q=70&auto=format",
    alt: "Dessert with precision plating",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&q=70&auto=format",
    alt: "Wine glasses at the counter",
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&q=70&auto=format",
    alt: "Chef at work in the kitchen",
  },
];

export function InstagramSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-ink py-section">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: easeEditorial }}
      >
        <p className="small-caps text-sm text-brass">@maisonnoir</p>
        <h2 className="mt-2 font-display text-2xl text-bone">Follow the Season</h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {posts.map((post, i) => (
          <motion.a
            key={post.src}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.5, ease: easeEditorial }}
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              sizes="(max-width: 768px) 33vw, 16.6vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg className="h-6 w-6 text-bone" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
