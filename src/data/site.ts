import type { NavItem, SocialLink } from "@/types";

/**
 * Global site configuration.
 * TODO(client): confirm the final domain, socials and wording with Natalie.
 */
export const siteConfig = {
  name: "Natalie Sit",
  shortName: "Natalie",
  title: "Natalie Sit — AI, Business & Life",
  tagline: "Why NOT? Reimagine what's possible.",
  description:
    "Practical ideas, real conversations and simple ways to make AI work for you in business and in life.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nataliesit.com",
  locale: "en_US",
  ogImage: "/images/og-image.jpg",
  keywords: [
    "Natalie Sit",
    "AI for business",
    "AI tools",
    "entrepreneurship",
    "personal growth",
    "AI content creator",
    "women in tech",
  ],
  pillarsLine: ["AI", "Business", "Life"],
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Videos", href: "/videos" },
  { label: "Work With Me", href: "/work-with-me" },
];

export const contactNavItem: NavItem = { label: "Let's Talk", href: "/contact" };

/** TODO(client): replace with Natalie's real profile URLs. Empty url = hidden. */
export const socialLinks: SocialLink[] = [
  { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/", handle: "@nataliesit" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/", handle: "@nataliesit" },
  { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/", handle: "Natalie Sit" },
  { platform: "tiktok", label: "TikTok", url: "", handle: "" },
];

export const activeSocials = socialLinks.filter((s) => s.url.length > 0);
