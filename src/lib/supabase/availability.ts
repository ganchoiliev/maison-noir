import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export interface AvailabilityResult {
  totalSeats: number;
  bookedSeats: number;
  remainingSeats: number;
  isClosed: boolean;
}

export async function getAvailability(
  date: string,
  time: string,
): Promise<AvailabilityResult> {
  const supabase = getServiceClient();

  // Get weekday (0=Sun, 1=Mon, ... 6=Sat)
  const weekday = new Date(date + "T12:00:00").getDay();

  // 1. Check availability rules for this weekday + time
  const { data: rule } = await supabase
    .from("availability_rules")
    .select("seats, is_closed")
    .eq("weekday", weekday)
    .eq("seating_time", time)
    .single();

  if (!rule || rule.is_closed) {
    return { totalSeats: 0, bookedSeats: 0, remainingSeats: 0, isClosed: true };
  }

  let totalSeats = rule.seats;

  // 2. Check overrides for this specific date + time
  const { data: override } = await supabase
    .from("availability_overrides")
    .select("seats_delta")
    .eq("date", date)
    .eq("seating_time", time)
    .single();

  if (override) {
    totalSeats += override.seats_delta;
  }

  // 3. Count booked seats for this date + time
  const seatingStart = `${date}T${time}:00+00:00`;
  const seatingEnd = `${date}T${time}:59+00:00`;

  const { data: reservations } = await supabase
    .from("reservations")
    .select("party_size")
    .eq("status", "confirmed")
    .gte("seating_at", seatingStart)
    .lte("seating_at", seatingEnd);

  const bookedSeats = (reservations ?? []).reduce(
    (sum, r) => sum + (r.party_size as number),
    0,
  );

  return {
    totalSeats,
    bookedSeats,
    remainingSeats: Math.max(0, totalSeats - bookedSeats),
    isClosed: false,
  };
}

export async function getDateAvailability(
  date: string,
): Promise<Record<string, AvailabilityResult>> {
  const results: Record<string, AvailabilityResult> = {};
  for (const time of ["18:00", "20:45"]) {
    results[time] = await getAvailability(date, time);
  }
  return results;
}
