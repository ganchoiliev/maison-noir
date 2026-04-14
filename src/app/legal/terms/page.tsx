import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-6 py-section lg:px-8">
        <h1 className="font-display text-3xl text-bone">Terms &amp; Conditions</h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-bone/60">
          <h2 className="font-display text-lg text-bone">Reservations</h2>
          <p>
            Reservations are confirmed upon receipt of a confirmation code. We kindly ask for 24
            hours notice for cancellations. No-shows or late cancellations may be subject to a
            charge.
          </p>
          <h2 className="font-display text-lg text-bone">Dietary Requirements</h2>
          <p>
            Please inform us of any allergies or dietary requirements at the time of booking. While
            we take every precaution, we cannot guarantee a completely allergen-free environment.
          </p>
          <h2 className="font-display text-lg text-bone">Dress Code</h2>
          <p>Smart casual. We want you to feel comfortable, but we respectfully reserve the right to
            refuse entry to guests whose attire does not meet the standard of the dining room.
          </p>
        </div>
      </div>
    </div>
  );
}
