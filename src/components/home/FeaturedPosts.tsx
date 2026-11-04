import { getFeaturedPosts } from "@/lib/posts";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/journal/PostCard";

export function FeaturedPosts() {
  const posts = getFeaturedPosts(3);
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the journal"
            script="Fresh"
            title="ideas & notes"
            description="Short, practical reads on AI, business and the art of staying human."
          />
          <Reveal>
            <Button href="/journal" variant="outline" arrow>
              All articles
            </Button>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.1}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
