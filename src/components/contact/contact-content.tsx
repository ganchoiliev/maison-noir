"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

/* ── Reveal ── */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: easeEditorial }}>
      {children}
    </motion.div>
  );
}

/* ── Contact info card ── */
function InfoCard({ icon, title, children, delay = 0 }: { icon: React.ReactNode; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="group border border-border bg-fog p-7 transition-all duration-500 hover:border-brass/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center border border-bone/10 text-brass/60 transition-colors duration-300 group-hover:border-brass/30 group-hover:text-brass">
        {icon}
      </div>
      <h3 className="font-display text-lg text-bone">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-bone/50">{children}</div>
    </Reveal>
  );
}

/* ── Main ── */
export function ContactContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [messageText, setMessageText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("sent");
  };

  return (
    <div className="min-h-screen">
      {/* ══════ HERO — London night with parallax ══════ */}
      <div ref={heroRef} className="relative flex h-[65vh] items-end overflow-hidden md:h-[70vh]">
        <motion.div className="absolute inset-[-10%]" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&q=70&auto=format"
            alt="London at night, Covent Garden"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(50%) contrast(1.1) brightness(0.4) sepia(10%)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="vignette" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 lg:px-8">
          <motion.p
            className="small-caps text-sm text-brass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeEditorial }}
          >
            Find Us
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-5xl text-bone md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeEditorial }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="mt-4 max-w-md text-bone/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: easeEditorial }}
          >
            We&apos;d love to hear from you — whether it&apos;s a question, a special request, or just to say hello.
          </motion.p>
        </div>
      </div>

      {/* ══════ INFO CARDS ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              delay={0}
              title="Address"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" /></svg>}
            >
              <p>12 Floral Street</p>
              <p>Covent Garden</p>
              <p>London WC2E 9DH</p>
              <p className="mt-2 text-xs text-brass/60">2 min from Covent Garden tube</p>
            </InfoCard>

            <InfoCard
              delay={0.08}
              title="Hours"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
            >
              <p>Tuesday – Sunday</p>
              <p>First seating: 18:00</p>
              <p>Second seating: 20:45</p>
              <p className="mt-2 text-xs text-ember/70">Closed Mondays</p>
            </InfoCard>

            <InfoCard
              delay={0.16}
              title="Reservations"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>}
            >
              <p>reservations@maison-noir.com</p>
              <p>+44 (0)20 7240 0012</p>
              <p className="mt-2 text-xs text-bone/30">60-day rolling window</p>
            </InfoCard>

            <InfoCard
              delay={0.24}
              title="Press & Events"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>}
            >
              <p>press@maison-noir.com</p>
              <p>events@maison-noir.com</p>
              <p className="mt-2 text-xs text-bone/30">Private dining up to 14 guests</p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ══════ MAP + DIRECTIONS ══════ */}
      <section className="border-y border-border bg-fog">
        <div className="bg-noise relative">
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-section lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Map image */}
              <Reveal>
                <div className="relative aspect-square overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=70&auto=format"
                    alt="Covent Garden, London"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ filter: "grayscale(80%) contrast(1.1) brightness(0.5)" }}
                  />
                  <div className="absolute inset-0 bg-ink/30" />
                  {/* Pin */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ember/50 bg-ember/20 backdrop-blur-sm">
                        <svg className="h-5 w-5 text-ember" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                    </motion.div>
                    <p className="mt-3 small-caps text-xs tracking-widest text-bone/80">Maison Noir</p>
                    <p className="text-[10px] text-bone/40">Covent Garden, London</p>
                  </div>
                </div>
              </Reveal>

              {/* How to find us */}
              <Reveal delay={0.15}>
                <p className="small-caps text-sm text-brass">How to Find Us</p>
                <h2 className="mt-2 font-display text-3xl text-bone">Getting Here</h2>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      mode: "Tube",
                      icon: "M",
                      detail: "Covent Garden station (Piccadilly line) — 2 minute walk. Exit and turn left onto Long Acre, then right onto Floral Street.",
                    },
                    {
                      mode: "Bus",
                      icon: "B",
                      detail: "Routes 9, 13, 15, 23, 139 stop on The Strand, a 5 minute walk via Southampton Street.",
                    },
                    {
                      mode: "Car",
                      icon: "P",
                      detail: "NCP Covent Garden (Parker Street, WC2B 5PZ) is a 3 minute walk. We recommend public transport.",
                    },
                    {
                      mode: "On Foot",
                      icon: "W",
                      detail: "Look for the discreet dark door between a florist and a gallery on Floral Street. The brass 'MN' plaque marks the entrance.",
                    },
                  ].map((item) => (
                    <div key={item.mode} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-bone/10 font-mono text-xs text-brass/60">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-bone">{item.mode}</p>
                        <p className="mt-0.5 text-sm text-bone/45">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CONTACT FORM ══════ */}
      <section className="py-section">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left — intro */}
            <Reveal>
              <p className="small-caps text-sm text-brass">Get in Touch</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
                Send Us a Message
              </h2>
              <p className="mt-4 text-bone/50 leading-relaxed">
                Whether you have a question about our menu, need help with a reservation, or want to
                discuss a private event — we&apos;re here to help. We typically respond within 24 hours.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-bone/10 text-brass/50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-bone">hello@maison-noir.com</p>
                    <p className="text-xs text-bone/30">General enquiries</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-bone/10 text-brass/50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-bone">+44 (0)20 7240 0012</p>
                    <p className="text-xs text-bone/30">Tue–Sun, 10:00–17:00</p>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-8 flex gap-3">
                  {[
                    { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                    { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { label: "TripAdvisor", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-7H7c0-2.76 2.24-5 5-5s5 2.24 5 5z" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center border border-bone/10 text-bone/30 transition-all duration-300 hover:border-brass/40 hover:text-bone"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.15}>
              <div className="border border-border bg-fog p-8">
                {formState === "sent" ? (
                  <motion.div
                    className="flex flex-col items-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: easeEditorial }}
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brass/30">
                      <svg className="h-8 w-8 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl text-bone">Message Sent</h3>
                    <p className="mt-2 text-sm text-bone/50">
                      Thank you, {name}. We&apos;ll be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => { setFormState("idle"); setName(""); setEmail(""); setMessageText(""); setSubject("general"); }}
                      className="mt-6 text-xs text-brass transition-colors hover:text-bone"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm text-bone/60">Subject</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "general", label: "General" },
                          { id: "reservation", label: "Reservation" },
                          { id: "private", label: "Private Dining" },
                          { id: "press", label: "Press" },
                          { id: "careers", label: "Careers" },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSubject(s.id)}
                            className={`border px-3 py-1.5 text-xs transition-all duration-300 ${
                              subject === s.id
                                ? "border-brass bg-brass/10 text-brass"
                                : "border-border text-bone/30 hover:border-bone/20 hover:text-bone/50"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm text-bone/60">Message *</label>
                      <textarea
                        rows={5}
                        required
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="How can we help?"
                        className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="group relative w-full overflow-hidden border border-ember py-3.5 text-sm font-medium text-bone transition-all disabled:opacity-50"
                    >
                      <span className="relative z-10">
                        {formState === "sending" ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
                    </button>

                    <p className="text-center text-[10px] text-bone/15">
                      We respond to all enquiries within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ QUICK LINKS ══════ */}
      <section className="border-t border-border bg-fog/50 py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <h2 className="font-display text-2xl text-bone">Quick Links</h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Reserve a Seat", desc: "Book your table for any evening this season.", href: "/reserve", cta: "Reserve" },
              { title: "Gift Vouchers", desc: "Give an unforgettable evening to someone special.", href: "/gift-vouchers", cta: "Browse vouchers" },
              { title: "FAQ", desc: "Answers to our most common questions.", href: "/faq", cta: "Read FAQ" },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.08}>
                <Link
                  href={item.href}
                  className="group flex flex-col border border-border bg-fog p-6 transition-all duration-300 hover:border-brass/30"
                >
                  <h3 className="font-display text-lg text-bone">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-bone/40">{item.desc}</p>
                  <p className="mt-4 flex items-center gap-1 text-xs text-brass transition-colors group-hover:text-bone">
                    {item.cta}
                    <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
