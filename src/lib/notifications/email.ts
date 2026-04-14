import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface ReservationDetails {
  confirmationCode: string;
  guestName: string;
  guestEmail: string;
  partySize: number;
  date: string;
  time: string;
  occasion?: string;
  dietary?: string;
  notes?: string;
  phone?: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateICS(details: ReservationDetails): string {
  const dateClean = details.date.replace(/-/g, "");
  const timeClean = details.time.replace(":", "") + "00";
  const dtStart = `${dateClean}T${timeClean}`;

  // End time = start + 3 hours
  const startHour = parseInt(details.time.split(":")[0] ?? "18", 10);
  const endHour = startHour + 3;
  const endTimeClean = `${String(endHour).padStart(2, "0")}${details.time.split(":")[1] ?? "00"}00`;
  const dtEnd = `${dateClean}T${endTimeClean}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maison Noir//Reservations//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Reservation: ${details.guestName} — Party of ${details.partySize}`,
    `DESCRIPTION:Guest: ${details.guestName}\\nParty: ${details.partySize}\\nEmail: ${details.guestEmail}${details.phone ? "\\nPhone: " + details.phone : ""}${details.occasion && details.occasion !== "No occasion" ? "\\nOccasion: " + details.occasion : ""}${details.dietary ? "\\nDietary: " + details.dietary : ""}${details.notes ? "\\nNotes: " + details.notes : ""}\\nCode: ${details.confirmationCode}`,
    "LOCATION:Maison Noir\\, 12 Floral Street\\, London WC2E 9DH",
    `ORGANIZER:mailto:${process.env.GMAIL_USER}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function sendOwnerNotification(details: ReservationDetails): Promise<void> {
  const icsContent = generateICS(details);

  try {
    await transporter.sendMail({
      from: `"Maison Noir Reservations" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Reservation: ${details.guestName} — ${formatDate(details.date)} at ${details.time}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1a1a1a; max-width: 500px;">
          <h2 style="color: #8a6a3b; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">New Reservation</h2>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <table style="font-size: 14px; line-height: 1.8;">
            <tr><td style="color: #888; padding-right: 16px;">Guest</td><td><strong>${details.guestName}</strong></td></tr>
            <tr><td style="color: #888; padding-right: 16px;">Party</td><td>${details.partySize} ${details.partySize === 1 ? "guest" : "guests"}</td></tr>
            <tr><td style="color: #888; padding-right: 16px;">Date</td><td>${formatDate(details.date)}</td></tr>
            <tr><td style="color: #888; padding-right: 16px;">Seating</td><td>${details.time}</td></tr>
            <tr><td style="color: #888; padding-right: 16px;">Email</td><td>${details.guestEmail}</td></tr>
            ${details.phone ? `<tr><td style="color: #888; padding-right: 16px;">Phone</td><td>${details.phone}</td></tr>` : ""}
            ${details.occasion && details.occasion !== "No occasion" ? `<tr><td style="color: #888; padding-right: 16px;">Occasion</td><td>${details.occasion}</td></tr>` : ""}
            ${details.dietary ? `<tr><td style="color: #888; padding-right: 16px;">Dietary</td><td>${details.dietary}</td></tr>` : ""}
            ${details.notes ? `<tr><td style="color: #888; padding-right: 16px;">Notes</td><td>${details.notes}</td></tr>` : ""}
            <tr><td style="color: #888; padding-right: 16px;">Code</td><td style="font-family: monospace; color: #8a6a3b;">${details.confirmationCode}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="font-size: 12px; color: #aaa;">Open the attached .ics file to add this reservation to your calendar.</p>
        </div>
      `,
      icalEvent: {
        filename: "reservation.ics",
        method: "REQUEST",
        content: icsContent,
      },
    });
    console.log("[Email] Owner notification sent");
  } catch (err) {
    console.error("[Email] Failed to send owner notification:", err);
  }
}

export async function sendGuestConfirmation(details: ReservationDetails): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Maison Noir" <${process.env.GMAIL_USER}>`,
      to: details.guestEmail,
      subject: `Your Reservation at Maison Noir — ${formatDate(details.date)}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1a1a1a; max-width: 500px;">
          <h1 style="font-size: 24px; font-weight: normal;">Maison Noir</h1>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8a6a3b;">Reservation Confirmation</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

          <p>Dear ${details.guestName.split(" ")[0]},</p>
          <p>Your reservation has been confirmed. We look forward to welcoming you.</p>

          <div style="background: #f8f6f2; padding: 20px; margin: 20px 0;">
            <table style="font-size: 14px; line-height: 2;">
              <tr><td style="color: #888; padding-right: 20px;">Date</td><td><strong>${formatDate(details.date)}</strong></td></tr>
              <tr><td style="color: #888; padding-right: 20px;">Seating</td><td><strong>${details.time}</strong></td></tr>
              <tr><td style="color: #888; padding-right: 20px;">Guests</td><td><strong>${details.partySize}</strong></td></tr>
              <tr><td style="color: #888; padding-right: 20px;">Confirmation</td><td style="font-family: monospace; color: #8a6a3b; font-size: 16px;"><strong>${details.confirmationCode}</strong></td></tr>
            </table>
          </div>

          <h3 style="font-size: 14px; color: #8a6a3b;">Before You Arrive</h3>
          <ul style="font-size: 13px; color: #555; line-height: 1.8;">
            <li>Please arrive 5 minutes before your seating time.</li>
            <li>The tasting menu is &pound;185 per guest. Wine pairing +&pound;95.</li>
            <li>Smart casual dress code.</li>
            <li>If your plans change, please give us 24 hours notice.</li>
          </ul>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <p style="font-size: 12px; color: #aaa;">
            Maison Noir &middot; 12 Floral Street, Covent Garden, London WC2E 9DH<br/>
            reservations@maison-noir.com &middot; +44 (0)20 7240 0012
          </p>
        </div>
      `,
    });
    console.log("[Email] Guest confirmation sent to", details.guestEmail);
  } catch (err) {
    console.error("[Email] Failed to send guest confirmation:", err);
  }
}
