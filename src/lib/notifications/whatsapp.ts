interface ReservationDetails {
  confirmationCode: string;
  guestName: string;
  partySize: number;
  date: string;
  time: string;
  occasion?: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export async function sendWhatsAppNotification(details: ReservationDetails): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.OWNER_WHATSAPP_TO;

  if (!sid || !token || !from || !to) {
    console.warn("[WhatsApp] Missing Twilio credentials, skipping");
    return;
  }

  const occasionLine =
    details.occasion && details.occasion !== "No occasion"
      ? `\n🎉 ${details.occasion}`
      : "";

  const message = [
    `🍽 *New Reservation*`,
    ``,
    `*${details.guestName}*`,
    `Party of ${details.partySize}`,
    `📅 ${formatDate(details.date)} at ${details.time}${occasionLine}`,
    ``,
    `Code: \`${details.confirmationCode}\``,
  ].join("\n");

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: from,
        To: to,
        Body: message,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[WhatsApp] Twilio error:", res.status, body);
    } else {
      console.log("[WhatsApp] Notification sent to owner");
    }
  } catch (err) {
    console.error("[WhatsApp] Failed to send:", err);
  }
}
