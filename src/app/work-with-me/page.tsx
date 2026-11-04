import { Check, Plus } from "lucide-react";
import { faqs, process, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  title: "Work With Me",
  description: "Book Natalie Sit for keynotes, hands-on AI workshops, brand collaborations and 1:1 advisory.",
  path: "/work-with-me",
});

const serviceToInquiry: Record<string, string> = {
  speaking: "speaking",
  workshops: "workshop",
  brand: "collaboration",
  advisory: "advisory",
};

export default function WorkWithMePage() {
  return (
    <>
      <PageHero
        eyebrow="Work with me"
        script="Let's"
        title="make AI feel possible for your people."
        description="Keynotes, workshops and partnerships that leave audiences curious, confident and ready to try something new."
      >
        <Button href="/contact" size="lg" arrow>
          Start a conversation
        </Button>
      </PageHero>

      {/* Services */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-7 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={(i % 2) * 0.1}>
                <article id={s.id} className="glass group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10">
                  <span aria-hidden className="absolute -top-20 -right-20 size-52 rounded-full bg-violet/15 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                  <span className="bg-brand grid size-14 place-items-center rounded-2xl text-white shadow-lg">
                    <Icon className="size-7" />
                  </span>
                  <h2 className="mt-6 text-2xl font-bold text-ink">{s.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.description}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-sm font-medium text-ink">
                        <Check className="size-4 shrink-0 text-violet" /> {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href={`/contact?type=${serviceToInquiry[s.id] ?? "hello"}`} variant="outline" arrow>
                      {s.cta}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      {/* Process */}
      <section className="relative py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lilac/70 to-transparent" />
        <Container>
          <SectionHeading eyebrow="How it works" script="Simple" title="from hello to done" />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.1} className="glass relative rounded-3xl p-7">
                <span className="text-gradient text-5xl font-extrabold">{p.step}</span>
                <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" script="Good" title="questions" />
          <div className="mt-12 flex flex-col gap-4">
            {faqs.map((f, i) => (
              <Reveal key={f.question} delay={i * 0.05}>
                <details className="glass group rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                    {f.question}
                    <Plus className="size-5 shrink-0 text-violet transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 leading-relaxed text-ink-soft">{f.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <p className="text-ink-soft">Still wondering?</p>
            <Button href="/contact" className="mt-4" arrow>
              Ask me anything
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
