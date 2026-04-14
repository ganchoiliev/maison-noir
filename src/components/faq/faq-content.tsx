"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

/* ── Types ── */
interface FaqItem {
  question: string;
  answer: string;
  link?: { label: string; href: string };
}

interface FaqCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: FaqItem[];
}

/* ── Data ── */
const categories: FaqCategory[] = [
  {
    id: "dining",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12" />
      </svg>
    ),
    title: "The Dining Experience",
    description: "Menu, courses, timing, and what to expect",
    items: [
      {
        question: "Is there a tasting menu only?",
        answer: "Yes. We serve a single twelve-course tasting menu at £185 per guest. An optional wine pairing curated by our sommelier is available at £95. A dedicated vegetarian tasting menu is also available on request. The menu changes frequently to reflect the best seasonal produce.",
        link: { label: "View current menu", href: "/menu" },
      },
      {
        question: "How long does the tasting menu take?",
        answer: "The full twelve-course experience typically lasts between 2.5 and 3 hours. We encourage guests to relax and enjoy the pace — this is not a meal to be rushed. If you have time constraints, please let us know at the time of booking and we will do our best to accommodate.",
      },
      {
        question: "Can you accommodate dietary requirements?",
        answer: "Absolutely. Please inform us of any allergies or dietary requirements at the time of booking, and again upon arrival. We cater to vegetarian, vegan, gluten-free, and most other dietary needs. Our full vegetarian tasting menu is a complete alternative, not a modification. While we take every precaution, we cannot guarantee a completely allergen-free environment.",
      },
      {
        question: "Do you offer a vegetarian or vegan menu?",
        answer: "Yes. We offer a dedicated twelve-course vegetarian tasting menu at the same price (£185). For vegan guests, our chefs can adapt the vegetarian menu — please note this at booking so we can prepare accordingly. Every dish is composed with the same care as our main menu.",
        link: { label: "See the vegetarian menu", href: "/menu" },
      },
      {
        question: "Is the wine pairing worth it?",
        answer: "We think so — but we would say that. Our Head Sommelier Elena Voss curates a journey through 6–8 wines specifically matched to the evening's courses, including some rare allocations you won't find by the glass elsewhere. If you prefer, you can also order from our full wine list à la carte.",
      },
    ],
  },
  {
    id: "reservations",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Reservations",
    description: "Booking, cancellations, and availability",
    items: [
      {
        question: "How far in advance can I book?",
        answer: "Reservations open on a rolling 60-day window. We offer two seatings nightly — 18:00 and 20:45 — Tuesday through Sunday. We are closed on Mondays. Popular dates (Friday/Saturday evenings) can fill within hours, so we recommend booking as soon as your 60-day window opens.",
        link: { label: "Reserve a seat", href: "/reserve" },
      },
      {
        question: "What is the cancellation policy?",
        answer: "We kindly ask for a minimum of 24 hours notice for cancellations. No-shows or late cancellations may be subject to a charge of £85 per guest. We understand that plans change — please contact us as early as possible and we will do our best to accommodate. You can cancel or modify your booking by emailing reservations@maison-noir.com.",
      },
      {
        question: "Can I book for a special occasion?",
        answer: "Of course. Please mention any celebrations (birthdays, anniversaries, proposals) in the notes when booking. We can arrange personalised touches — a handwritten message with your dessert course, a special wine selection, or flowers at the counter. There is no additional charge for this.",
      },
      {
        question: "What is the maximum party size?",
        answer: "For our regular seatings, we can accommodate parties of up to 4 guests seated together. For larger groups (up to 14), we offer exclusive hire of the entire counter. Please email events@maison-noir.com for private dining enquiries.",
        link: { label: "Private dining", href: "/private-dining" },
      },
    ],
  },
  {
    id: "visiting",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
      </svg>
    ),
    title: "Visiting Us",
    description: "Location, dress code, parking, and accessibility",
    items: [
      {
        question: "What is the dress code?",
        answer: "Smart casual. We want you to feel comfortable and confident. Think: a considered outfit that shows you've made an effort, but nothing stuffy. We respectfully reserve the right to refuse entry to guests whose attire does not meet the standard of the dining room. Trainers, sportswear, flip-flops, and shorts are not permitted.",
      },
      {
        question: "Where are you located?",
        answer: "We are at 12 Floral Street, Covent Garden, London WC2E 9DH. The entrance is a discreet dark door between a florist and a gallery — look for the brass 'MN' plaque. Covent Garden tube station is a 2-minute walk.",
        link: { label: "Get directions", href: "/contact" },
      },
      {
        question: "Is there parking nearby?",
        answer: "There is no private parking at the restaurant. The nearest car park is NCP Covent Garden (Parker Street, WC2B 5PZ), a 3-minute walk. We strongly recommend public transport or taxi — Covent Garden tube station is a 2-minute walk, and Leicester Square is 5 minutes.",
      },
      {
        question: "Is the restaurant wheelchair accessible?",
        answer: "The dining room is at street level with step-free access throughout. Our counter seating can accommodate wheelchair users — please let us know at the time of booking so we can reserve the most comfortable position. The bathroom is fully accessible.",
      },
      {
        question: "Do you allow photography?",
        answer: "You are welcome to photograph your dishes — we encourage it. We ask that flash, tripods, and ring lights are not used, and that you are considerate of other guests. Our kitchen is open, so you are also welcome to photograph the team at work. We may occasionally photograph dishes for our own channels — let us know if you prefer not to be included.",
      },
    ],
  },
  {
    id: "gifts",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    title: "Gifts & Vouchers",
    description: "Purchasing, redeeming, and validity",
    items: [
      {
        question: "Can I purchase gift vouchers?",
        answer: "Yes. We offer dining vouchers for the tasting menu (£185), tasting menu with wine pairing (£280), the full experience for two (£560), and custom amounts from £50 to £1,000. Vouchers are delivered instantly by email, beautifully formatted and ready to forward or print.",
        link: { label: "Purchase a voucher", href: "/gift-vouchers" },
      },
      {
        question: "How do I redeem a voucher?",
        answer: "When making a reservation, simply mention your voucher code in the booking notes or present it on arrival. The voucher value will be deducted from your bill. If your bill exceeds the voucher value, the balance can be paid on the evening. Vouchers cannot be exchanged for cash.",
      },
      {
        question: "How long are vouchers valid?",
        answer: "All vouchers are valid for 12 months from the date of purchase. We are unable to extend this period, so please book with plenty of time. If a voucher is purchased as a gift, the validity begins from the purchase date, not the delivery date.",
      },
    ],
  },
];

/* ── Reveal helper ── */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: easeEditorial }}>
      {children}
    </motion.div>
  );
}

/* ── Main ── */
export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCat = categories.find((c) => c.id === activeCategory);

  // Filter by search
  const filteredItems = searchQuery.trim()
    ? categories.flatMap((c) =>
        c.items
          .filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((item) => ({ ...item, category: c.title })),
      )
    : null;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative flex h-[45vh] items-end overflow-hidden md:h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-fog via-ink to-ink" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-14 lg:px-8">
          <motion.p
            className="small-caps text-sm text-brass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeEditorial }}
          >
            Help & Information
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-5xl text-bone md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeEditorial }}
          >
            Frequently Asked Questions
          </motion.h1>

          {/* Search */}
          <motion.div
            className="mt-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: easeEditorial }}
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/25"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full border border-border bg-ink/50 py-3 pl-11 pr-4 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bone/30 hover:text-bone/60"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-section lg:px-8">
        {/* ── Search results ── */}
        {filteredItems ? (
          <div>
            <p className="mb-6 text-sm text-bone/40">
              {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-bone/40">No questions match your search.</p>
                <p className="mt-2 text-sm text-bone/25">
                  Try different keywords, or{" "}
                  <Link href="/contact" className="text-brass hover:underline">contact us</Link> directly.
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredItems.map((item) => (
                  <FaqItemRow
                    key={item.question}
                    item={item}
                    isOpen={openQuestion === item.question}
                    onToggle={() => setOpenQuestion(openQuestion === item.question ? null : item.question)}
                    badge={item.category}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Category view ── */
          <div className="grid gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="md:sticky md:top-24 md:self-start">
              <p className="mb-4 small-caps text-xs text-brass">Categories</p>
              <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenQuestion(null);
                      }}
                      className={`flex shrink-0 items-center gap-3 rounded-none px-4 py-3 text-left text-sm transition-all duration-300 md:w-full ${
                        isActive
                          ? "border border-border bg-fog text-bone"
                          : "border border-transparent text-bone/35 hover:text-bone/60"
                      }`}
                    >
                      <span className={isActive ? "text-brass" : "text-bone/20"}>
                        {cat.icon}
                      </span>
                      <div className="hidden md:block">
                        <p className={isActive ? "text-bone" : ""}>{cat.title}</p>
                        <p className="mt-0.5 text-xs text-bone/25">{cat.description}</p>
                      </div>
                      <span className="md:hidden">{cat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeEditorial }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-brass">{activeCat?.icon}</span>
                    <h2 className="font-display text-2xl text-bone">{activeCat?.title}</h2>
                  </div>

                  <div className="space-y-0">
                    {activeCat?.items.map((item, i) => (
                      <Reveal key={item.question} delay={i * 0.04}>
                        <FaqItemRow
                          item={item}
                          isOpen={openQuestion === item.question}
                          onToggle={() =>
                            setOpenQuestion(openQuestion === item.question ? null : item.question)
                          }
                        />
                      </Reveal>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* ── Quick links ── */}
      <div className="border-t border-border bg-fog">
        <div className="bg-noise relative">
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-8">
            <Reveal className="mb-8 text-center">
              <p className="small-caps text-sm text-brass">Still Have Questions?</p>
              <h2 className="mt-2 font-display text-2xl text-bone md:text-3xl">We&apos;re Here to Help</h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Email Us", desc: "hello@maison-noir.com", sub: "We respond within 24 hours", href: "/contact" },
                { title: "Call Us", desc: "+44 (0)20 7240 0012", sub: "Tue–Sun, 10:00–17:00", href: "/contact" },
                { title: "Visit", desc: "12 Floral Street, WC2E 9DH", sub: "Covent Garden, London", href: "/contact" },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <Link
                    href={item.href}
                    className="group block border border-border bg-fog p-6 transition-all duration-300 hover:border-brass/30"
                  >
                    <h3 className="font-display text-lg text-bone">{item.title}</h3>
                    <p className="mt-2 text-sm text-brass">{item.desc}</p>
                    <p className="mt-1 text-xs text-bone/30">{item.sub}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Item Row ── */
function FaqItemRow({
  item,
  isOpen,
  onToggle,
  badge,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string;
}) {
  return (
    <div className={`border-b border-border/50 transition-colors duration-300 ${isOpen ? "bg-fog/30" : ""}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-4 py-5 text-left md:px-6"
      >
        <motion.span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs text-brass transition-colors duration-300"
          animate={{
            borderColor: isOpen ? "rgba(138,106,59,0.5)" : "rgba(42,42,42,1)",
            backgroundColor: isOpen ? "rgba(138,106,59,0.1)" : "transparent",
          }}
        >
          <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            +
          </motion.span>
        </motion.span>

        <div className="flex-1">
          {badge && <span className="mb-1 block text-[10px] text-brass/50 small-caps">{badge}</span>}
          <span className="font-medium text-bone">{item.question}</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pl-14 md:px-6 md:pl-16">
              <p className="text-sm leading-relaxed text-bone/55">{item.answer}</p>
              {item.link && (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-brass transition-colors hover:text-bone"
                >
                  {item.link.label}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
