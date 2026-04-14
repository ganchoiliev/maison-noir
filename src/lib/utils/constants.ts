export const SITE_NAME = "Maison Noir";
export const SITE_DESCRIPTION =
  "An edition of twelve courses, served nightly. Seasonal tasting menu in the heart of London.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maison-noir.com";

export const SEATINGS = ["18:00", "20:45"] as const;
export const MAX_SEATS_PER_SEATING = 14;
export const BOOKING_WINDOW_DAYS = 60;
export const CLOSED_DAY = 1; // Monday (0 = Sunday)
