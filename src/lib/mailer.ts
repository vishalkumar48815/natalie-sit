import "server-only";

interface MailInput {
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends a notification email via Resend's REST API (no SDK needed).
 * Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in .env.local.
 * Without a key (local dev), submissions are logged to the server console
 * so the form still works end to end.
 */
export async function sendMail({ subject, html, replyTo }: MailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.info("[mailer] RESEND_API_KEY / CONTACT_TO_EMAIL not set. Logging instead:\n", subject);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, reply_to: replyTo }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Email provider responded ${res.status}: ${detail.slice(0, 200)}`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
