import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark: handwritten "Natalie" + spaced "SIT", echoing the hero type pairing. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Natalie Sit, home" className={cn("group inline-flex items-baseline gap-1.5", className)}>
      <span className="font-script text-[2.1rem] leading-none text-ink transition-colors group-hover:text-violet">
        Natalie
      </span>
      <span className="text-gradient text-sm font-extrabold tracking-[0.35em]">SIT</span>
    </Link>
  );
}
