import dynamic from "next/dynamic";
import { instagramPosts, instagramProfile, youtubeChannel, youtubeVideos } from "@/data/media";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PageLoader } from "@/components/ui/Spinner";
import { YouTubeCard } from "@/components/media/YouTubeCard";

// The Instagram grid (and its embed script) lives in its own chunk.
const InstagramFeed = dynamic(() => import("@/components/media/InstagramFeed").then((m) => m.InstagramFeed), {
  loading: () => <PageLoader label="Loading feed" />,
});

export const metadata = buildMetadata({
  title: "Videos",
  description: "Watch Natalie Sit's tutorials, behind-the-scenes and real conversations about AI, business and life on YouTube and Instagram.",
  path: "/videos",
});

export default function VideosPage() {
  const [featured, ...rest] = youtubeVideos;
  return (
    <>
      <PageHero
        eyebrow="Videos & reels"
        script="Watch,"
        title="learn & say why not."
        description="Tutorials you can follow along with, behind-the-scenes moments and honest chats. New videos every week."
      >
        <div className="flex flex-wrap gap-4">
          <Button href={youtubeChannel.url} external arrow>
            <span className="flex items-center gap-2">
              <SocialIcon platform="youtube" /> Subscribe on YouTube
            </span>
          </Button>
          <Button href={instagramProfile.url} external variant="glass">
            <span className="flex items-center gap-2">
              <SocialIcon platform="instagram" /> {instagramProfile.handle}
            </span>
          </Button>
        </div>
      </PageHero>

      {/* YouTube */}
      <section aria-labelledby="yt-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="flex items-center gap-3">
            <span className="bg-brand grid size-11 place-items-center rounded-2xl text-white">
              <SocialIcon platform="youtube" />
            </span>
            <h2 id="yt-heading" className="text-3xl font-bold text-ink">
              On YouTube
            </h2>
          </div>

          {featured && (
            <Reveal className="mt-10">
              <YouTubeCard video={featured} className="lg:grid lg:grid-cols-[1.6fr_1fr] lg:[&>div:first-child]:aspect-auto lg:[&>div:first-child]:min-h-[420px] lg:[&>div:last-child]:justify-center lg:[&>div:last-child]:p-10 lg:[&_h3]:text-3xl" />
            </Reveal>
          )}

          <ul className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((v, i) => (
              <Reveal as="li" key={v.id} delay={(i % 3) * 0.08}>
                <YouTubeCard video={v} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Instagram */}
      <section aria-labelledby="ig-heading" className="relative py-20 sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lilac/70 to-transparent" />
        <Container>
          <SectionHeading eyebrow={instagramProfile.handle} script="Daily" title="moments on Instagram" description="Quick tips, reels and real life, one scroll at a time." />
          <h2 id="ig-heading" className="sr-only">
            Instagram
          </h2>
          <div className="mt-14">
            <InstagramFeed posts={instagramPosts} />
          </div>
          <div className="mt-12 flex justify-center">
            <Button href={instagramProfile.url} external variant="outline" arrow>
              Follow on Instagram
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
