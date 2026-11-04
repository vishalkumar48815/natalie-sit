import Image from "next/image";
import { Quote } from "lucide-react";
import { aboutIntro } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassOrb } from "@/components/ui/GlassOrb";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal direction="right" className="relative mx-auto w-full max-w-md">
          {/* Arch-framed portrait with gradient ring */}
          <div className="bg-brand-animated relative rounded-t-[999px] rounded-b-[2.5rem] p-[3px] shadow-[0_50px_100px_-40px_rgb(91_60_242/0.6)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.4rem] bg-lilac">
              <Image
                src="/images/natalie-portrait.webp"
                alt="Portrait of Natalie Sit"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
          <GlassOrb className="-top-4 -right-4 size-16 animate-float" ring />
          <div className="glass absolute -bottom-6 -left-4 rounded-2xl px-5 py-4 sm:-left-10">
            <p className="font-script text-3xl leading-none text-violet">Hello!</p>
            <p className="mt-1 text-sm font-semibold text-ink">AI · Business · Life</p>
          </div>
        </Reveal>

        <Reveal direction="left">
          <p className="eyebrow mb-5 inline-flex items-center gap-3 text-violet">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet" /> Meet Natalie
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
            <span className="font-script text-6xl font-normal text-gradient">{aboutIntro.greeting}</span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed font-medium text-ink text-pretty">{aboutIntro.headline}</p>
          <p className="mt-5 leading-relaxed text-ink-soft">{aboutIntro.paragraphs[0]}</p>

          <figure className="glass mt-8 rounded-2xl p-6">
            <Quote className="size-6 text-violet" aria-hidden />
            <blockquote className="mt-2 text-lg font-medium text-ink italic">
              &ldquo;Most people don&apos;t need more hype. They need someone to show them how this fits into a real day.&rdquo;
            </blockquote>
          </figure>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/about" arrow>
              My story
            </Button>
            <Button href="/contact" variant="outline">
              Say hello
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
