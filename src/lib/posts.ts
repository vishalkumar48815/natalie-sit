import { posts } from "@/data/posts";
import type { PillarSlug, Post } from "@/types";

/**
 * Data-access layer for the journal. Pages only import from here, so
 * moving posts to MDX or a CMS later means changing this file only.
 */
const byNewest = (a: Post, b: Post) => b.publishedAt.localeCompare(a.publishedAt);

export function getAllPosts(): Post[] {
  return [...posts].sort(byNewest);
}

export function getFeaturedPosts(limit = 3): Post[] {
  const featured = getAllPosts().filter((p) => p.featured);
  return (featured.length ? featured : getAllPosts()).slice(0, limit);
}

export function getPostsByCategory(category: PillarSlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 2): Post[] {
  const same = getAllPosts().filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = getAllPosts().filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
