import type { InstagramPost, YouTubeVideo } from "@/types";

/**
 * Video & social content.
 *
 * HOW TO ADD REAL CONTENT LATER
 * - YouTube: paste the 11-character ID from the video URL into `youtubeId`
 *   (youtube.com/watch?v=dQw4w9WgXcQ  →  "dQw4w9WgXcQ"). The card switches
 *   from a placeholder to the real thumbnail + click-to-play player.
 * - Instagram: paste the full post or reel URL into `url`. The tile becomes
 *   an official Instagram embed (the embed script loads lazily, only on the
 *   Videos page, and only when at least one URL is set).
 */
export const youtubeChannel = {
  url: "https://www.youtube.com/", // TODO(client): channel URL
  handle: "@nataliesit",
};

export const instagramProfile = {
  url: "https://www.instagram.com/", // TODO(client): profile URL
  handle: "@nataliesit",
};

export const youtubeVideos: YouTubeVideo[] = [
  { id: "v1", youtubeId: "", title: "My 5 favourite AI tools for everyday work", category: "ai", duration: "12:40" },
  { id: "v2", youtubeId: "", title: "How I plan a whole week of content in one hour", category: "business", duration: "9:15" },
  { id: "v3", youtubeId: "", title: "A day in my life: AI, business and real life", category: "life", duration: "14:02" },
  { id: "v4", youtubeId: "", title: "Prompting for beginners: the only framework you need", category: "ai", duration: "8:30" },
  { id: "v5", youtubeId: "", title: "Automate the boring stuff in your small business", category: "business", duration: "11:21" },
  { id: "v6", youtubeId: "", title: "Why NOT? Saying yes to new things at any age", category: "life", duration: "7:48" },
];

export const instagramPosts: InstagramPost[] = [
  { id: "ig1", url: "", caption: "One AI tool, one minute: today's quick win", category: "ai" },
  { id: "ig2", url: "", caption: "Behind the scenes of a workshop day", category: "business" },
  { id: "ig3", url: "", caption: "Sunday reset: slowing down on purpose", category: "life" },
  { id: "ig4", url: "", caption: "The prompt I use every single morning", category: "ai" },
  { id: "ig5", url: "", caption: "3 systems that run my week", category: "business" },
  { id: "ig6", url: "", caption: "Why NOT try something new this week?", category: "life" },
];
