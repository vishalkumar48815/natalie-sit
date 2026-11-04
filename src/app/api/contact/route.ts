import { NextResponse } from "next/server";
import { contactSchema, inquiryTypes } from "@/lib/validations";
import { escapeHtml, sendMail } from "@/lib/mailer";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import type { ApiResult } from "@/types";

const json = (body: ApiResult, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

export async function POST(request: Request) {
  // 1. Rate limit per IP
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, 5);
  if (!limit.allowed) {
    return json({ ok: false, message: "You've sent a few messages already. Please try again a little later." }, 429, {
      "Retry-After": String(limit.retryAfterSec),
    });
  }

  // 2. Parse body safely
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  // 3. Validate with the same schema as the client
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  const data = parsed.data;

  // 4. Honeypot: pretend success for bots, do nothing.
  if (data.website) {
    return json({ ok: true, message: "Thanks! Your message is on its way." });
  }

  // 5. Deliver
  const inquiryLabel = inquiryTypes.find((i) => i.value === data.inquiry)?.label ?? data.inquiry;
  try {
    await sendMail({
      subject: `New website enquiry: ${inquiryLabel} from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New enquiry from nataliesit.com</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "-")}</p>
        <p><strong>Type:</strong> ${escapeHtml(inquiryLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return json({ ok: false, message: "Sorry, your message couldn't be sent right now. Please try again shortly." }, 502);
  }

  return json({ ok: true, message: "Your message is on its way. I read every note and will get back to you soon." });
}
