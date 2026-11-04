import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import type { ApiResult } from "@/types";

const json = (body: ApiResult, status = 200) => NextResponse.json(body, { status });

/**
 * Newsletter sign-up.
 * TODO: connect a provider (ConvertKit, Mailchimp, Beehiiv, Resend Audiences)
 * inside `subscribe()`. Until then, sign-ups are logged on the server.
 */
async function subscribe(email: string) {
  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    console.info("[newsletter] NEWSLETTER_WEBHOOK_URL not set. New subscriber:", email);
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "website" }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Newsletter provider responded ${res.status}`);
}

export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${getClientIp(request.headers)}`, 5);
  if (!limit.allowed) return json({ ok: false, message: "Too many attempts. Please try again later." }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, message: "Please enter a valid email address.", fieldErrors: parsed.error.flatten().fieldErrors }, 422);
  }
  if (parsed.data.website) return json({ ok: true, message: "You're in! Welcome aboard." });

  try {
    await subscribe(parsed.data.email);
  } catch (error) {
    console.error("[newsletter] subscribe failed", error);
    return json({ ok: false, message: "Couldn't subscribe you right now. Please try again shortly." }, 502);
  }

  return json({ ok: true, message: "You're in! Look out for a welcome note in your inbox." });
}
