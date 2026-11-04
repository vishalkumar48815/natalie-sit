"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { CategoryBadge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import type { YouTubeVideo } from "@/types";

/**
 * Click-to-play YouTube facade: shows a lightweight thumbnail and only
 * loads the heavy iframe (privacy-enhanced domain) when the user clicks.
 * With no `youtubeId` yet, renders a branded "coming soon" placeholder.
 */
export function YouTubeCard({ video, className }: { video: YouTubeVideo; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const hasVideo = video.youtubeId.length === 11;

  return (
    <article className={cn("group glass flex h-full flex-col overflow-hidden rounded-[1.75rem]", className)}>
      <div className={cn("relative overflow-hidden bg-ink", video.isShort ? "aspect-[9/16]" : "aspect-video")}>
        {playing && hasVideo ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center">
                <Spinner tone="light" label="Loading video" />
              </div>
            )}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 size-full"
            />
          </>
        ) : (
          <button
            type="button"
            disabled={!hasVideo}
            onClick={() => setPlaying(true)}
            aria-label={hasVideo ? `Play: ${video.title}` : `${video.title} (coming soon)`}
            className="absolute inset-0 size-full disabled:cursor-default"
          >
            {hasVideo && !thumbFailed ? (
              <Image
                src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                onError={() => setThumbFailed(true)}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#c9d4ff_0%,transparent_45%),radial-gradient(circle_at_80%_80%,#c86af0_0%,transparent_50%),linear-gradient(135deg,#2f4cf6,#7b3cf2)]">
                <span className="absolute right-4 -bottom-6 font-script text-8xl text-white/20">Natalie</span>
              </span>
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-violet shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-6 fill-current" />
            </span>
            {!hasVideo && (
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wide text-violet uppercase">
                Coming soon
              </span>
            )}
            {video.duration && (
              <span className="absolute right-4 bottom-4 rounded-md bg-ink/70 px-2 py-0.5 text-xs font-semibold text-white">{video.duration}</span>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <CategoryBadge category={video.category} className="self-start" />
        <h3 className="text-lg leading-snug font-bold text-ink">{video.title}</h3>
      </div>
    </article>
  );
}
