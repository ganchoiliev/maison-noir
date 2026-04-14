import type { Metadata } from "next";
import { GiftVouchersContent } from "@/components/gift/gift-vouchers-content";

export const metadata: Metadata = {
  title: "Gift Vouchers",
  description:
    "Give the gift of an unforgettable evening. Maison Noir dining vouchers available for any occasion.",
};

export default function GiftVouchersPage() {
  return <GiftVouchersContent />;
}
