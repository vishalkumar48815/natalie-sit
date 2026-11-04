import Link from "next/link";
import { activeSocials, contactNavItem, mainNav, siteConfig } from "@/data/site";
import { pillars } from "@/data/pillars";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-white/50">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-violet/10 blur-3xl" />
      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-sm text-ink-soft">{siteConfig.description}</p>
          <p className="eyebrow flex gap-3 text-ink">
            {siteConfig.pillarsLine.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {i > 0 && <span className="size-1 rounded-full bg-violet" />}
                {p}
              </span>
            ))}
          </p>
          {activeSocials.length > 0 && (
            <ul className="flex gap-3">
              {activeSocials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${s.label}`}
                    className="grid size-11 place-items-center rounded-full border border-line bg-white/70 text-ink transition hover:-translate-y-0.5 hover:border-violet hover:text-violet"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h3 className="mb-4 text-sm font-bold tracking-widest text-ink uppercase">Explore</h3>
          <ul className="flex flex-col gap-2.5">
            {[...mainNav, contactNavItem].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft transition hover:text-violet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-widest text-ink uppercase">Topics</h3>
          <ul className="flex flex-col gap-2.5">
            {pillars.map((p) => (
              <li key={p.slug}>
                <Link href={`/journal?category=${p.slug}`} className="text-ink-soft transition hover:text-violet">
                  {p.title}: {p.kicker}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-sm text-ink-soft sm:flex-row">
          <p>
            © {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Made with curiosity. <span className="font-script text-lg text-violet">Why not?</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
