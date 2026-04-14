import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio",
  description: "Admin dashboard for Maison Noir.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="px-6 text-center">
        <p className="small-caps text-sm text-brass">Admin</p>
        <h1 className="mt-2 font-display text-3xl text-bone">Studio</h1>
        <p className="mt-4 text-sm text-muted">
          Menu CMS and reservation management. Authentication required.
        </p>
        <p className="mt-2 text-xs text-muted/60">
          Magic link auth via Supabase — coming in a future phase.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-brass transition-colors hover:text-bone"
        >
          &larr; Back to site
        </Link>
      </div>
    </div>
  );
}
