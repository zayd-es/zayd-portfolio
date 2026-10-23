import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/hero";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <Hero />;
}
