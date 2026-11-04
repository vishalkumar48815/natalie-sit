import Image from "next/image";
import { Container } from "./Container";
import { GlassOrb } from "./GlassOrb";
import { Reveal } from "./Reveal";

/** Shared hero banner for inner pages, using the same glass-wave artwork. */
export function PageHero({
  eyebrow,
  script,
  title,
  description,
  children,
}: {
  eyebrow: string;
  script?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right opacity-70"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-mist via-mist/85 to-mist/30" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-mist to-transparent" />
      <GlassOrb className="top-32 right-[12%] size-14 animate-float" ring />
      <GlassOrb className="right-[30%] bottom-16 size-8 animate-float-slow" />

      <Container>
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-5 text-violet">{eyebrow}</p>
          <h1 className="text-5xl font-bold tracking-tight text-ink text-balance sm:text-6xl lg:text-7xl">
            {script && <span className="mr-3 font-script text-6xl font-normal text-gradient sm:text-7xl lg:text-8xl">{script}</span>}
            {title}
          </h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
