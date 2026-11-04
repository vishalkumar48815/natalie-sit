"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { GlassOrb } from "./GlassOrb";

/** Friendly, on-brand fallback shared by every error boundary. */
export function ErrorState({
  error,
  retry,
  title = "Well, that wasn't supposed to happen.",
}: {
  error: unknown;
  retry: () => void;
  title?: string;
}) {
  useEffect(() => {
    // Hook point for Sentry / LogRocket etc.
    console.error(error);
  }, [error]);

  const digest =
    error && typeof error === "object" && "digest" in error ? String((error as { digest?: string }).digest ?? "") : "";

  return (
    <section className="aurora relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 pt-28 pb-16">
      <GlassOrb className="top-36 left-[15%] size-16 animate-float" ring />
      <GlassOrb className="right-[18%] bottom-24 size-10 animate-float-slow" />
      <div className="glass relative max-w-lg rounded-[2rem] p-10 text-center">
        <p className="font-script text-6xl text-gradient">Oops</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-3 text-ink-soft">
          Something went wrong while loading this page. Give it another try. If it keeps happening, please let me know.
        </p>
        {digest && <p className="mt-3 font-mono text-xs text-ink-soft/70">Ref: {digest}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="bg-brand inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-lg"
          >
            <RefreshCw className="size-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-violet/30 bg-white/60 px-6 text-sm font-semibold text-ink"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
