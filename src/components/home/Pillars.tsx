import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { pillars } from "@/data/pillars";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Pillars() {
  return (
    <section id="pillars" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <Container>
        <SectionHeading
          eyebrow="What I share"
          script="Three"
          title="things I talk about"
          description="Everything here comes back to one idea: technology should make business easier and life fuller. Pick the lane that speaks to you."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.slug} delay={i * 0.12}>
                <Link
                  href={`/journal?category=${p.slug}`}
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgb(91_60_242/0.45)]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
                      p.accent,
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <span className={cn("grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg", p.accent)}>
                      <Icon className="size-7" />
                    </span>
                    <ArrowUpRight className="size-6 text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet" />
                  </div>
                  <p className="mt-8 text-sm font-semibold tracking-wider text-violet uppercase">{p.kicker}</p>
                  <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.description}</p>
                  <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6">
                    {p.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                        <Check className="size-4 text-violet" /> {t}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
