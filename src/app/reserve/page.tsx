import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationPage } from "@/components/reserve/reservation-page";

export const metadata: Metadata = {
  title: "Reserve",
  description: "Book your table at Maison Noir. Two seatings nightly, up to 60 days in advance.",
};

export default function ReservePage() {
  return (
    <Suspense>
      <ReservationPage />
    </Suspense>
  );
}
