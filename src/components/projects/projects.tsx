"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/section-label";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="scroll-mt-20 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03">{t("label")}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-tight">
              {t.rich("title", { em: (chunks) => <em className="text-accent">{chunks}</em> })}
              <sup className="ms-3 align-super font-sans text-lg tracking-normal text-muted not-italic md:text-2xl">
                ({String(projects.length).padStart(2, "0")})
              </sup>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-pretty text-muted">{t("intro")}</p>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                project.featured && "md:col-span-2",
                // Stagger the right-hand column for an editorial rhythm.
                !project.featured && i % 2 === 0 && "md:pt-32",
              )}
            >
              <ProjectCard project={project} index={i} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
