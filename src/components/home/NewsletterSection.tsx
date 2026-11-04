import dynamic from "next/dynamic";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GlassOrb } from "@/components/ui/GlassOrb";
import { Reveal } from "@/components/ui/Reveal";
import { Spinner } from "@/components/ui/Spinner";

// Code-split: form logic (react-hook-form + zod) loads in its own chunk.
const NewsletterForm = dynamic(() => import("@/components/forms/NewsletterForm").then((m) => m.NewsletterForm), {
  loading: () => (
    <div className="glass flex h-16 w-full max-w-lg items-center justify-center rounded-full">
      <Spinner size="sm" />
    </div>
  ),
});

export function NewsletterSection() {
  return (
    <section id="newsletter" className="scroll-mt-24 px-3 py-16 sm:px-5 sm:py-24">
      <Container className="px-0 sm:px-0">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-16 sm:py-24">
          <Image src="/images/hero-bg.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-white/55 backdrop-blur-[2px]" />
          <GlassOrb className="top-10 left-[8%] size-12 animate-float" ring />
          <GlassOrb className="right-[10%] bottom-12 size-9 animate-float-slow" />
          <p className="eyebrow text-violet">The Why NOT? letter</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
            One useful idea a week on <span className="text-gradient">AI, business & life</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Join the list for practical tips, tools I&apos;m testing and the occasional pep talk. Short, friendly, no spam.
          </p>
          <div className="mt-10 flex justify-center">
            <NewsletterForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
