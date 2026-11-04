import Image from "next/image";
import { Sparkles } from "lucide-react";
import { aboutIntro, funFacts, timeline, values } from "@/data/about";
import { pillars } from "@/data/pillars";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassOrb } from "@/components/ui/GlassOrb";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  title: "About Natalie",
  description: "The story behind Natalie Sit: a business builder helping people use AI with confidence, in work and in life.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" script="Hello," title="I'm Natalie." description={aboutIntro.headline} />

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
            <div className="bg-brand-animated rounded-[2.5rem] p-[3px] shadow-[0_50px_100px_-40px_rgb(91_60_242/0.6)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.4rem] bg-lilac">
                <Image src="/images/natalie-portrait.webp" alt="Natalie Sit standing and smiling" fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-top" />
              </div>
            </div>
            <GlassOrb className="-top-5 -left-5 size-14 animate-float" ring />
            <ul className="glass absolute -right-3 -bottom-8 flex flex-col gap-1.5 rounded-2xl p-5 sm:-right-10">
              {funFacts.slice(0, 3).map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Sparkles className="size-3.5 text-violet" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-violet">My story</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Curious by nature, <span className="text-gradient">practical by habit.</span>
              </h2>
            </Reveal>
            <div className="prose-natalie mt-8">
              {aboutIntro.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Timeline */}
            <ol className="relative mt-12 border-l-2 border-dashed border-violet/25 pl-8">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.title} delay={i * 0.1} className="relative list-none pb-10 last:pb-0">
                  <span className="bg-brand absolute top-1 -left-[2.6rem] size-5 rounded-full ring-4 ring-mist" />
                  <p className="text-xs font-bold tracking-[0.25em] text-violet uppercase">{t.label}</p>
                  <h3 className="mt-1 text-xl font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lilac/70 to-transparent" />
        <Container>
          <SectionHeading eyebrow="What I believe" script="My" title="little rule book" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="glass rounded-3xl p-7">
                <span className="text-gradient text-5xl font-extrabold">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pillars recap + CTA */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="glass relative overflow-hidden rounded-[2.5rem] p-10 text-center sm:p-16">
            <div aria-hidden className="absolute -top-24 left-1/2 h-60 w-[40rem] -translate-x-1/2 rounded-full bg-orchid/20 blur-3xl" />
            <p className="font-script text-6xl text-gradient">Why not?</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-ink text-balance sm:text-4xl">
              Come for the {pillars.map((p) => p.title).join(", ").replace(/, ([^,]*)$/, " and $1")}. Stay for the conversation.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/journal" arrow>
                Read the journal
              </Button>
              <Button href="/contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
