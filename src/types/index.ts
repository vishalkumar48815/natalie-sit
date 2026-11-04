import type { LucideIcon } from "lucide-react";

export type PillarSlug = "ai" | "business" | "life";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "instagram" | "youtube" | "linkedin" | "tiktok" | "x";
  label: string;
  /** Leave empty to hide the icon everywhere on the site. */
  url: string;
  handle?: string;
}

export interface Pillar {
  slug: PillarSlug;
  title: string;
  kicker: string;
  description: string;
  topics: string[];
  icon: LucideIcon;
  /** Tailwind gradient classes for the pillar's accent. */
  accent: string;
}

/** Simple block format for posts; can be swapped for MDX or a CMS later. */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: PillarSlug;
  publishedAt: string; // ISO YYYY-MM-DD
  readingMinutes: number;
  featured?: boolean;
  body: PostBlock[];
}

export interface YouTubeVideo {
  id: string;
  /** The 11-char YouTube ID (from youtube.com/watch?v=XXXX). Empty = placeholder card. */
  youtubeId: string;
  title: string;
  category: PillarSlug;
  duration?: string;
  isShort?: boolean;
}

export interface InstagramPost {
  id: string;
  /** Full post/reel URL, e.g. https://www.instagram.com/p/XXXX/. Empty = placeholder tile. */
  url: string;
  caption: string;
  category: PillarSlug;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  icon: LucideIcon;
  cta: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TimelineItem {
  label: string;
  title: string;
  text: string;
}

export type ApiResult<T = undefined> =
  | { ok: true; message: string; data?: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };
