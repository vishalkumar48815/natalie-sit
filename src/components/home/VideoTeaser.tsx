import { instagramProfile, youtubeChannel, youtubeVideos } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { YouTubeCard } from "@/components/media/YouTubeCard";

export function VideoTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lilac/70 to-transparent" />
      <Container>
        <SectionHeading
          eyebrow="Watch & follow"
          script="Press"
          title="play with me"
          description="Tutorials, behind-the-scenes and real talk, on YouTube and Instagram."
        />
        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {youtubeVideos.slice(0, 3).map((v, i) => (
            <Reveal as="li" key={v.id} delay={i * 0.1}>
              <YouTubeCard video={v} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 flex flex-wrap justify-center gap-4">
          {/* <Button href="/videos" arrow>
            All videos
          </Button> */}
          <Button href={youtubeChannel.url} external variant="glass">
            <span className="flex items-center gap-2">
              <SocialIcon platform="youtube" /> Subscribe
            </span>
          </Button>
          <Button href={instagramProfile.url} external variant="glass">
            <span className="flex items-center gap-2">
              <SocialIcon platform="instagram" /> Follow {instagramProfile.handle}
            </span>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
