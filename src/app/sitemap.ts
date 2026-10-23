import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { languageAlternates, localePath, siteUrl } from "@/lib/site";

const absolute = (languages: Record<string, string>) =>
  Object.fromEntries(Object.entries(languages).map(([lang, path]) => [lang, `${siteUrl}${path}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: p.featured ? 0.8 : 0.6 })),
  ];

  return pages.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: absolute(languageAlternates(path)) },
    })),
  );
}
