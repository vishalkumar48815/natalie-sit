import { Mic2, Presentation, Sparkles, Handshake } from "lucide-react";
import type { FaqItem, Service } from "@/types";

/** TODO(client): confirm the offers Natalie wants to promote. */
export const services: Service[] = [
  {
    id: "speaking",
    title: "Keynotes & Speaking",
    description: "Energising, jargon-free talks on AI, the future of work and leading with curiosity.",
    includes: ["Conferences & summits", "Company town halls", "Panels & fireside chats", "Podcasts & live streams"],
    icon: Mic2,
    cta: "Book Natalie to speak",
  },
  {
    id: "workshops",
    title: "AI Workshops",
    description: "Hands-on sessions that take teams from “where do I start?” to real, everyday AI habits.",
    includes: ["Team AI onboarding", "Prompting for non-tech teams", "Workflow & automation labs", "Leadership briefings"],
    icon: Presentation,
    cta: "Plan a workshop",
  },
  {
    id: "brand",
    title: "Brand Collaborations",
    description: "Thoughtful partnerships with tools and brands that genuinely help people work and live better.",
    includes: ["Sponsored videos & reels", "Product walkthroughs", "Launch campaigns", "Long-term ambassadorships"],
    icon: Sparkles,
    cta: "Pitch a collaboration",
  },
  {
    id: "advisory",
    title: "1:1 Advisory",
    description: "Focused sessions for founders and leaders who want a clear, practical AI plan for their business.",
    includes: ["AI opportunity review", "Tool stack guidance", "Rollout roadmap", "Follow-up check-ins"],
    icon: Handshake,
    cta: "Request a session",
  },
];

export const process = [
  { step: "01", title: "Say hello", text: "Share a few details through the contact form. The more context, the better." },
  { step: "02", title: "Quick call", text: "We'll chat about your audience, goals and what success looks like." },
  { step: "03", title: "Tailored plan", text: "You get a clear proposal shaped around your people, not a template." },
  { step: "04", title: "Make it happen", text: "Show up, have fun, and leave with ideas people actually use." },
];

export const faqs: FaqItem[] = [
  { question: "Do you speak in person or online?", answer: "Both. Talks and workshops can be delivered on-site or virtually, and the format is tailored to your audience size and goals." },
  { question: "Is the content suitable for non-technical audiences?", answer: "Absolutely, that's the point. Everything is explained in plain language with real examples, so anyone can follow along and take action." },
  { question: "How far in advance should I book?", answer: "Four to eight weeks ahead is ideal for keynotes and workshops, but reach out anyway. Sometimes shorter timelines work." },
  { question: "What kind of brands do you partner with?", answer: "Tools and products I would genuinely use and recommend, especially in AI, productivity, business and wellbeing." },
];
