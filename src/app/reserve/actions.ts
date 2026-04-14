"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import crypto from "crypto";
import { getAvailability, type AvailabilityResult } from "@/lib/supabase/availability";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/notifications/email";
import { sendWhatsAppNotification } from "@/lib/notifications/whatsapp";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const reservationSchema = z.object({
  partySize: z.number().min(1).max(14),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(["18:00", "20:45"]),
  firstName: z.string().min(1),
  lastName: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  occasion: z.string().optional().default("No occasion"),
  dietary: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export async function createReservation(
  input: ReservationInput,
): Promise<{ confirmationCode: string } | { error: string }> {
  // 1. Validate input
  const parsed = reservationSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid reservation details. Please check your information." };
  }
  const data = parsed.data;

  // 2. Check Monday
  const dayOfWeek = new Date(data.date + "T12:00:00").getDay();
  if (dayOfWeek === 1) {
    return { error: "We are closed on Mondays. Please choose another date." };
  }

  // 3. Check availability
  const availability = await getAvailability(data.date, data.time);
  if (availability.isClosed) {
    return { error: "This seating is not available on the selected date." };
  }
  if (availability.remainingSeats < data.partySize) {
    return {
      error:
        availability.remainingSeats === 0
          ? "This seating is fully booked. Please try another date or time."
          : `Only ${availability.remainingSeats} seats remaining for this seating. Your party of ${data.partySize} cannot be accommodated.`,
    };
  }

  // 4. Generate confirmation code
  const confirmationCode = `MN-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

  // 5. Build guest name and seating timestamp
  const guestName = `${data.firstName} ${data.lastName}`.trim();
  const seatingAt = `${data.date}T${data.time}:00+00:00`;

  // 6. Hash email for the hash column
  const emailHash = crypto.createHash("sha256").update(data.email.toLowerCase()).digest("hex");
  const phoneHash = data.phone
    ? crypto.createHash("sha256").update(data.phone).digest("hex")
    : null;

  // 7. Insert into Supabase
  const supabase = getServiceClient();
  const { error: insertError } = await supabase.from("reservations").insert({
    confirmation_code: confirmationCode,
    party_size: data.partySize,
    seating_at: seatingAt,
    guest_name: guestName,
    guest_email_hash: emailHash,
    guest_phone_hash: phoneHash,
    guest_email: data.email,
    guest_phone: data.phone || null,
    occasion: data.occasion !== "No occasion" ? data.occasion : null,
    dietary: data.dietary || null,
    notes: data.notes || null,
    status: "confirmed",
  });

  if (insertError) {
    console.error("[Reservation] Insert error:", insertError);
    return { error: "Failed to create reservation. Please try again." };
  }

  // 8. Fire notifications (non-blocking)
  const notificationDetails = {
    confirmationCode,
    guestName,
    guestEmail: data.email,
    partySize: data.partySize,
    date: data.date,
    time: data.time,
    occasion: data.occasion,
    dietary: data.dietary,
    notes: data.notes,
    phone: data.phone,
  };

  // Don't await — fire and forget so the user gets instant response
  Promise.all([
    sendOwnerNotification(notificationDetails),
    sendGuestConfirmation(notificationDetails),
    sendWhatsAppNotification(notificationDetails),
  ]).catch((err) => console.error("[Notifications] Error:", err));

  return { confirmationCode };
}

// Action to check availability (called from client)
export async function checkAvailability(
  date: string,
  time: string,
): Promise<AvailabilityResult> {
  return getAvailability(date, time);
}

export async function checkDateAvailability(
  date: string,
): Promise<Record<string, AvailabilityResult>> {
  const results: Record<string, AvailabilityResult> = {};
  for (const time of ["18:00", "20:45"]) {
    results[time] = await getAvailability(date, time);
  }
  return results;
}
