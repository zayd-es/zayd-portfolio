import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Hero } from "@/components/hero/hero";
import { PageTransition } from "@/components/layout/page-transition";
import { Projects } from "@/components/projects/projects";
import { Services } from "@/components/services/services";
import { Skills } from "@/components/skills/skills";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  // Each section is its own Suspense boundary so React hydrates them in
  // separate tasks (yielding in between) instead of one long blocking task.
  // Nothing suspends on the server, so the HTML is complete either way.
  return (
    <PageTransition>
      <Hero />
      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <Skills />
      </Suspense>
      <Suspense>
        <Projects />
      </Suspense>
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
    </PageTransition>
  );
}
