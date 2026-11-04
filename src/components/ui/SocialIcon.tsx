import type { SocialLink } from "@/types";

/** Brand glyphs as inline SVG (lucide no longer ships brand logos). */
const paths: Record<SocialLink["platform"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <path
        d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 10v6.5M7.5 7.5v.01M11 16.5V10m0 3c0-1.7 1-3 2.6-3s2.4 1.1 2.4 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ),
  tiktok: (
    <path
      d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46M14 3c.4 2.6 2.2 4.4 5 4.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  x: <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
};

export function SocialIcon({ platform, className = "size-5" }: { platform: SocialLink["platform"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {paths[platform]}
    </svg>
  );
}
