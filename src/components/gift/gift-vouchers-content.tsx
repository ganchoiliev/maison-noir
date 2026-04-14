"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";

/* ── Types ── */
type Step = "browse" | "customize" | "details" | "payment" | "success";

interface Voucher {
  id: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
}

const vouchers: Voucher[] = [
  {
    id: "tasting",
    name: "The Tasting Menu",
    price: 185,
    description: "Twelve-course seasonal tasting menu for one guest.",
    includes: ["12-course tasting menu", "Mignardises & coffee", "Valid 12 months"],
  },
  {
    id: "wine",
    name: "With Wine Pairing",
    price: 280,
    description: "Twelve courses paired with a curated selection of wines by our sommelier.",
    includes: ["12-course tasting menu", "Full wine pairing", "Mignardises & coffee", "Valid 12 months"],
  },
  {
    id: "duo",
    name: "The Experience for Two",
    price: 560,
    description: "The complete Maison Noir evening for two guests — tasting menu with wine pairing.",
    includes: ["2× tasting menu", "2× wine pairing", "Mignardises & coffee", "Priority seating", "Valid 12 months"],
  },
  {
    id: "custom",
    name: "Custom Amount",
    price: 0,
    description: "Choose your own amount from £50 to £1,000. Redeemable against any experience.",
    includes: ["Flexible amount", "Any experience", "Valid 12 months"],
  },
];

/* ── Reveal helper ── */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: easeEditorial }}>
      {children}
    </motion.div>
  );
}

/* ── Step transition wrapper ── */
const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeEditorial } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

/* ── Main ── */
export function GiftVouchersContent() {
  const [step, setStep] = useState<Step>("browse");
  const [selected, setSelected] = useState<Voucher | null>(null);
  const [customAmount, setCustomAmount] = useState(100);
  const [quantity, setQuantity] = useState(1);

  // Recipient
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");

  // Buyer
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  const [processing, setProcessing] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");

  const effectivePrice = selected?.id === "custom" ? customAmount : (selected?.price ?? 0);
  const total = effectivePrice * quantity;

  const handleSelect = (v: Voucher) => {
    setSelected(v);
    setStep("customize");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePurchase = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const code = `MN-GV-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setVoucherCode(code);
    setStep("success");
    setProcessing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative flex h-[55vh] items-end overflow-hidden md:h-[60vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(40%) contrast(1.15) brightness(0.3) sepia(10%)" }}
        >
          <source src="/video/cocktail.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
        <div className="vignette" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-14 lg:px-8">
          <motion.p
            className="small-caps text-sm text-brass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeEditorial }}
          >
            The Perfect Gift
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-5xl text-bone md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeEditorial }}
          >
            Gift Vouchers
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-bone/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: easeEditorial }}
          >
            An unforgettable evening, beautifully delivered by email. Redeemable for any available
            seating within twelve months.
          </motion.p>
        </div>
      </div>

      {/* ── Step indicator ── */}
      {step !== "browse" && step !== "success" && (
        <div className="border-b border-border bg-fog/50">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-0 px-6 py-4">
            {(["customize", "details", "payment"] as Step[]).map((s, i) => {
              const steps: Step[] = ["customize", "details", "payment"];
              const currentIdx = steps.indexOf(step);
              const thisIdx = i;
              const isActive = step === s;
              const isDone = thisIdx < currentIdx;
              return (
                <div key={s} className="flex items-center">
                  {i > 0 && (
                    <div className={`mx-2 h-px w-8 md:w-12 ${isDone ? "bg-brass" : "bg-border"}`} />
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                        isActive
                          ? "border border-ember bg-ember text-bone"
                          : isDone
                            ? "border border-brass bg-brass/20 text-brass"
                            : "border border-border text-bone/25"
                      }`}
                    >
                      {isDone ? "✓" : i + 1}
                    </span>
                    <span
                      className={`hidden text-xs small-caps md:inline ${
                        isActive ? "text-bone" : isDone ? "text-brass" : "text-bone/25"
                      }`}
                    >
                      {s === "customize" ? "Select" : s === "details" ? "Details" : "Payment"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-6 py-section lg:px-8">
        <AnimatePresence mode="wait">
          {/* ════ STEP: BROWSE ════ */}
          {step === "browse" && (
            <motion.div key="browse" variants={stepVariants} initial="enter" animate="center" exit="exit">
              <Reveal className="mb-10 text-center">
                <h2 className="font-display text-3xl text-bone">Choose a Voucher</h2>
                <p className="mt-2 text-sm text-bone/50">Select the experience you&apos;d like to gift.</p>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-2">
                {vouchers.map((v, i) => (
                  <Reveal key={v.id} delay={i * 0.08}>
                    <div className="group flex h-full flex-col border border-border bg-fog p-7 transition-all duration-300 hover:border-brass/40">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-display text-xl text-bone">{v.name}</h3>
                        <span className="font-display text-xl text-ember">
                          {v.id === "custom" ? "£50+" : `£${v.price}`}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm text-bone/50">{v.description}</p>

                      <ul className="mt-4 space-y-1.5">
                        {v.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-bone/40">
                            <span className="h-px w-3 bg-brass/40" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleSelect(v)}
                        className="group/btn relative mt-6 w-full overflow-hidden border border-ember py-3 text-sm font-medium text-bone transition-all"
                      >
                        <span className="relative z-10">Select</span>
                        <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-400 group-hover/btn:translate-x-0" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Corporate */}
              <Reveal className="mt-16 border border-border bg-fog/50 p-8 text-center">
                <h3 className="font-display text-xl text-bone">Corporate &amp; Group Gifting</h3>
                <p className="mt-2 text-sm text-bone/50">
                  For orders of five or more, or bespoke packages, email{" "}
                  <span className="text-brass">gifts@maison-noir.com</span>.
                </p>
              </Reveal>

              {/* How it works */}
              <div className="mt-20">
                <Reveal className="mb-10 text-center">
                  <p className="small-caps text-sm text-brass">How It Works</p>
                  <h2 className="mt-2 font-display text-3xl text-bone">Three Simple Steps</h2>
                </Reveal>
                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    { num: "01", title: "Choose", desc: "Select a voucher or enter a custom amount." },
                    { num: "02", title: "Personalise", desc: "Add recipient details and a personal message." },
                    { num: "03", title: "Send", desc: "Your voucher is delivered instantly by email, beautifully formatted." },
                  ].map((s, i) => (
                    <Reveal key={s.num} delay={i * 0.1} className="text-center">
                      <p className="font-display text-4xl text-brass/15">{s.num}</p>
                      <h3 className="mt-2 font-display text-lg text-bone">{s.title}</h3>
                      <p className="mt-2 text-sm text-bone/45">{s.desc}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════ STEP: CUSTOMIZE ════ */}
          {step === "customize" && selected && (
            <motion.div key="customize" variants={stepVariants} initial="enter" animate="center" exit="exit" className="mx-auto max-w-2xl">
              <button onClick={() => setStep("browse")} className="mb-8 text-xs text-bone/30 transition-colors hover:text-bone/60">
                &larr; Back to vouchers
              </button>

              <div className="border border-border bg-fog p-8">
                <p className="small-caps text-xs text-brass">{selected.name}</p>
                <h2 className="mt-1 font-display text-2xl text-bone md:text-3xl">Customise Your Gift</h2>

                {/* Custom amount slider */}
                {selected.id === "custom" && (
                  <div className="mt-6">
                    <label className="mb-2 block text-sm text-bone/60">Amount: <span className="text-bone">£{customAmount}</span></label>
                    <input
                      type="range"
                      min={50}
                      max={1000}
                      step={10}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      className="w-full accent-ember"
                    />
                    <div className="mt-1 flex justify-between text-xs text-bone/20">
                      <span>£50</span>
                      <span>£1,000</span>
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-6">
                  <label className="mb-2 block text-sm text-bone/60">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center border border-border text-bone/60 transition-colors hover:border-bone/30"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-display text-xl text-bone">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="flex h-10 w-10 items-center justify-center border border-border text-bone/60 transition-colors hover:border-bone/30"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-bone/50">{selected.name} × {quantity}</span>
                    <span className="text-bone">£{effectivePrice} × {quantity}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3">
                    <span className="font-medium text-bone">Total</span>
                    <span className="font-display text-2xl text-ember">£{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setStep("details"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="mt-8 w-full border border-ember bg-ember py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover"
                >
                  Continue to Details
                </button>
              </div>
            </motion.div>
          )}

          {/* ════ STEP: DETAILS ════ */}
          {step === "details" && (
            <motion.div key="details" variants={stepVariants} initial="enter" animate="center" exit="exit" className="mx-auto max-w-2xl">
              <button onClick={() => setStep("customize")} className="mb-8 text-xs text-bone/30 transition-colors hover:text-bone/60">
                &larr; Back
              </button>

              <div className="space-y-8">
                {/* Recipient */}
                <div className="border border-border bg-fog p-8">
                  <h3 className="font-display text-xl text-bone">Recipient Details</h3>
                  <p className="mt-1 text-xs text-bone/40">Who is this gift for?</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-bone/60">Recipient&apos;s Name *</label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-bone/60">Recipient&apos;s Email *</label>
                      <input
                        type="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-bone/60">Personal Message</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Happy birthday! Enjoy an unforgettable evening..."
                        className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Buyer */}
                <div className="border border-border bg-fog p-8">
                  <h3 className="font-display text-xl text-bone">Your Details</h3>
                  <p className="mt-1 text-xs text-bone/40">So we can send you a receipt.</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-bone/60">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-bone/60">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/20 focus:border-brass focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setStep("payment"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={!recipientName || !recipientEmail || !buyerName || !buyerEmail}
                  className="w-full border border-ember bg-ember py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover disabled:opacity-40"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {/* ════ STEP: PAYMENT ════ */}
          {step === "payment" && selected && (
            <motion.div key="payment" variants={stepVariants} initial="enter" animate="center" exit="exit" className="mx-auto max-w-2xl">
              <button onClick={() => setStep("details")} className="mb-8 text-xs text-bone/30 transition-colors hover:text-bone/60">
                &larr; Back
              </button>

              <div className="border border-border bg-fog p-8">
                <h3 className="font-display text-xl text-bone">Order Summary</h3>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-bone/50">Voucher</span>
                    <span className="text-bone">{selected.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone/50">Value</span>
                    <span className="text-bone">£{effectivePrice} × {quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone/50">Recipient</span>
                    <span className="text-bone">{recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone/50">Delivery</span>
                    <span className="text-bone">{recipientEmail}</span>
                  </div>
                  {message && (
                    <div className="border-t border-border/50 pt-3">
                      <p className="text-xs text-bone/30">Message:</p>
                      <p className="mt-1 text-xs italic text-bone/50">&ldquo;{message}&rdquo;</p>
                    </div>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-bone">Total</span>
                      <span className="font-display text-2xl text-ember">£{total}</span>
                    </div>
                  </div>
                </div>

                {/* Mock payment */}
                <div className="mt-8 border border-border bg-ink/50 p-5">
                  <p className="text-xs text-bone/40">Payment</p>
                  <div className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="border border-border bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[10px] text-bone/15">
                    This is a demo. No real payment will be processed.
                  </p>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="mt-6 w-full border border-ember bg-ember py-4 text-sm font-medium tracking-wider text-bone transition-all hover:bg-ember-hover disabled:opacity-50"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
                      Processing...
                    </span>
                  ) : (
                    `Pay £${total}`
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ════ STEP: SUCCESS ════ */}
          {step === "success" && selected && (
            <motion.div key="success" variants={stepVariants} initial="enter" animate="center" exit="exit" className="mx-auto max-w-2xl text-center">
              {/* Success icon */}
              <motion.div
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-brass/30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg className="h-10 w-10 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </motion.div>

              <h2 className="font-display text-3xl text-bone md:text-4xl">Gift Sent!</h2>
              <p className="mt-3 text-bone/50">
                Your voucher has been delivered to <span className="text-bone">{recipientEmail}</span>.
              </p>

              {/* Voucher card preview */}
              <div className="mx-auto mt-10 max-w-md border border-brass/20 bg-fog p-8">
                <div className="border-b border-border/50 pb-4">
                  <p className="font-display text-sm text-brass">Maison Noir</p>
                  <p className="small-caps text-[10px] tracking-widest text-bone/30">Gift Voucher</p>
                </div>
                <div className="py-6">
                  <p className="font-display text-3xl text-bone">£{total}</p>
                  <p className="mt-1 text-sm text-bone/50">{selected.name}{quantity > 1 ? ` × ${quantity}` : ""}</p>
                </div>
                <div className="border-t border-border/50 pt-4 text-xs">
                  <p className="text-bone/40">For: <span className="text-bone">{recipientName}</span></p>
                  <p className="mt-1 text-bone/40">From: <span className="text-bone">{buyerName}</span></p>
                  {message && <p className="mt-2 italic text-bone/30">&ldquo;{message}&rdquo;</p>}
                </div>
                <div className="mt-6 border-t border-dashed border-border/50 pt-4">
                  <p className="text-[10px] text-bone/25">Voucher Code</p>
                  <p className="mt-1 font-mono text-lg tracking-widest text-brass">{voucherCode}</p>
                  <p className="mt-2 text-[10px] text-bone/20">Valid for 12 months from date of purchase</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={() => {
                    setStep("browse");
                    setSelected(null);
                    setRecipientName("");
                    setRecipientEmail("");
                    setMessage("");
                    setBuyerName("");
                    setBuyerEmail("");
                    setQuantity(1);
                    setCustomAmount(100);
                  }}
                  className="border border-border px-8 py-3 text-sm text-bone/60 transition-all hover:border-bone/30 hover:text-bone"
                >
                  Purchase Another
                </button>
                <Link
                  href="/"
                  className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
