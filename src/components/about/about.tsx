"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Counter } from "@/components/motion/counter";
import { RevealWords } from "@/components/motion/reveal-words";
import { PillLink } from "@/components/ui/pill-link";
import { SectionLabel } from "@/components/ui/section-label";
import { profile } from "@/data/profile";
import { Portrait } from "./portrait";

const stats = [
  { id: "years", to: 1.5, decimals: 1, suffix: "+" },
  { id: "languages", to: 5 },
  { id: "reviewed", to: 100, suffix: "%" },
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
};

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative scroll-mt-20 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="01">{t("label")}</SectionLabel>

        <RevealWords
          text={t.raw("statement")}
          className="mt-10 max-w-6xl text-[clamp(2rem,5vw,4.75rem)] leading-[1.1] font-medium tracking-tight md:mt-14"
        />

        <div className="mt-20 grid items-start gap-20 md:mt-32 lg:grid-cols-12 lg:gap-12">
          <Portrait alt={t("photoAlt")} className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" />

          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <motion.p
              {...fadeUp}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl leading-snug text-pretty md:text-3xl"
            >
              {t("fullstack")}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-line bg-bg-elevated/60 p-6 md:p-8"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-accent">
                <Sparkles aria-hidden className="size-4" />
                {t("aiTitle")}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-pretty text-muted">{t("ai")}</p>
            </motion.div>

            <motion.p
              {...fadeUp}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-relaxed text-pretty text-muted"
            >
              {t("experience")}
            </motion.p>

            <dl className="grid grid-cols-3 border-t border-line pt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.id}
                  {...fadeUp}
                  transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col-reverse gap-2 pe-4"
                >
                  <dt className="text-sm leading-snug text-muted">{t(`stats.${s.id}`)}</dt>
                  <dd className="font-display text-5xl md:text-6xl">
                    <Counter to={s.to} decimals={"decimals" in s ? s.decimals : 0} suffix={"suffix" in s ? s.suffix : ""} />
                  </dd>
                </motion.div>
              ))}
            </dl>

            {profile.resume && (
              <PillLink href={profile.resume} download variant="outline" className="self-start">
                {t("resume")}
              </PillLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
