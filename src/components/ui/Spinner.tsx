import { cn } from "@/lib/utils";

const sizes = { sm: "size-4 border-2", md: "size-8 border-[3px]", lg: "size-14 border-4" };

/** Gradient ring spinner. `tone="light"` for use on the brand gradient. */
export function Spinner({
  size = "md",
  tone = "brand",
  className,
  label = "Loading",
}: {
  size?: keyof typeof sizes;
  tone?: "brand" | "light";
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex", className)}>
      <span
        className={cn(
          "animate-spin rounded-full",
          sizes[size],
          tone === "light"
            ? "border-white/35 border-t-white"
            : "border-violet/15 border-t-violet border-r-orchid",
        )}
      />
    </span>
  );
}

/** Full-section loader: glass orb pulse + ring, used by loading.tsx and Suspense. */
export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5" role="status" aria-live="polite">
      <div className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-violet/15" />
        <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#c9b8ff_35%,#7b3cf2_75%,#2f4cf6)] opacity-90 shadow-[0_0_40px_rgb(123_60_242/0.45)]" />
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-violet border-r-orchid" />
      </div>
      <p className="text-sm font-medium tracking-[0.3em] text-ink-soft uppercase">{label}</p>
    </div>
  );
}
