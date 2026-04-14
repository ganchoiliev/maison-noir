import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-6 py-section lg:px-8">
        <h1 className="font-display text-3xl text-bone">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-bone/60">
          <p>
            Maison Noir is committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your personal information when you use our website or make a
            reservation.
          </p>
          <h2 className="font-display text-lg text-bone">Information We Collect</h2>
          <p>
            When you make a reservation, we collect your name, email address, and optionally your
            phone number. Email and phone data is stored as cryptographic hashes for verification.
            Plaintext email is retained for up to 30 days for operational purposes, then securely
            purged.
          </p>
          <h2 className="font-display text-lg text-bone">How We Use Your Information</h2>
          <p>
            Your information is used solely to confirm and manage your reservation, send service
            communications, and improve our guest experience. We do not sell or share your data with
            third parties.
          </p>
          <h2 className="font-display text-lg text-bone">Contact</h2>
          <p>
            For privacy enquiries, contact us at{" "}
            <span className="text-bone">privacy@maison-noir.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
