import { cn } from "@/lib/utils";

/** Decorative iridescent glass sphere, matching the orbs in the hero art. */
export function GlassOrb({ className, ring = false }: { className?: string; ring?: boolean }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute block rounded-full", className)}>
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#e7dcff_18%,#9d7bff_45%,#5b3cf2_70%,#2f4cf6_100%)] opacity-90 shadow-[0_0_40px_rgb(123_60_242/0.45),inset_-6px_-10px_20px_rgb(47_76_246/0.5)]" />
      <span className="absolute top-[14%] left-[22%] h-[22%] w-[30%] rotate-[-25deg] rounded-full bg-white/80 blur-[2px]" />
      {ring && (
        <span className="absolute top-1/2 left-1/2 h-[30%] w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-white/60" />
      )}
    </span>
  );
}
