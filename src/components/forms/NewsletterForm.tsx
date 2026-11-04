"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Mail } from "lucide-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { postJson } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "", website: "" } });

  const onSubmit = async (values: NewsletterInput) => {
    setStatus(null);
    const result = await postJson("/api/newsletter", values);
    setStatus({ type: result.ok ? "success" : "error", message: result.message });
    if (result.ok) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-lg">
      <div className="glass flex flex-col gap-2 rounded-3xl p-2 sm:flex-row sm:rounded-full">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex flex-1 items-center gap-3 px-4">
          <Mail className="size-5 shrink-0 text-violet" aria-hidden />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-error" : undefined}
            className="h-12 w-full bg-transparent text-ink placeholder:text-ink-soft/60 focus:outline-none"
            {...register("email")}
          />
        </div>
        {/* Honeypot */}
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
        <Button type="submit" loading={isSubmitting} arrow className="h-12">
          Join the list
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {errors.email ? (
          <motion.p key="err" id="newsletter-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 px-4 text-sm font-medium text-red-600">
            {errors.email.message}
          </motion.p>
        ) : status ? (
          <motion.p
            key={status.message}
            role={status.type === "error" ? "alert" : "status"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 flex items-center gap-2 px-4 text-sm font-medium ${status.type === "success" ? "text-emerald" : "text-red-600"}`}
          >
            {status.type === "success" && <CheckCircle2 className="size-4" />}
            {status.message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
