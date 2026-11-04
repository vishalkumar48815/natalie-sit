import { pillars } from "@/data/pillars";
import { cn } from "@/lib/utils";
import type { PillarSlug } from "@/types";

const backgrounds: Record<PillarSlug, string> = {
  ai: "bg-[radial-gradient(circle_at_20%_20%,#c9d4ff_0%,transparent_45%),radial-gradient(circle_at_85%_80%,#c86af0_0%,transparent_50%),linear-gradient(135deg,#2f4cf6,#7b3cf2)]",
  business:
    "bg-[radial-gradient(circle_at_80%_15%,#ffd6ff_0%,transparent_45%),radial-gradient(circle_at_10%_90%,#2f4cf6_0%,transparent_55%),linear-gradient(135deg,#7b3cf2,#c86af0)]",
  life: "bg-[radial-gradient(circle_at_75%_25%,#d8fff0_0%,transparent_45%),radial-gradient(circle_at_15%_85%,#7b3cf2_0%,transparent_55%),linear-gradient(135deg,#0f7a55,#2f4cf6)]",
};

/**
 * Generated cover art for posts (no stock photos needed).
 * Swap for real images later by adding a `cover` field to Post.
 */
export function PostCover({ category, className, large = false }: { category: PillarSlug; className?: string; large?: boolean }) {
  const pillar = pillars.find((p) => p.slug === category)!;
  const Icon = pillar.icon;
  return (
    <div aria-hidden className={cn("relative isolate overflow-hidden", backgrounds[category], className)}>
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgb(255_255_255/0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.25)_1px,transparent_1px)] [background-size:32px_32px]" />
      <span className="absolute -right-6 -bottom-10 font-script text-[9rem] leading-none text-white/20 select-none">{pillar.title}</span>
      <span className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,rgb(255_255_255/0.2)_60%,transparent)] opacity-80 blur-[1px]" />
      <Icon className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg", large ? "size-16" : "size-10")} />
    </div>
  );
}
