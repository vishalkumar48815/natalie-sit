import { pillarBadge, pillarLabel } from "@/data/pillars";
import { cn } from "@/lib/utils";
import type { PillarSlug } from "@/types";

export function CategoryBadge({ category, className }: { category: PillarSlug; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        pillarBadge[category],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {pillarLabel[category]}
    </span>
  );
}
