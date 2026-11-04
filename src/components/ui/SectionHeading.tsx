import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Section title. Wrap a word in `script` to render it in the signature
 * handwritten face, echoing the "Why" in the hero.
 */
export function SectionHeading({
  eyebrow,
  title,
  script,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow inline-flex items-center gap-3 text-violet">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
        {script && (
          <span className="mr-2 inline-block font-script text-5xl font-normal text-gradient sm:text-6xl">
            {script}
          </span>
        )}
        {title}
      </h2>
      {description && <p className="text-lg leading-relaxed text-ink-soft text-pretty">{description}</p>}
    </Reveal>
  );
}
