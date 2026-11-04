import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/** Consistent per-page metadata (canonical, Open Graph, Twitter). */
export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
