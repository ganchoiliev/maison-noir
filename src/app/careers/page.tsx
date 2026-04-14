import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Maison Noir team. Current opportunities in our kitchen and front of house.",
};

const positions = [
  {
    title: "Chef de Partie",
    department: "Kitchen",
    type: "Full-time",
    description:
      "We're looking for an experienced CDP to join our brigade. You should have a passion for seasonal cooking, strong technique, and the ability to work at a high standard under pressure.",
  },
  {
    title: "Sommelier",
    department: "Front of House",
    type: "Full-time",
    description:
      "An opportunity for a knowledgeable and personable sommelier to curate and present our wine pairing programme. WSET Level 3 or equivalent preferred.",
  },
  {
    title: "Host / Reservations",
    department: "Front of House",
    type: "Part-time",
    description:
      "The first and last impression of Maison Noir. We need someone warm, organised, and detail-oriented to manage our reservations and welcome guests.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=70&auto=format"
          alt="Kitchen brigade at work"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brass/15 via-transparent to-ink mix-blend-multiply" />
        <div className="gradient-overlay-bottom" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="small-caps text-sm text-brass">Join Our Team</p>
            <h1 className="mt-2 font-display text-5xl text-bone md:text-6xl">Careers</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-section lg:px-8">
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          We are a small, dedicated team united by a love of seasonal cooking and exceptional
          hospitality. If you share our values, we&apos;d love to hear from you.
        </p>

        <div className="space-y-0">
          {positions.map((pos) => (
            <div
              key={pos.title}
              className="group border-b border-border py-8 transition-colors duration-300 first:pt-0 last:border-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-bone">{pos.title}</h3>
                <div className="flex gap-3">
                  <span className="small-caps text-xs text-brass">{pos.department}</span>
                  <span className="text-xs text-muted">{pos.type}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-bone/55">{pos.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border bg-fog/50 p-8 text-center">
          <h3 className="font-display text-xl text-bone">Don&apos;t see your role?</h3>
          <p className="mt-2 text-sm text-muted">
            We&apos;re always interested in hearing from talented people. Send your CV and a brief
            note about yourself to{" "}
            <span className="text-bone">careers@maison-noir.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
