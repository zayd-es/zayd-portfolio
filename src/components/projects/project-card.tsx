"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tilt } from "@/components/motion/tilt";
import type { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./project-cover";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const featured = project.featured;

  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      data-cursor-label={t("view")}
      className="group block rounded-[1.75rem]"
    >
      <Tilt max={featured ? 4 : 7} className="rounded-[1.75rem]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-2xl shadow-black/25">
          <ProjectCover
            project={project}
            sizes={featured ? "(min-width: 1024px) 92vw, 100vw" : "(min-width: 768px) 46vw, 100vw"}
            className={featured ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[16/10]"}
            imageClassName="transition-[scale] duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
          />

          {/* Hover preview: stack slides up over the cover */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 flex-wrap gap-2 bg-gradient-to-t from-[#120e0c]/85 to-transparent p-5 pt-16 opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-7">
            {project.stack.slice(0, featured ? 8 : 4).map((s) => (
              <span key={s} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-[#f5ede3] backdrop-blur-md">
                {s}
              </span>
            ))}
          </div>

          {featured && (
            <span className="absolute end-5 bottom-5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-[#120e0c] transition-opacity duration-300 group-hover:opacity-0 md:end-7 md:bottom-7">
              {t("featured")}
            </span>
          )}
        </div>
      </Tilt>

      <div className="mt-5 flex items-start justify-between gap-4 md:mt-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">
            <span className="font-display text-sm tracking-normal text-accent italic normal-case">0{index + 1}</span>
            <span className="mx-2">—</span>
            {t(`items.${project.slug}.category`)}
          </p>
          <h3 className={cn("mt-2 font-display leading-none", featured ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl")}>
            {project.title}
          </h3>
        </div>
        <span className="mt-1 grid size-12 shrink-0 place-items-center rounded-full border border-line transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-accent group-hover:text-[#120e0c] rtl:-scale-x-100">
          <ArrowUpRight aria-hidden className="size-5" />
        </span>
      </div>
    </Link>
  );
}
