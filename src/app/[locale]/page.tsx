import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about/about";
import { Hero } from "@/components/hero/hero";
import { PageTransition } from "@/components/layout/page-transition";
import { Projects } from "@/components/projects/projects";
import { Services } from "@/components/services/services";
import { Skills } from "@/components/skills/skills";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
    </PageTransition>
  );
}
