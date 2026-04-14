"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 py-2"
          >
            <svg className="h-4 w-4 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <p className="text-sm text-bone">Welcome to the list.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-border border-r-0 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 transition-colors focus:border-brass focus:outline-none"
            />
            <button
              type="submit"
              className="group relative overflow-hidden border border-brass px-5 py-3 text-sm text-brass transition-all hover:text-ink"
            >
              <span className="relative z-10">Join</span>
              <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-300 group-hover:translate-x-0" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
