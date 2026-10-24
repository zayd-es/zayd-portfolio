import type { StaticImageData } from "next/image";
import elchapoStore from "@/assets/projects/elchapo-store.jpg";
import pvcConfort from "@/assets/projects/pvc-confort.jpg";
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
  /** Client work done as a freelancer: shows a "Freelance" badge. */
  freelance?: boolean;
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
    slug: "pvc-confort",
    title: "PVC Confort Maroc",
    cover: pvcConfort,
    freelance: true,
    stack: ["Next.js", "next-intl", "Sanity CMS", "Tailwind CSS", "Resend", "Vercel"],
    links: { live: "https://pvc-maroc-app.vercel.app" },
  },
  {
    slug: "elchapo-store",
    title: "ElChapo Store",
    cover: elchapoStore,
    freelance: true,
    draft: true,
    stack: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    links: { live: "https://elchapo44.ma" },
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
