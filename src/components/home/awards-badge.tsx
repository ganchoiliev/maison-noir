"use client";

import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

export function AwardsBadge() {
  return (
    <motion.div
      className="flex items-center justify-center gap-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: easeEditorial }}
    >
      {/* Michelin star */}
      <div className="flex items-center gap-2">
        <svg className="h-5 w-5 text-ember" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="small-caps text-xs tracking-widest text-bone/70">Michelin Star</span>
      </div>

      <span className="h-4 w-px bg-border" />

      {/* 50 Best */}
      <div className="flex items-center gap-2">
        <span className="font-display text-sm text-brass">#28</span>
        <span className="small-caps text-xs tracking-widest text-bone/70">
          World&apos;s 50 Best
        </span>
      </div>
    </motion.div>
  );
}
