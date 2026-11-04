"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Heart } from "lucide-react";
import { instagramProfile } from "@/data/media";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CategoryBadge } from "@/components/ui/Badge";
import type { InstagramPost } from "@/types";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const tileArt = [
  "from-indigo via-violet to-orchid",
  "from-violet via-orchid to-indigo",
  "from-emerald via-indigo to-violet",
];

/**
 * Instagram grid. Tiles with a `url` render as official embeds (script
 * loaded lazily, once). Tiles without a URL show a branded placeholder
 * linking to the profile.
 */
export function InstagramFeed({ posts }: { posts: InstagramPost[] }) {
  const hasEmbeds = posts.some((p) => p.url);

  useEffect(() => {
    // Re-process embeds on client navigation back to this page.
    if (hasEmbeds) window.instgrm?.Embeds.process();
  }, [hasEmbeds]);

  return (
    <>
      {hasEmbeds && (
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => window.instgrm?.Embeds.process()} />
      )}
      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {posts.map((post, i) =>
          post.url ? (
            <li key={post.id} className="overflow-hidden rounded-3xl bg-white">
              <blockquote className="instagram-media" data-instgrm-permalink={post.url} data-instgrm-version="14" style={{ margin: 0, width: "100%", minWidth: 0 }}>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  View this post on Instagram
                </a>
              </blockquote>
            </li>
          ) : (
            <li key={post.id}>
              <a
                href={instagramProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-4 text-white sm:p-6 ${tileArt[i % tileArt.length]}`}
              >
                <span aria-hidden className="absolute -right-8 -bottom-10 font-script text-[7rem] leading-none text-white/15">Why not</span>
                <span className="relative flex items-center justify-between">
                  <CategoryBadge category={post.category} className="bg-white/90" />
                  <SocialIcon platform="instagram" className="size-5 opacity-80" />
                </span>
                <span className="relative">
                  <span className="block text-base leading-snug font-bold sm:text-lg">{post.caption}</span>
                  <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold opacity-80">
                    <Heart className="size-3.5" /> {instagramProfile.handle}
                  </span>
                </span>
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
              </a>
            </li>
          ),
        )}
      </ul>
    </>
  );
}
