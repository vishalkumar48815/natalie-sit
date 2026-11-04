import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { GlassOrb } from "@/components/ui/GlassOrb";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="aurora relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-28 pb-16">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <GlassOrb className="top-40 left-[12%] size-20 animate-float" ring />
      <GlassOrb className="right-[14%] bottom-28 size-12 animate-float-slow" />
      <div className="relative text-center">
        <p className="text-gradient text-[8rem] leading-none font-extrabold tracking-tighter sm:text-[11rem]">404</p>
        <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          <span className="font-script text-5xl font-normal text-violet">Why not</span> explore somewhere else?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          This page doesn&apos;t exist, or it has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/journal" variant="glass">
            Read the journal
          </Button>
        </div>
      </div>
    </section>
  );
}
