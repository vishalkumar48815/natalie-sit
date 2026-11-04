import { Sparkle } from "lucide-react";
import { marqueeTopics } from "@/data/pillars";

/** Infinite topic ticker (pure CSS, pauses on hover). */
export function Marquee() {
  const items = [...marqueeTopics, ...marqueeTopics];
  return (
    <div className="relative border-y border-white/60 bg-brand py-5 text-white" aria-label="Topics I cover">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li key={i} aria-hidden={i >= marqueeTopics.length} className="flex items-center gap-10 text-lg font-semibold whitespace-nowrap">
              {t}
              <Sparkle className="size-4 fill-white/80 text-white/80" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
