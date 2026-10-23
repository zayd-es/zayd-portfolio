import type { Metadata, Viewport } from "next";
import { Cairo, Instrument_Serif, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Cursor } from "@/components/motion/cursor";
import { Preloader } from "@/components/motion/preloader";
import { Providers } from "@/components/providers/providers";
import { profile } from "@/data/profile";
import { getDirection, routing, type Locale } from "@/i18n/routing";
import { languageAlternates, localePath, siteUrl } from "@/lib/site";
import "../globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Only downloaded when Arabic glyphs are on screen.
const arabic = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_MA",
  es: "es_ES",
  de: "de_DE",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s — ${profile.name}` },
    description: t("description"),
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    alternates: {
      canonical: localePath(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: t("title"),
      description: t("description"),
      url: localePath(locale),
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: {
      card: "summary_large_image",
      creator: "@m4be_zayd",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      data-intro="running"
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>{"[data-preloader]{display:none!important}html{overflow:auto!important}"}</style>
        </noscript>
        <NextIntlClientProvider>
          <Providers>
            <a
              href="#content"
              className="fixed top-3 start-3 z-[120] -translate-y-20 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-transform focus:translate-y-0"
            >
              {t("skip")}
            </a>
            <Preloader />
            <Header />
            <main id="content">{children}</main>
            <Cursor />
          </Providers>
        </NextIntlClientProvider>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
