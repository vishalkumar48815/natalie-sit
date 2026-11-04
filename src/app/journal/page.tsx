import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PostCard } from "@/components/journal/PostCard";
import { JournalList } from "@/components/journal/JournalList";

export const metadata = buildMetadata({
  title: "Journal",
  description: "Practical articles from Natalie Sit on using AI, building a business and living well in a fast-moving world.",
  path: "/journal",
});

/** Static fallback (all posts) shown while the URL-synced filter hydrates. */
function JournalFallback({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  return (
    <>
      <div className="glass mx-auto h-[52px] w-[min(100%,26rem)] rounded-full" />
      <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function JournalPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="The journal"
        script="Notes"
        title="on AI, business & life"
        description="Short, honest reads to help you work smarter and live a little fuller. Filter by what you're curious about."
      />
      <section className="pb-24 sm:pb-32">
        <Container>
          <Suspense fallback={<JournalFallback posts={posts} />}>
            <JournalList posts={posts} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
