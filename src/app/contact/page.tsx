import { Suspense } from "react";
import { Clock, MessageCircleHeart, Sparkles } from "lucide-react";
import { activeSocials } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PageLoader } from "@/components/ui/Spinner";
import { ContactFormLoader } from "./ContactFormLoader";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Natalie Sit about speaking, workshops, collaborations or just to say hello.",
  path: "/contact",
});

const notes = [
  { icon: MessageCircleHeart, title: "Every note is read", text: "Personally, with a cup of coffee." },
  { icon: Clock, title: "Quick replies", text: "Usually within 2–3 working days." },
  { icon: Sparkles, title: "Open to ideas", text: "Big or small, new or wild. Why not?" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        script="Let's"
        title="talk."
        description="Planning an event, building a team workshop, pitching a collaboration, or just want to say hi? I'd love to hear from you."
      />
      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal direction="right" className="flex flex-col gap-5">
            {notes.map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass flex items-start gap-4 rounded-3xl p-6">
                <span className="bg-brand grid size-12 shrink-0 place-items-center rounded-2xl text-white">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h2 className="font-bold text-ink">{title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{text}</p>
                </div>
              </div>
            ))}
            {activeSocials.length > 0 && (
              <div className="glass rounded-3xl p-6">
                <h2 className="font-bold text-ink">Prefer social?</h2>
                <p className="mt-1 text-sm text-ink-soft">Send me a DM or say hi in the comments.</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {activeSocials.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-semibold text-ink transition hover:border-violet hover:text-violet"
                      >
                        <SocialIcon platform={s.platform} className="size-4" /> {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal direction="left">
            <Suspense fallback={<div className="glass rounded-[2rem]"><PageLoader label="Loading form" /></div>}>
              <ContactFormLoader />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
