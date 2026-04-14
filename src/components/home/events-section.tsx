"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const events = [
  {
    date: "24 Apr 2026",
    title: "Winemaker's Dinner: Domaine Vacheron",
    description:
      "An evening with fourth-generation vigneron Stéphane Vacheron. Six courses paired with rare Sancerre cuvées, including an exclusive en primeur tasting.",
    status: "Limited seats",
  },
  {
    date: "8 May 2026",
    title: "Foraging Supper: Spring Hedgerow",
    description:
      "Chef Moreau and forager Marcus Sherwood create a one-night menu built entirely around wild ingredients gathered that morning from the Kent Downs.",
    status: "Booking open",
  },
  {
    date: "22 May 2026",
    title: "Counter Talk: The Art of Fermentation",
    description:
      "An intimate masterclass exploring the role of fermentation in modern British cooking. Includes a four-course tasting and a take-home culture kit.",
    status: "Coming soon",
  },
];

export function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink py-section">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">Calendar</p>
          <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">Upcoming Evenings</h2>
        </motion.div>

        <div className="space-y-0">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className="group border-b border-border py-8 first:pt-0 last:border-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: easeEditorial }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="small-caps text-xs text-brass">{event.date}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                        event.status === "Limited seats"
                          ? "bg-ember/10 text-ember"
                          : event.status === "Coming soon"
                            ? "bg-border text-muted"
                            : "bg-brass/10 text-brass"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-bone">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/50">{event.description}</p>
                </div>
                <Link
                  href="/reserve"
                  className="shrink-0 self-start border border-border px-5 py-2 text-sm text-muted transition-all hover:border-bone hover:text-bone md:self-center"
                >
                  Enquire
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
