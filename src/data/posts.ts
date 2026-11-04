import type { Post } from "@/types";

/**
 * Journal posts.
 * TODO(client): starter articles written to show the layout and tone.
 * Replace with Natalie's own writing (or move to MDX / a headless CMS
 * later; only `src/lib/posts.ts` needs to change).
 */
export const posts: Post[] = [
  {
    slug: "why-not-start-with-ai-today",
    title: "Why NOT start with AI today? A gentle first step",
    excerpt:
      "You don't need to be technical to begin. Here's the five-minute habit I recommend to everyone who asks me where to start.",
    category: "ai",
    publishedAt: "2026-10-28",
    readingMinutes: 5,
    featured: true,
    body: [
      { type: "p", text: "The most common thing people tell me is, “I know I should be using AI, but I don't know where to begin.” If that's you, I want you to know something: you're not behind. You're right on time." },
      { type: "h2", text: "Start with something you already do" },
      { type: "p", text: "Don't look for a brand-new use case. Pick one task you already do every week, like writing an email, summarising a meeting or planning a post, and ask an AI assistant to help with just that." },
      { type: "quote", text: "The goal isn't to replace you. It's to give you back the time you spend on the parts you don't love." },
      { type: "h2", text: "My five-minute habit" },
      { type: "list", items: ["Open your assistant of choice with your morning coffee.", "Describe one task in plain words, as if talking to a helpful friend.", "Ask it to improve, shorten or reorganise your first draft.", "Keep what works, ignore what doesn't."] },
      { type: "p", text: "That's it. Do this for a week and you'll start to notice dozens of small places it can help. Curiosity compounds. So why not start today?" },
    ],
  },
  {
    slug: "three-systems-that-give-me-back-my-week",
    title: "Three simple systems that give me back my week",
    excerpt:
      "Running a business taught me that time is the only resource you can't earn back. These three systems protect mine.",
    category: "business",
    publishedAt: "2026-10-14",
    readingMinutes: 6,
    featured: true,
    body: [
      { type: "p", text: "For a long time I wore “busy” like a badge. Then I realised busy and effective are not the same thing. Here are the three systems that changed that for me." },
      { type: "h2", text: "1. A single source of truth" },
      { type: "p", text: "Every task, idea and follow-up lives in one place. When your brain isn't the filing cabinet, it's free to do its real job: thinking." },
      { type: "h2", text: "2. Templates for everything you repeat" },
      { type: "p", text: "Proposals, onboarding emails, weekly updates. If I write it more than twice, it becomes a template, and AI helps me personalise it in seconds." },
      { type: "h2", text: "3. A weekly reset" },
      { type: "p", text: "Thirty minutes every Friday to review, plan and clear the decks. It's the highest-return half hour of my week." },
      { type: "quote", text: "Systems aren't boring. They're what make freedom possible." },
    ],
  },
  {
    slug: "staying-human-in-a-fast-world",
    title: "Staying human in a world that keeps speeding up",
    excerpt:
      "New tools launch every day. Here's how I keep my energy, my curiosity and my sense of self while everything moves fast.",
    category: "life",
    publishedAt: "2026-09-30",
    readingMinutes: 4,
    featured: true,
    body: [
      { type: "p", text: "Some weeks it feels like the whole world changed overnight. I love that energy, but I've learned it can quietly drain you if you let it." },
      { type: "h2", text: "Choose your inputs" },
      { type: "p", text: "I don't follow every launch. I follow a handful of people I trust and give myself permission to miss the rest." },
      { type: "h2", text: "Protect the offline moments" },
      { type: "p", text: "Walks, meals with family, a good book. These are where my best ideas actually show up." },
      { type: "quote", text: "Technology should make life bigger, not busier." },
      { type: "p", text: "Be curious, be kind to yourself, and remember the most important thing in any room is still the people in it." },
    ],
  },
  {
    slug: "prompting-is-just-clear-communication",
    title: "Prompting is just clear communication (and you're already good at it)",
    excerpt:
      "Forget magic formulas. If you can brief a colleague, you can write a great prompt. Here's my simple framework.",
    category: "ai",
    publishedAt: "2026-09-12",
    readingMinutes: 5,
    body: [
      { type: "p", text: "There's a lot of noise about “secret prompts”. The truth is much simpler: good prompts look a lot like a good brief to a smart new teammate." },
      { type: "h2", text: "My R-G-C framework" },
      { type: "list", items: ["Role: who should the AI act as?", "Goal: what does a great result look like?", "Context: what does it need to know about you, your audience and your constraints?"] },
      { type: "p", text: "Add an example of what you like, and you'll be surprised how quickly the quality jumps." },
    ],
  },
  {
    slug: "the-question-that-changed-my-business",
    title: "The two-word question that changed how I run my business",
    excerpt:
      "“Why not?” sounds simple. Asking it on purpose opened doors I didn't know were there.",
    category: "business",
    publishedAt: "2026-08-27",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Most of us are trained to ask “why?” before trying something new. It's a useful question, but it can also become a polite way of saying no." },
      { type: "h2", text: "Flip the default" },
      { type: "p", text: "When I started asking “why not?” instead, I said yes to experiments I would have talked myself out of. Not all of them worked, but the ones that did changed everything." },
      { type: "quote", text: "Curiosity is a business strategy." },
    ],
  },
  {
    slug: "small-wins-big-confidence",
    title: "Small wins, big confidence: learning anything new as an adult",
    excerpt:
      "Feeling like a beginner is uncomfortable. Here's how I make it fun, and how you can too.",
    category: "life",
    publishedAt: "2026-08-10",
    readingMinutes: 3,
    body: [
      { type: "p", text: "Learning something new as an adult can feel awkward. We're used to being good at things. But being a beginner is where all the growth happens." },
      { type: "h2", text: "Celebrate the tiny steps" },
      { type: "p", text: "I keep a “wins” note on my phone. Every small thing I figure out goes in. On tough days, reading it back is the best confidence boost there is." },
    ],
  },
];
