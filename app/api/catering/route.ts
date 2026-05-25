import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CateringPayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guestCount?: string;
  eventType?: string;
  details?: string;
  // honeypot
  company?: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: CateringPayload;

  try {
    body = (await request.json()) as CateringPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot — silent reject for bots.
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const eventDate = (body.eventDate ?? "").trim();
  const guestCount = (body.guestCount ?? "").trim();
  const eventType = (body.eventType ?? "").trim();
  const details = (body.details ?? "").trim();

  if (!name || !email || !phone || !eventDate || !guestCount) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // ============================================================
  // 🟡 STANDING FLAG — Resend email delivery is INTENTIONALLY
  // commented out. Do not enable until BOTH of the following are
  // confirmed by the owner:
  //   1. Recipient email address (Kevin's preferred catering inbox)
  //   2. RESEND_API_KEY set in Vercel environment variables
  //
  // To enable later:
  //   - npm install resend
  //   - import { Resend } from "resend";
  //   - const resend = new Resend(process.env.RESEND_API_KEY);
  //   - await resend.emails.send({ from, to, subject, html });
  // ============================================================
  /*
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Cafe 88 Catering <catering@wecafe88.com>",
      to: ["OWNER_EMAIL_HERE"],
      replyTo: email,
      subject: `Catering inquiry \u2014 ${name} \u00b7 ${eventDate}`,
      html: `
        <h2>New catering inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event date:</strong> ${eventDate}</p>
        <p><strong>Guest count:</strong> ${guestCount}</p>
        <p><strong>Event type:</strong> ${eventType}</p>
        <p><strong>Details:</strong> ${details}</p>
      `,
    });
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please call (619) 312-1077." },
      { status: 500 }
    );
  }
  */

  // For now: log to Vercel function logs and return success.
  // Owner can pull inquiries from logs until Resend is wired up.
  console.log("[catering inquiry]", {
    name,
    email,
    phone,
    eventDate,
    guestCount,
    eventType,
    details,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Thanks \u2014 we got your inquiry. Kevin or the catering team will reach out shortly. For anything urgent, call (619) 312-1077.",
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: true, endpoint: "catering", method: "POST only" },
    { status: 200 }
  );
}
