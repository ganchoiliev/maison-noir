import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Maison Noir in Covent Garden, London. Hours, address, and how to reach us.",
};

export default function ContactPage() {
  return <ContactContent />;
}
