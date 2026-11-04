import { z } from "zod";

/** Shared between the client form and the API route, so rules never drift. */
export const inquiryTypes = [
  { value: "speaking", label: "Speaking / keynote" },
  { value: "workshop", label: "AI workshop" },
  { value: "collaboration", label: "Brand collaboration" },
  { value: "advisory", label: "1:1 advisory" },
  { value: "hello", label: "Just saying hello" },
] as const;

const inquiryValues = inquiryTypes.map((i) => i.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "That name is a little long."),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.").max(120)),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  inquiry: z.enum(inquiryValues, { message: "Please choose what this is about." }),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more (at least 20 characters).")
    .max(2000, "Please keep it under 2000 characters."),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().pipe(z.email("Please enter a valid email address.").max(120)),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
