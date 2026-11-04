import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WorkTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Work with me"
          script="Let's"
          title="create something together"
          description="From keynotes to hands-on team workshops and brand collaborations, I love helping people get genuinely excited about what AI can do for them."
        />
        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.id} delay={i * 0.08}>
                <Link
                  href={`/work-with-me#${s.id}`}
                  className="group glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-brand grid size-12 place-items-center rounded-2xl text-white shadow-md">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-ink-soft transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
