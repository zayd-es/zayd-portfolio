import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/layout/page-transition";
import { ProjectCover } from "@/components/projects/project-cover";
import { PillLink } from "@/components/ui/pill-link";
import { getNextProject, getProject, projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { languageAlternates, localePath } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  const path = `/projects/${slug}`;
  const description = t(`items.${slug}.summary`);

  return {
    title: project.title,
    description,
    alternates: { canonical: localePath(locale as Locale, path), languages: languageAlternates(path) },
    openGraph: {
      title: project.title,
      description,
      url: localePath(locale as Locale, path),
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const highlights = t.raw(`items.${slug}.highlights`) as string[];
  const next = getNextProject(slug);

  return (
    <PageTransition>
      <article className="px-4 pt-28 pb-24 md:px-8 md:pt-36">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/#projects"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1"
            />
            {t("back")}
          </Link>

          <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm tracking-[0.2em] text-accent uppercase">{t(`items.${slug}.category`)}</p>
                {project.freelance && (
                  <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
                    {t("freelance")}
                  </span>
                )}
              </div>
              <h1 className="mt-4 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-tight">
                {project.title}
              </h1>
            </div>
            <p className="text-xl leading-relaxed text-pretty text-muted lg:col-span-4">
              {t(`items.${slug}.summary`)}
            </p>
          </header>

          <ProjectCover
            project={project}
            eager
            alt={t("coverAlt", { title: project.title })}
            sizes="(min-width: 1600px) 1600px, 100vw"
            className="mt-12 aspect-[16/10] rounded-[2rem] border border-line shadow-2xl shadow-black/25 md:mt-16"
          />

          <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
            <dl className="space-y-10 self-start lg:sticky lg:top-28 lg:col-span-4">
              <div>
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">{t("role")}</dt>
                <dd className="mt-3 text-lg">{t(`items.${slug}.role`)}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">{t("stack")}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <PillLink href={project.links.live} target="_blank" rel="noreferrer">
                    {t("live")}
                  </PillLink>
                )}
                {project.links.github && (
                  <PillLink href={project.links.github} target="_blank" rel="noreferrer" variant="outline">
                    {t("code")}
                  </PillLink>
                )}
              </div>
            </dl>

            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{t("overview")}</h2>
              <p className="mt-4 text-2xl leading-snug text-pretty md:text-3xl">{t(`items.${slug}.description`)}</p>

              {highlights.length > 0 && (
                <>
                  <h2 className="mt-16 text-xs tracking-[0.2em] text-muted uppercase">{t("highlights")}</h2>
                  <ol className="mt-4">
                    {highlights.map((h, i) => (
                      <li key={h} className="flex gap-6 border-t border-line py-5 text-lg last:border-b">
                        <span className="font-display text-xl text-accent italic">0{i + 1}</span>
                        {h}
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {project.draft && (
                <p className="mt-12 rounded-2xl border border-dashed border-line p-6 text-muted">{t("comingSoon")}</p>
              )}
            </div>
          </div>

          <Link
            href={`/projects/${next.slug}`}
            transitionTypes={["nav-forward"]}
            data-cursor-label={t("view")}
            className="group mt-28 grid items-end gap-8 border-t border-line pt-12 md:mt-40 md:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="text-xs tracking-[0.2em] text-muted uppercase">{t("next")}</p>
              <p className="mt-4 flex items-center gap-4 font-display text-[clamp(3rem,9vw,8rem)] leading-none transition-colors duration-500 group-hover:text-accent">
                {next.title}
                <ArrowUpRight
                  aria-hidden
                  className="size-[0.5em] transition-transform duration-500 ease-out-expo group-hover:rotate-45 rtl:-scale-x-100"
                />
              </p>
            </div>
            <ProjectCover
              project={next}
              sizes="320px"
              className="hidden aspect-[4/3] w-80 rounded-2xl border border-line md:block"
              imageClassName="transition-[scale] duration-1000 ease-out-expo group-hover:scale-105"
            />
          </Link>
        </div>
      </article>
    </PageTransition>
  );
}
