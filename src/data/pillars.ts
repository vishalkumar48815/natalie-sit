import { BrainCircuit, HeartHandshake, TrendingUp } from "lucide-react";
import type { Pillar, PillarSlug } from "@/types";

export const pillars: Pillar[] = [
  {
    slug: "ai",
    title: "AI",
    kicker: "Make the tech work for you",
    description:
      "No jargon, no hype. Plain-English walkthroughs of the AI tools worth your time, and how to actually use them day to day.",
    topics: ["Tool walkthroughs", "Prompting made simple", "Automations", "What's new & what matters"],
    icon: BrainCircuit,
    accent: "from-indigo to-violet",
  },
  {
    slug: "business",
    title: "Business",
    kicker: "Build smarter, not harder",
    description:
      "Real lessons from building and running a business: the systems, decisions and shortcuts that free up time for what counts.",
    topics: ["Workflows & systems", "Growth & marketing", "Leadership", "Working with AI teams"],
    icon: TrendingUp,
    accent: "from-violet to-orchid",
  },
  {
    slug: "life",
    title: "Life",
    kicker: "Stay human in a fast world",
    description:
      "The honest side: balance, curiosity, confidence, and asking “why not?” when something new feels a little scary.",
    topics: ["Mindset", "Balance & energy", "Learning out loud", "Everyday wins"],
    icon: HeartHandshake,
    accent: "from-emerald to-indigo",
  },
];

export const pillarLabel: Record<PillarSlug, string> = {
  ai: "AI",
  business: "Business",
  life: "Life",
};

/** Badge colour per category, reused across cards. */
export const pillarBadge: Record<PillarSlug, string> = {
  ai: "bg-indigo/10 text-indigo",
  business: "bg-violet/10 text-violet",
  life: "bg-emerald/10 text-emerald",
};

export const marqueeTopics = [
  "AI tools that save hours",
  "Real conversations",
  "Business systems",
  "Why NOT?",
  "Prompting made simple",
  "Confidence with tech",
  "Life in balance",
  "Learning out loud",
];
