import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import type { PostBlock } from "@/types";
import { Button } from "@/components/ui/Button";
import { CategoryBadge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/journal/PostCard";
import { PostCover } from "@/components/journal/PostCover";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/journal/${post.slug}`,
  };

  return (
    <article className="aurora pt-32 pb-24 sm:pt-40">
      <Container className="max-w-3xl">
        <Reveal>
          <Link href="/journal" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-violet">
            <ArrowLeft className="size-4" /> Back to journal
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
            <CategoryBadge category={post.category} />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {post.readingMinutes} min read
            </span>
          </div>
          <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-ink text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink-soft">{post.excerpt}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <PostCover category={post.category} large className="mt-10 aspect-[16/8] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(91_60_242/0.6)]" />
        </Reveal>

        <div className="prose-natalie mt-12">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="glass mt-14 flex flex-col items-start gap-5 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-script text-4xl text-gradient">Enjoyed this?</p>
            <p className="mt-1 text-ink-soft">Get one useful idea like this in your inbox every week.</p>
          </div>
          <Button href="/#newsletter" arrow>
            Join the list
          </Button>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-24">
          <h2 className="text-center text-3xl font-bold text-ink">
            <span className="font-script text-5xl font-normal text-gradient">Keep</span> reading
          </h2>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-7 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
