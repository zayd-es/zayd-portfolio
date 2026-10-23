import { z } from "zod";

/**
 * Shared by the form (instant feedback) and the API route (source of truth).
 * Error messages are translation keys under `contact.errors`.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "nameShort" }).max(80, { error: "nameLong" }),
  email: z.string().trim().max(200, { error: "emailInvalid" }).pipe(z.email({ error: "emailInvalid" })),
  message: z.string().trim().min(10, { error: "messageShort" }).max(5000, { error: "messageLong" }),
  // Honeypot: hidden from people, bots tend to fill it. Accepted here so the
  // route can answer bots with a fake success instead of an error.
  company: z.string().max(200).optional(),
});

export type ContactField = "name" | "email" | "message";

/** Error codes returned by POST /api/contact (also translation keys). */
export type ContactErrorCode = "invalid" | "rateLimited" | "notConfigured" | "server";
