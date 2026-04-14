"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";
import type { Course } from "@/types";

function toRoman(n: number): string {
  const numerals: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  let remaining = n;
  for (const [value, symbol] of numerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function MenuPreviewClient({
  seasonName,
  courses,
}: {
  seasonName: string;
  courses: Course[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-noise bg-fog py-section">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">{seasonName}</p>
          <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
            Tonight&apos;s Menu
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              className="group relative bg-fog p-6 transition-colors duration-300 hover:bg-ink/30"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.6,
                ease: easeEditorial,
              }}
            >
              {/* Watermark numeral */}
              <span className="absolute right-4 top-2 font-display text-4xl text-bone/5 transition-colors duration-300 group-hover:text-brass/10">
                {toRoman(course.position)}
              </span>

              {/* Hover top accent */}
              <div className="absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-brass/40 transition-transform duration-500 group-hover:scale-x-100" />

              <p className="text-xs text-brass">{toRoman(course.position)}</p>
              <h3 className="mt-2 font-display text-xl text-bone">{course.name}</h3>
              {course.description && (
                <p className="mt-2 text-sm leading-relaxed text-bone/50">{course.description}</p>
              )}
              {course.allergens.length > 0 && (
                <p className="mt-3 text-xs text-muted/60">{course.allergens.join(" · ")}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="nav-link small-caps text-sm text-brass transition-colors hover:text-bone"
          >
            View Full Menu &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
