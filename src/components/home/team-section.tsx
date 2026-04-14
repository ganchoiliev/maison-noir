"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

const team = [
  {
    name: "Daniel Moreau",
    role: "Executive Chef & Founder",
    bio: "Trained under Alain Ducasse and René Redzepi. Two decades spent refining a style rooted in British produce and French technique. Awarded a Michelin star within eighteen months of opening.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=70&auto=format",
  },
  {
    name: "Elena Voss",
    role: "Head Sommelier",
    bio: "WSET Diploma holder and former sommelier at The Ledbury. Curates our wine pairing and oversees a cellar of 400 references, with a focus on Burgundy, the Rhône, and English sparkling.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70&auto=format",
  },
  {
    name: "James Okafor",
    role: "Sous Chef",
    bio: "A rising talent from south London, James brings precision and an intuitive understanding of heat and timing. He oversees the fish and sauce sections and leads the kitchen in Daniel's absence.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=70&auto=format",
  },
  {
    name: "Sophie Laurent",
    role: "Pastry Chef",
    bio: "Classically trained at Le Cordon Bleu. Sophie's desserts balance restraint with indulgence — expect clean flavours, textural contrasts, and the occasional nod to her childhood in Lyon.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=70&auto=format",
  },
];

export function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-ink py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeEditorial }}
        >
          <p className="small-caps text-sm text-brass">The Brigade</p>
          <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
            The People Behind the Pass
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: easeEditorial }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "grayscale(60%) contrast(1.05) brightness(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg text-bone">{member.name}</p>
                  <p className="small-caps text-xs text-brass">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-bone/55">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
