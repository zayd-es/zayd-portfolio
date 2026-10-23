import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { contactSchema, type ContactErrorCode } from "@/lib/contact-schema";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

// 5 messages per IP every 10 minutes.
const limiter = createMemoryRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });
const MAX_BODY_BYTES = 10_000;

const fail = (error: ContactErrorCode, status: number, headers?: HeadersInit) =>
  NextResponse.json({ ok: false, error }, { status, headers });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail("notConfigured", 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success, retryAfter } = await limiter.limit(ip);
  if (!success) return fail("rateLimited", 429, { "Retry-After": String(retryAfter) });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("invalid", 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail("invalid", 400);

  const { name, email, message, company } = parsed.data;
  // Honeypot filled: pretend it worked so bots don't retry.
  if (company) return NextResponse.json({ ok: true });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: profile.email,
    replyTo: email,
    subject: `New message from ${name.replace(/\s+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return fail("server", 502);
  }

  return NextResponse.json({ ok: true });
}
