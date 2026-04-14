export interface Season {
  id: string;
  slug: string;
  name: string;
  starts_on: string;
  ends_on: string;
  is_active: boolean;
  hero_image: string | null;
  created_at: string;
  courses?: Course[];
}

export interface Course {
  id: string;
  season_id: string;
  position: number;
  name: string;
  description: string | null;
  allergens: string[];
  wine_pairing: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Reservation {
  id: string;
  confirmation_code: string;
  party_size: number;
  seating_at: string;
  guest_name: string;
  guest_email_hash: string;
  guest_phone_hash: string | null;
  guest_email_encrypted: string | null;
  notes: string | null;
  status: "confirmed" | "cancelled" | "completed" | "no_show";
  created_at: string;
}

export interface AvailabilityRule {
  id: string;
  weekday: number;
  seating_time: string;
  seats: number;
  is_closed: boolean;
}

export interface AvailabilityOverride {
  id: string;
  date: string;
  seating_time: string;
  seats_delta: number;
  note: string | null;
}

export type ReserveStep = "seats" | "time" | "details";
