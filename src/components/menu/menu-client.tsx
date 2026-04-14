"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";
import type { Season, Course } from "@/types";

function toRoman(n: number): string {
  const numerals: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
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

const allergenIcons: Record<string, string> = {
  dairy: "D",
  gluten: "G",
  nuts: "N",
  egg: "E",
  fish: "F",
  crustacean: "C",
  mustard: "M",
};

export function MenuClient({
  seasons,
  activeSlug,
}: {
  seasons: Season[];
  activeSlug: string | null;
}) {
  const [selectedSlug, setSelectedSlug] = useState(activeSlug ?? seasons[0]?.slug ?? "");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showPairings, setShowPairings] = useState(true);
  const selected = seasons.find((s) => s.slug === selectedSlug);
  const courses = (selected?.courses ?? []).filter((c: Course) => c.is_published);

  return (
    <>
      {/* Season tabs */}
      {seasons.length > 1 && (
        <div className="mb-10 flex justify-center gap-6">
          {seasons.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSelectedSlug(s.slug)}
              className={`small-caps relative pb-2 text-sm transition-colors duration-300 ${
                selectedSlug === s.slug ? "text-bone" : "text-bone/30 hover:text-bone/60"
              }`}
            >
              {s.name}
              {selectedSlug === s.slug && (
                <motion.span
                  layoutId="season-tab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-ember"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs text-bone/30">
          {courses.length} courses
        </p>
        <button
          onClick={() => setShowPairings(!showPairings)}
          className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
            showPairings ? "text-brass" : "text-bone/30 hover:text-bone/50"
          }`}
        >
          <span
            className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors duration-300 ${
              showPairings ? "bg-brass/30" : "bg-border"
            }`}
          >
            <motion.span
              className={`h-3 w-3 rounded-full ${showPairings ? "bg-brass" : "bg-bone/30"}`}
              animate={{ x: showPairings ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </span>
          <span className="small-caps">Wine pairings</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-10 flex gap-1">
        {courses.map((course: Course, i: number) => (
          <button
            key={course.id}
            onClick={() => {
              const el = document.getElementById(`course-${course.id}`);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="group relative flex-1"
            title={`${toRoman(course.position)}. ${course.name}`}
          >
            <div className="h-1 w-full rounded-full bg-border transition-colors duration-300 group-hover:bg-brass/40" />
            {i % 3 === 0 && (
              <span className="absolute -bottom-5 left-0 text-[9px] text-bone/15">
                {toRoman(course.position)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Courses */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSlug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-0"
        >
          {courses.map((course: Course, i: number) => (
            <CourseRow
              key={course.id}
              course={course}
              index={i}
              expanded={expandedCourse === course.id}
              showPairing={showPairings}
              onToggle={() =>
                setExpandedCourse(expandedCourse === course.id ? null : course.id)
              }
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function CourseRow({
  course,
  index,
  expanded,
  showPairing,
  onToggle,
}: {
  course: Course;
  index: number;
  expanded: boolean;
  showPairing: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      id={`course-${course.id}`}
      className="group cursor-pointer border-b border-border/60 transition-all duration-500 hover:bg-fog/30"
      onClick={onToggle}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5, ease: easeEditorial }}
    >
      <div className="flex items-start gap-4 py-7 pl-4 pr-4 md:gap-6 md:pl-6">
        {/* Position number */}
        <div className="relative w-12 shrink-0 pt-1 text-center">
          <span className="font-display text-3xl text-brass/15 transition-colors duration-500 group-hover:text-brass/40 md:text-4xl">
            {toRoman(course.position)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-bone md:text-2xl">
              {course.name}
            </h3>
            {/* Expand indicator */}
            <motion.span
              className="mt-1 shrink-0 text-xs text-bone/15"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.span>
          </div>

          {course.description && (
            <p className="mt-2 text-sm leading-relaxed text-bone/50">
              {course.description}
            </p>
          )}

          {/* Allergens */}
          {course.allergens.length > 0 && (
            <div className="mt-3 flex gap-1.5">
              {course.allergens.map((a) => (
                <span
                  key={a}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-bone/10 text-[9px] text-bone/30"
                  title={a}
                >
                  {allergenIcons[a] ?? a[0]?.toUpperCase()}
                </span>
              ))}
            </div>
          )}

          {/* Wine pairing — inline */}
          <AnimatePresence>
            {showPairing && course.wine_pairing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <svg className="h-3 w-3 text-brass/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C9.5 2 7 7 7 11c0 3 2 5 5 5s5-2 5-5c0-4-2.5-9-5-9zm0 18c-.6 0-1 .4-1 1v1h2v-1c0-.6-.4-1-1-1z" />
                  </svg>
                  <span className="italic text-brass/60">{course.wine_pairing}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded detail */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: easeEditorial }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-border/30 pt-4">
                  <p className="text-xs leading-relaxed text-bone/35">
                    This course is part of our {course.position <= 6 ? "opening sequence" : course.position <= 9 ? "main progression" : "closing sequence"},
                    designed to {course.position <= 3 ? "awaken the palate" : course.position <= 6 ? "build complexity" : course.position <= 9 ? "deliver the centrepiece" : "bring the evening to a gentle close"}.
                    {course.allergens.length > 0 && ` Contains: ${course.allergens.join(", ")}.`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
