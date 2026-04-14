import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Dining",
  description: "Host a private dining experience at Maison Noir. Coming soon.",
};

export default function PrivateDiningPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="px-6 text-center">
        <p className="small-caps text-sm text-brass">Coming Soon</p>
        <h1 className="mt-2 font-display text-4xl text-bone md:text-5xl">Private Dining</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          We are preparing an exclusive private dining experience. Please check back soon or contact
          us at <span className="text-bone">events@maison-noir.com</span>.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block border border-border px-6 py-3 text-sm text-muted transition-colors hover:border-bone hover:text-bone"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
