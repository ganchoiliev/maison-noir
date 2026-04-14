import type { Metadata } from "next";
import { PressList } from "@/components/press/press-list";

export const metadata: Metadata = {
  title: "Press",
  description: "Awards, recognition, and press coverage for Maison Noir.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-4xl px-6 py-section lg:px-8">
        <header className="mb-16 text-center">
          <p className="small-caps text-sm text-brass">Recognition</p>
          <h1 className="mt-2 font-display text-4xl text-bone md:text-5xl">Press</h1>
        </header>

        <PressList />
      </div>
    </div>
  );
}
