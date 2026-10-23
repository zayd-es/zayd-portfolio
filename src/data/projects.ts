import type { StaticImageData } from "next/image";
import adminDashboard from "@/assets/projects/admin-dashboard.jpg";
import aiChatbot from "@/assets/projects/ai-chatbot.jpg";
import elchapoStore from "@/assets/projects/elchapo-store.jpg";
import zaydHotels from "@/assets/projects/zayd-hotels.jpg";

/**
 * Projects shown on the home page and at /projects/[slug].
 * Translated copy lives in messages/*.json under `projects.items.<slug>`.
 * To add a project: add an entry here (cover in src/assets/projects) and its
 * texts in every messages file.
 */
export type Project = {
  slug: string;
  title: string;
  cover: StaticImageData;
  stack: readonly string[];
  links: { live?: string; github?: string };
  featured?: boolean;
  /** Full case study not written yet: the detail page shows a short note. */
  draft?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "zayd-hotels",
    title: "Zayd Hotels",
    cover: zaydHotels,
    featured: true,
    stack: [
      "React",
      "Zustand",
      "Tailwind CSS",
      "Express",
      "PostgreSQL (Neon)",
      "Prisma",
      "Clerk",
      "Stripe",
      "Cloudinary",
      "Resend",
    ],
    links: {
      live: "https://pern-booking-app.vercel.app",
      github: "https://github.com/zayd-es/pern-booking-app",
    },
  },
  {
    slug: "ai-chatbot",
    title: "AI ChatBot",
    cover: aiChatbot,
    stack: ["React", "Tailwind CSS", "Ngrok"],
    links: { live: "https://ai-chatbot-one-blue-38.vercel.app" },
  },
  {
    slug: "elchapo-store",
    title: "ElChapo Store",
    cover: elchapoStore,
    draft: true,
    stack: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    links: { live: "https://elchapo44.ma" },
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    cover: adminDashboard,
    draft: true,
    stack: ["Next.js", "React", "shadcn/ui", "Tailwind CSS"],
    links: { live: "https://next16-shadcn-dashboard.vercel.app" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** The project after `slug`, looping back to the first one. */
export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
