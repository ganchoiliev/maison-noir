import type { Metadata } from "next";
import { FaqContent } from "@/components/faq/faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about dining at Maison Noir.",
};

export default function FaqPage() {
  return <FaqContent />;
}
