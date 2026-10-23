import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Public path for a route in a given locale (default locale has no prefix). */
export function localePath(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/** hreflang map for a route, including x-default. */
export function languageAlternates(path = "/") {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localePath(locale, path);
  }
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return languages;
}
