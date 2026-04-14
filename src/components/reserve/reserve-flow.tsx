"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { easeEditorial } from "@/lib/utils/motion";
import type { ReserveStep } from "@/types";
import { SEATINGS, MAX_SEATS_PER_SEATING } from "@/lib/utils/constants";

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeEditorial } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
};

export function ReserveFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = (searchParams.get("step") as ReserveStep) || "seats";

  const [step, setStep] = useState<ReserveStep>(initialStep);
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState("");

  const goTo = (s: ReserveStep) => {
    setStep(s);
    router.replace(`/reserve?step=${s}`, { scroll: false });
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);

    // Mock submission — Edge Function would handle this in production
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const code = `MN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setConfirmation(code);
    setSubmitting(false);
  };

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brass/30">
          <svg className="h-8 w-8 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-3xl text-bone">Confirmed</h2>
        <p className="mt-2 text-muted">Your reservation code:</p>
        <p className="mt-1 font-mono text-lg text-brass">{confirmation}</p>
        <div className="mt-6 space-y-1 text-sm text-muted">
          <p>{name} · Party of {partySize}</p>
          <p>{selectedDate} · {selectedTime}</p>
        </div>
        <p className="mt-6 text-xs text-muted">
          A confirmation email will be sent shortly. (Email integration coming soon.)
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Step indicators */}
      <div className="mb-10 flex justify-center gap-8">
        {(["seats", "time", "details"] as ReserveStep[]).map((s, i) => (
          <button
            key={s}
            onClick={() => {
              if (s === "seats") goTo(s);
              if (s === "time" && partySize > 0) goTo(s);
              if (s === "details" && selectedDate && selectedTime) goTo(s);
            }}
            className={`small-caps text-sm transition-colors ${
              step === s ? "text-bone" : "text-muted"
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-center text-sm text-ember">{error}</p>}

      <AnimatePresence mode="wait">
        {step === "seats" && (
          <motion.div key="seats" variants={stepVariants} initial="enter" animate="center" exit="exit">
            <h2 className="mb-6 text-center font-display text-2xl text-bone">How many guests?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from({ length: MAX_SEATS_PER_SEATING }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPartySize(n)}
                  className={`flex h-12 w-12 items-center justify-center rounded-none border text-sm transition-colors ${
                    partySize === n
                      ? "border-ember bg-ember text-bone"
                      : "border-border text-muted hover:border-bone hover:text-bone"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => goTo("time")}
                className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-colors hover:bg-ember-hover"
              >
                Next: Choose a Time
              </button>
            </div>
          </motion.div>
        )}

        {step === "time" && (
          <motion.div key="time" variants={stepVariants} initial="enter" animate="center" exit="exit">
            <h2 className="mb-6 text-center font-display text-2xl text-bone">Select date &amp; time</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-muted">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-none border border-border bg-fog px-4 py-3 text-bone focus:border-brass focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted">Seating</label>
                <div className="flex gap-3">
                  {SEATINGS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`flex-1 border py-3 text-sm transition-colors ${
                        selectedTime === time
                          ? "border-ember bg-ember text-bone"
                          : "border-border text-muted hover:border-bone hover:text-bone"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => goTo("seats")} className="text-sm text-muted hover:text-bone">
                &larr; Back
              </button>
              <button
                onClick={() => goTo("details")}
                disabled={!selectedDate || !selectedTime}
                className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-colors hover:bg-ember-hover disabled:opacity-40"
              >
                Next: Your Details
              </button>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div key="details" variants={stepVariants} initial="enter" animate="center" exit="exit">
            <h2 className="mb-6 text-center font-display text-2xl text-bone">Your details</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-none border border-border bg-fog px-4 py-3 text-bone placeholder:text-muted/50 focus:border-brass focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-none border border-border bg-fog px-4 py-3 text-bone placeholder:text-muted/50 focus:border-brass focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-none border border-border bg-fog px-4 py-3 text-bone placeholder:text-muted/50 focus:border-brass focus:outline-none"
              />
              <textarea
                placeholder="Any dietary requirements or notes?"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-none border border-border bg-fog px-4 py-3 text-bone placeholder:text-muted/50 focus:border-brass focus:outline-none"
              />
            </div>
            <div className="mt-4 rounded-none border border-border bg-ink/50 p-4 text-sm text-muted">
              <p>
                Party of {partySize} · {selectedDate} · {selectedTime}
              </p>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => goTo("time")} className="text-sm text-muted hover:text-bone">
                &larr; Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name || !email || submitting}
                className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-colors hover:bg-ember-hover disabled:opacity-40"
              >
                {submitting ? "Confirming..." : "Confirm Reservation"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
