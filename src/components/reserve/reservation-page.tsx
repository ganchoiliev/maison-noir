"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";
import { createReservation, checkDateAvailability } from "@/app/reserve/actions";
import type { AvailabilityResult } from "@/lib/supabase/availability";

/* ── Types ── */
type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { num: 1 as Step, label: "Guests", icon: "👤" },
  { num: 2 as Step, label: "Date & Time", icon: "📅" },
  { num: 3 as Step, label: "Details", icon: "✍️" },
  { num: 4 as Step, label: "Review", icon: "✓" },
];

const OCCASIONS = [
  "No occasion",
  "Birthday",
  "Anniversary",
  "Date night",
  "Business dinner",
  "Celebration",
  "Proposal",
  "Other",
];

const stepVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeEditorial } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.25 } },
};

/* ── Helpers ── */
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function getDayName(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long" });
}

function isMonday(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr + "T12:00:00").getDay() === 1;
}

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0] ?? "";
}

function getMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split("T")[0] ?? "";
}

/* ── Main ── */
export function ReservationPage() {
  const [step, setStep] = useState<Step>(1);
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("No occasion");
  const [dietary, setDietary] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [availability, setAvailability] = useState<Record<string, AvailabilityResult> | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dateWarning = useMemo(() => {
    if (!selectedDate) return null;
    if (isMonday(selectedDate)) return "We are closed on Mondays. Please choose another date.";
    return null;
  }, [selectedDate]);

  // Fetch real availability when date changes
  useEffect(() => {
    if (!selectedDate || isMonday(selectedDate)) {
      // Use a microtask to avoid synchronous setState in effect
      queueMicrotask(() => setAvailability(null));
      return;
    }
    queueMicrotask(() => setLoadingAvailability(true));
    checkDateAvailability(selectedDate)
      .then((data) => setAvailability(data))
      .catch(() => setAvailability(null))
      .finally(() => setLoadingAvailability(false));
  }, [selectedDate]);

  const canGoStep2 = partySize > 0;
  const canGoStep3 = selectedDate && selectedTime && !dateWarning;
  const canGoStep4 = firstName && email;

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setSubmitError("");

    const result = await createReservation({
      partySize,
      date: selectedDate,
      time: selectedTime as "18:00" | "20:45",
      firstName,
      lastName,
      email,
      phone,
      occasion,
      dietary,
      notes,
    });

    if ("error" in result) {
      setSubmitError(result.error);
      setSubmitting(false);
      return;
    }

    setConfirmCode(result.confirmationCode);
    setConfirmed(true);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative flex h-[50vh] items-end overflow-hidden md:h-[55vh]">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(50%) contrast(1.15) brightness(0.25) sepia(10%)" }}
        >
          <source src="/video/restaurant.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="vignette" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-14 lg:px-8">
          <motion.p className="small-caps text-sm text-brass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: easeEditorial }}>
            Reservations
          </motion.p>
          <motion.h1 className="mt-2 font-display text-5xl text-bone md:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: easeEditorial }}>
            Reserve a Seat
          </motion.h1>
          <motion.div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-bone/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span>Tue – Sun</span>
            <span className="text-brass/40">·</span>
            <span>18:00 &amp; 20:45</span>
            <span className="text-brass/40">·</span>
            <span>14 seats</span>
            <span className="text-brass/40">·</span>
            <span>60-day window</span>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-5xl px-6 py-section lg:px-8">
        {confirmed ? (
          <ConfirmationScreen code={confirmCode} name={`${firstName} ${lastName}`.trim()} email={email} partySize={partySize} date={selectedDate} time={selectedTime} occasion={occasion} />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Left — Form */}
            <div>
              {/* Step bar */}
              <div className="mb-10 flex items-center">
                {STEPS.map((s, i) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <div key={s.num} className="flex flex-1 items-center">
                      <button
                        onClick={() => {
                          if (s.num === 1) goTo(1);
                          if (s.num === 2 && canGoStep2) goTo(2);
                          if (s.num === 3 && canGoStep3) goTo(3);
                          if (s.num === 4 && canGoStep4) goTo(4);
                        }}
                        className="flex items-center gap-2"
                      >
                        <span className={`flex h-8 w-8 items-center justify-center text-xs font-medium transition-all duration-500 ${
                          isActive ? "border-2 border-ember bg-ember text-bone" : isDone ? "border border-brass bg-brass/15 text-brass" : "border border-border text-bone/20"
                        }`}>
                          {isDone ? "✓" : s.num}
                        </span>
                        <span className={`hidden text-xs small-caps md:block ${isActive ? "text-bone" : isDone ? "text-brass/70" : "text-bone/20"}`}>
                          {s.label}
                        </span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <div className={`mx-2 h-px flex-1 transition-colors duration-500 ${isDone ? "bg-brass/40" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Steps */}
              <AnimatePresence mode="wait">
                {/* ═══ STEP 1: GUESTS ═══ */}
                {step === 1 && (
                  <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <h2 className="font-display text-2xl text-bone md:text-3xl">How many guests?</h2>
                    <p className="mt-2 text-sm text-bone/40">Select your party size. For groups larger than 4, consider our private dining.</p>

                    <div className="mt-8 grid grid-cols-4 gap-3 md:grid-cols-7">
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setPartySize(n)}
                          className={`group relative flex h-16 flex-col items-center justify-center border transition-all duration-300 ${
                            partySize === n
                              ? "border-ember bg-ember text-bone shadow-[0_0_25px_rgba(184,68,44,0.2)]"
                              : "border-border text-bone/40 hover:border-bone/30 hover:text-bone"
                          }`}
                        >
                          <span className="font-display text-xl">{n}</span>
                          <span className="text-[9px] text-bone/30">{n === 1 ? "guest" : "guests"}</span>
                        </button>
                      ))}
                    </div>

                    {partySize > 4 && (
                      <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-xs text-brass/70">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                        For parties of 5+, we recommend exclusive hire. <Link href="/private-dining" className="underline hover:text-bone">Learn more</Link>
                      </motion.p>
                    )}

                    <div className="mt-10">
                      <button onClick={() => goTo(2)} className="group relative w-full overflow-hidden border border-ember py-4 text-sm font-medium tracking-wider text-bone small-caps">
                        <span className="relative z-10">Continue — Choose Date &amp; Time</span>
                        <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ═══ STEP 2: DATE & TIME ═══ */}
                {step === 2 && (
                  <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <h2 className="font-display text-2xl text-bone md:text-3xl">Choose your evening</h2>
                    <p className="mt-2 text-sm text-bone/40">Select a date and seating time. We are closed on Mondays.</p>

                    <div className="mt-8 space-y-6">
                      <div>
                        <label className="mb-2 block text-sm text-bone/60">Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }}
                          min={getMinDate()}
                          max={getMaxDate()}
                          className="w-full border border-border bg-fog px-4 py-4 text-bone focus:border-brass focus:outline-none [color-scheme:dark]"
                        />
                        {selectedDate && !dateWarning && (
                          <p className="mt-2 text-xs text-bone/30">{formatDate(selectedDate)}</p>
                        )}
                        {dateWarning && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-ember">{dateWarning}</motion.p>
                        )}
                      </div>

                      {selectedDate && !dateWarning && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: easeEditorial }}>
                          <label className="mb-2 block text-sm text-bone/60">Seating</label>
                          {loadingAvailability ? (
                            <div className="flex justify-center py-8">
                              <span className="h-5 w-5 animate-spin rounded-full border-2 border-bone/10 border-t-brass" />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              {([
                                { time: "18:00" as const, label: "First Seating", desc: "Relaxed pace, ideal for celebrations" },
                                { time: "20:45" as const, label: "Second Seating", desc: "The later service, more intimate" },
                              ]).map((s) => {
                                const avail = availability?.[s.time];
                                const remaining = avail?.remainingSeats ?? 14;
                                const isFull = remaining < partySize;
                                const isClosed = avail?.isClosed ?? false;

                                return (
                                  <button
                                    key={s.time}
                                    onClick={() => !isFull && !isClosed && setSelectedTime(s.time)}
                                    disabled={isFull || isClosed}
                                    className={`group border p-5 text-left transition-all duration-300 ${
                                      isFull || isClosed
                                        ? "border-border/50 opacity-50 cursor-not-allowed"
                                        : selectedTime === s.time
                                          ? "border-ember bg-ember/5 shadow-[0_0_20px_rgba(184,68,44,0.1)]"
                                          : "border-border hover:border-bone/30"
                                    }`}
                                  >
                                    <p className="font-display text-2xl text-bone">{s.time}</p>
                                    <p className="mt-1 text-xs text-bone/60">{s.label}</p>
                                    <p className="mt-0.5 text-[10px] text-bone/30">{s.desc}</p>
                                    <div className="mt-3 flex items-center gap-1.5">
                                      {isFull ? (
                                        <>
                                          <span className="h-1.5 w-1.5 rounded-full bg-ember/60" />
                                          <span className="text-[10px] text-ember/70">Fully booked</span>
                                        </>
                                      ) : (
                                        <>
                                          <span className={`h-1.5 w-1.5 rounded-full ${remaining <= 4 ? "bg-amber-500/60" : "bg-green-500/60"}`} />
                                          <span className="text-[10px] text-bone/30">
                                            {remaining} {remaining === 1 ? "seat" : "seats"} remaining
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <button onClick={() => goTo(1)} className="text-sm text-bone/30 transition-colors hover:text-bone/60">&larr; Back</button>
                      <button
                        onClick={() => goTo(3)}
                        disabled={!canGoStep3}
                        className="group relative overflow-hidden border border-ember px-10 py-4 text-sm font-medium tracking-wider text-bone transition-all disabled:opacity-30 small-caps"
                      >
                        <span className="relative z-10">Continue — Your Details</span>
                        <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ═══ STEP 3: DETAILS ═══ */}
                {step === 3 && (
                  <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <h2 className="font-display text-2xl text-bone md:text-3xl">Your details</h2>
                    <p className="mt-2 text-sm text-bone/40">So we can confirm your reservation and welcome you by name.</p>

                    <div className="mt-8 space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm text-bone/60">First Name *</label>
                          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Daniel" className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm text-bone/60">Last Name</label>
                          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Moreau" className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Email *</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 900000" className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Occasion</label>
                        <div className="flex flex-wrap gap-2">
                          {OCCASIONS.map((o) => (
                            <button key={o} type="button" onClick={() => setOccasion(o)}
                              className={`border px-3 py-1.5 text-xs transition-all duration-300 ${occasion === o ? "border-brass bg-brass/10 text-brass" : "border-border text-bone/25 hover:border-bone/20 hover:text-bone/50"}`}>
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Dietary Requirements</label>
                        <input type="text" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="Vegetarian, gluten-free, nut allergy..." className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm text-bone/60">Additional Notes</label>
                        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know?" className="w-full resize-none border border-border bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-bone/15 focus:border-brass focus:outline-none" />
                      </div>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <button onClick={() => goTo(2)} className="text-sm text-bone/30 transition-colors hover:text-bone/60">&larr; Back</button>
                      <button onClick={() => goTo(4)} disabled={!canGoStep4}
                        className="group relative overflow-hidden border border-ember px-10 py-4 text-sm font-medium tracking-wider text-bone transition-all disabled:opacity-30 small-caps">
                        <span className="relative z-10">Review Booking</span>
                        <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ═══ STEP 4: REVIEW ═══ */}
                {step === 4 && (
                  <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit">
                    <h2 className="font-display text-2xl text-bone md:text-3xl">Review your reservation</h2>
                    <p className="mt-2 text-sm text-bone/40">Please check the details below before confirming.</p>

                    <div className="mt-8 border border-border bg-fog p-6 md:p-8">
                      <div className="grid gap-6 md:grid-cols-2">
                        <ReviewRow label="Date" value={formatDate(selectedDate)} onEdit={() => goTo(2)} />
                        <ReviewRow label="Seating" value={selectedTime} onEdit={() => goTo(2)} />
                        <ReviewRow label="Guests" value={`${partySize} ${partySize === 1 ? "guest" : "guests"}`} onEdit={() => goTo(1)} />
                        <ReviewRow label="Name" value={`${firstName} ${lastName}`.trim()} onEdit={() => goTo(3)} />
                        <ReviewRow label="Email" value={email} onEdit={() => goTo(3)} />
                        {phone && <ReviewRow label="Phone" value={phone} onEdit={() => goTo(3)} />}
                        {occasion !== "No occasion" && <ReviewRow label="Occasion" value={occasion} onEdit={() => goTo(3)} />}
                        {dietary && <ReviewRow label="Dietary" value={dietary} onEdit={() => goTo(3)} />}
                      </div>
                      {notes && (
                        <div className="mt-4 border-t border-border/50 pt-4">
                          <p className="text-xs text-bone/30">Notes</p>
                          <p className="mt-1 text-sm text-bone/50 italic">{notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {submitError && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border border-ember/30 bg-ember/5 p-4 text-center text-sm text-ember">
                        {submitError}
                      </motion.div>
                    )}

                    {/* Policies */}
                    <div className="mt-6 space-y-2 text-xs text-bone/25">
                      <p>• Cancellations require 24 hours notice. Late cancellations may incur £85 per guest.</p>
                      <p>• Please arrive 5 minutes before your seating time.</p>
                      <p>• The tasting menu is £185 per guest. Wine pairing +£95.</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button onClick={() => goTo(3)} className="text-sm text-bone/30 transition-colors hover:text-bone/60">&larr; Back</button>
                      <button onClick={handleConfirm} disabled={submitting}
                        className="group relative overflow-hidden border-2 border-ember px-12 py-4 text-sm font-medium tracking-wider text-bone transition-all disabled:opacity-50 small-caps">
                        <span className="relative z-10">
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
                              Confirming...
                            </span>
                          ) : "Confirm Reservation"}
                        </span>
                        <span className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 group-hover:translate-x-0" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Booking summary */}
                <div className="border border-border bg-fog p-6">
                  <p className="small-caps text-xs text-brass">Your Booking</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <SidebarRow icon="👤" label="Guests" value={`${partySize}`} />
                    <SidebarRow icon="📅" label="Date" value={selectedDate ? getDayName(selectedDate) + ", " + selectedDate.split("-").reverse().join("/") : "—"} />
                    <SidebarRow icon="🕖" label="Time" value={selectedTime || "—"} />
                    {firstName && <SidebarRow icon="✍️" label="Name" value={`${firstName} ${lastName}`.trim()} />}
                  </div>
                </div>

                {/* Info */}
                <div className="border border-border/50 bg-fog/50 p-6 text-xs text-bone/30 space-y-3">
                  <p className="small-caps text-brass/50">Good to Know</p>
                  <p>Two seatings nightly: 18:00 and 20:45. Service lasts approximately 3 hours.</p>
                  <p>12-course tasting menu at £185pp. Wine pairing +£95.</p>
                  <p>Smart casual dress code.</p>
                  <p>24-hour cancellation policy.</p>
                </div>

                {/* Help */}
                <div className="text-center text-xs text-bone/20">
                  <p>Need help?</p>
                  <p className="mt-1 text-bone/35">reservations@maison-noir.com</p>
                  <p className="text-bone/35">+44 (0)20 7240 0012</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div>
        <p className="text-xs text-bone/30">{label}</p>
        <p className="mt-0.5 text-sm text-bone">{value}</p>
      </div>
      <button onClick={onEdit} className="shrink-0 text-[10px] text-brass/50 transition-colors hover:text-brass">Edit</button>
    </div>
  );
}

function SidebarRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs">{icon}</span>
      <div className="flex-1">
        <p className="text-[10px] text-bone/25">{label}</p>
        <p className="text-xs text-bone/70">{value}</p>
      </div>
    </div>
  );
}

/* ── Confirmation Screen ── */
function ConfirmationScreen({ code, name, email, partySize, date, time, occasion }: {
  code: string; name: string; email: string; partySize: number; date: string; time: string; occasion: string;
}) {
  return (
    <motion.div className="mx-auto max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: easeEditorial }}>
      {/* Success icon */}
      <motion.div className="mb-8 text-center" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brass/30">
          <svg className="h-10 w-10 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      </motion.div>

      <div className="text-center">
        <h2 className="font-display text-3xl text-bone md:text-4xl">You&apos;re Booked</h2>
        <p className="mt-2 text-bone/50">We look forward to welcoming you, {name.split(" ")[0]}.</p>
      </div>

      {/* Reservation card */}
      <motion.div className="mx-auto mt-10 max-w-md border border-brass/20 bg-fog" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, ease: easeEditorial }}>
        {/* Header */}
        <div className="border-b border-border/50 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm text-brass">Maison Noir</p>
              <p className="small-caps text-[10px] tracking-widest text-bone/25">Reservation Confirmation</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-brass">{code}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 px-8 py-6">
          <div>
            <p className="text-[10px] text-bone/25">Guest</p>
            <p className="mt-0.5 text-sm text-bone">{name}</p>
          </div>
          <div>
            <p className="text-[10px] text-bone/25">Party Size</p>
            <p className="mt-0.5 text-sm text-bone">{partySize} {partySize === 1 ? "guest" : "guests"}</p>
          </div>
          <div>
            <p className="text-[10px] text-bone/25">Date</p>
            <p className="mt-0.5 text-sm text-bone">{formatDate(date)}</p>
          </div>
          <div>
            <p className="text-[10px] text-bone/25">Seating</p>
            <p className="mt-0.5 text-sm text-bone">{time}</p>
          </div>
          {occasion !== "No occasion" && (
            <div className="col-span-2">
              <p className="text-[10px] text-bone/25">Occasion</p>
              <p className="mt-0.5 text-sm text-bone">{occasion}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-dashed border-border/50 px-8 py-5 text-center">
          <p className="text-[10px] text-bone/20">A confirmation has been sent to</p>
          <p className="mt-0.5 text-xs text-brass">{email}</p>
          <p className="mt-3 text-[10px] text-bone/15">Please arrive 5 minutes before your seating.</p>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link href="/" className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover">
          Back to Home
        </Link>
        <Link href="/menu" className="border border-border px-8 py-3 text-sm text-bone/60 transition-all hover:border-bone/30 hover:text-bone">
          View the Menu
        </Link>
      </div>
    </motion.div>
  );
}
