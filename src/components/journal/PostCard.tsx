import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";
import { CategoryBadge } from "@/components/ui/Badge";
import { PostCover } from "./PostCover";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group glass relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgb(91_60_242/0.45)]">
      <div className="overflow-hidden">
        <PostCover category={post.category} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <CategoryBadge category={post.category} />
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
            <Clock className="size-3.5" /> {post.readingMinutes} min read
          </span>
        </div>
        <h3 className="mt-4 text-xl leading-snug font-bold text-ink text-balance">
          <Link href={`/journal/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <time dateTime={post.publishedAt} className="text-ink-soft">
            {formatDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1.5 font-semibold text-violet">
            Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
