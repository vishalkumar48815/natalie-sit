import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Pillars } from "@/components/home/Pillars";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { WorkTeaser } from "@/components/home/WorkTeaser";
import { NewsletterSection } from "@/components/home/NewsletterSection";

// Below-the-fold, interactive: split into its own chunk.
const VideoTeaser = dynamic(() => import("@/components/home/VideoTeaser").then((m) => m.VideoTeaser));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      {/* <Pillars /> */}
      <AboutTeaser />
      {/* <FeaturedPosts /> */}
      {/* <VideoTeaser /> */}
      <WorkTeaser />
      <NewsletterSection />
    </>
  );
}
