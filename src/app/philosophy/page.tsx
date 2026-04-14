import type { Metadata } from "next";
import { PhilosophyContent } from "@/components/philosophy/philosophy-content";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "The principles behind Maison Noir — seasonality, provenance, and restraint.",
};

export default function PhilosophyPage() {
  return <PhilosophyContent />;
}
