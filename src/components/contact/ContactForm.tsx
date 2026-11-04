"use client";

import { useState } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, PartyPopper } from "lucide-react";
import type { z } from "zod";
import { contactSchema, inquiryTypes, type ContactInput } from "@/lib/validations";
import { postJson } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormValues = z.input<typeof contactSchema>;

const fieldBase =
  "w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-ink placeholder:text-ink-soft/50 transition focus:bg-white focus:outline-none focus:ring-4";
const fieldState = (err?: FieldError) =>
  err ? "border-red-400 focus:ring-red-200" : "border-line focus:border-violet focus:ring-violet/15";

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  return (
    <AnimatePresence>
      {error?.message && (
        <motion.p id={id} role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 text-sm font-medium text-red-600">
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm({ defaultInquiry }: { defaultInquiry?: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validDefault = inquiryTypes.some((i) => i.value === defaultInquiry) ? defaultInquiry : "";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", inquiry: validDefault ?? "", message: "", website: "" },
    mode: "onTouched",
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    const result = await postJson("/api/contact", values);
    if (result.ok) {
      setSuccess(result.message);
      reset();
      return;
    }
    if (result.fieldErrors) {
      for (const [field, msgs] of Object.entries(result.fieldErrors)) {
        if (msgs?.[0]) setError(field as keyof FormValues, { message: msgs[0] });
      }
    }
    setServerError(result.message);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass flex flex-col items-center rounded-[2rem] p-10 text-center sm:p-14" role="status">
        <span className="bg-brand grid size-16 place-items-center rounded-full text-white shadow-lg">
          <PartyPopper className="size-8" />
        </span>
        <p className="mt-6 font-script text-5xl text-gradient">Thank you!</p>
        <p className="mt-3 max-w-sm text-ink-soft">{success}</p>
        <Button variant="outline" className="mt-8" onClick={() => setSuccess(null)}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass rounded-[2rem] p-6 sm:p-10" aria-describedby={serverError ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
            Your name <span className="text-violet">*</span>
          </label>
          <input id="name" autoComplete="name" placeholder="Jane Tan" aria-invalid={!!errors.name} aria-describedby="name-error" className={cn(fieldBase, fieldState(errors.name))} {...register("name")} />
          <FieldMessage id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
            Email <span className="text-violet">*</span>
          </label>
          <input id="email" type="email" autoComplete="email" placeholder="jane@company.com" aria-invalid={!!errors.email} aria-describedby="email-error" className={cn(fieldBase, fieldState(errors.email))} {...register("email")} />
          <FieldMessage id="email-error" error={errors.email} />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-semibold text-ink">
            Company / organisation
          </label>
          <input id="company" autoComplete="organization" placeholder="Optional" className={cn(fieldBase, fieldState(errors.company))} {...register("company")} />
        </div>
        <div>
          <label htmlFor="inquiry" className="mb-2 block text-sm font-semibold text-ink">
            What&apos;s this about? <span className="text-violet">*</span>
          </label>
          <select id="inquiry" aria-invalid={!!errors.inquiry} aria-describedby="inquiry-error" className={cn(fieldBase, fieldState(errors.inquiry), "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%237b3cf2%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10")} {...register("inquiry")}>
            <option value="" disabled>
              Choose one…
            </option>
            {inquiryTypes.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          <FieldMessage id="inquiry-error" error={errors.inquiry} />
        </div>
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="message" className="block text-sm font-semibold text-ink">
              Your message <span className="text-violet">*</span>
            </label>
            <span className={cn("text-xs", messageLength > 2000 ? "text-red-600" : "text-ink-soft")}>{messageLength}/2000</span>
          </div>
          <textarea id="message" rows={6} placeholder="Tell me about your event, team or idea…" aria-invalid={!!errors.message} aria-describedby="message-error" className={cn(fieldBase, fieldState(errors.message), "resize-y")} {...register("message")} />
          <FieldMessage id="message-error" error={errors.message} />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.div id="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-ink-soft">Your details are only used to reply to you. No spam, ever.</p>
        <Button type="submit" size="lg" loading={isSubmitting} arrow>
          Send message
        </Button>
      </div>
    </form>
  );
}
