# Natalie Sit: Personal Brand Website

**AI · Business · Life.** "Why NOT? Reimagine what's possible."

Built with **Next.js 16 (App Router, Cache Components)**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: email + newsletter keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Animated hero (parallax, pointer-reactive orbs, script "Why" + gradient "NOT?"), topic ticker, 3 pillars, about teaser, latest posts, videos, services, newsletter |
| `/about` | Story, timeline, values, CTA |
| `/journal` | Articles with URL-synced category filter (`?category=ai`) |
| `/journal/[slug]` | Article page (static params, BlogPosting JSON-LD, related posts) |
| `/videos` | YouTube (click-to-play facade) + Instagram grid (official embeds) |
| `/work-with-me` | Speaking, workshops, collabs, advisory, process, FAQ |
| `/contact` | Validated contact form (`?type=speaking` preselects the topic) |

## Editing content (no component changes needed)

All copy lives in **`src/data/`**:

- `site.ts`: name, tagline, nav, **social links** (empty `url` hides an icon), domain
- `pillars.ts`: AI / Business / Life cards + ticker topics
- `about.ts`: bio, values, timeline, fun facts
- `posts.ts`: journal articles (block format: `p`, `h2`, `quote`, `list`)
- `media.ts`: **YouTube & Instagram** content
- `services.ts`: offers, process, FAQ

> Everything marked `TODO(client)` is starter copy written to show the tone. Replace it with Natalie's real story, links and posts before launch.

### Adding YouTube videos
In `src/data/media.ts`, paste the 11-character ID into `youtubeId`:
`youtube.com/watch?v=dQw4w9WgXcQ` → `youtubeId: "dQw4w9WgXcQ"`.
The card switches from "Coming soon" to the real thumbnail, and the player loads only on click (privacy-enhanced `youtube-nocookie.com`).

### Adding Instagram posts / reels
Paste the full post URL into `url` (e.g. `https://www.instagram.com/p/XXXX/`). Tiles become official Instagram embeds; the embed script loads lazily and only when at least one URL is set.

## Project structure

```
src/
  app/                 routes, loading.tsx, error.tsx, global-error.tsx, not-found.tsx,
                       sitemap.ts, robots.ts, icon.svg, api/contact, api/newsletter
  components/
    layout/            Navbar (scroll glass, mobile menu), Footer, Logo
    home/              Hero, Marquee, Pillars, AboutTeaser, FeaturedPosts, VideoTeaser, ...
    journal/ media/ contact/ forms/
    ui/                Button, Spinner/PageLoader, Reveal, SectionHeading, GlassOrb, ErrorState, ...
  data/                all editable content
  lib/                 posts (data access), validations (zod, shared client+server),
                       seo, mailer, rate-limit, api-client, fonts, utils
  types/               shared TypeScript types
  fonts/               self-hosted woff2 (Plus Jakarta Sans + Allura)
public/images/         hero-bg, natalie-portrait-cutout (transparent hero cutout), natalie-portrait, og-image
```

## Best practices included

- **Code splitting:** `next/dynamic` for below-the-fold and form bundles (video section, newsletter, contact form, Instagram feed)
- **Loading states:** branded `loading.tsx`, Suspense fallbacks, button spinners, video-loading spinner
- **Error handling:** root + journal `error.tsx`, `global-error.tsx`, custom 404, typed `ApiResult` responses, request timeouts, field-level server errors mapped back into the form
- **Forms:** react-hook-form + zod (same schema on client and server), honeypot, per-IP rate limit, HTML-escaped emails
- **Performance:** static prerendering, `next/image` (AVIF/WebP), self-hosted fonts via `next/font/local`, YouTube facade, lazy third-party scripts
- **SEO:** per-page metadata + Open Graph, canonical URLs, sitemap, robots, Person + BlogPosting JSON-LD
- **Accessibility:** skip link, focus rings, ARIA on menus/tabs/forms, `prefers-reduced-motion` respected
- **Security headers** in `next.config.ts`

## Environment variables

See `.env.example`. Without keys, contact messages and sign-ups are logged to the server console, so everything works locally.

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: contact form email via [Resend](https://resend.com)
- `NEWSLETTER_WEBHOOK_URL`: any webhook (ConvertKit, Beehiiv, Zapier…)
- `NEXT_PUBLIC_SITE_URL`: production domain

## Deploy

Ready for Vercel: import the repo, add env vars, deploy.
