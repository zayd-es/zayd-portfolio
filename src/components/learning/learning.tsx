"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/section-label";
import { getDirection, type Locale } from "@/i18n/routing";
import { isolateLatin } from "@/lib/bidi";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
};

const current = ["algorithms", "typescript", "english"] as const;
const next = ["python", "spanish"] as const;

export function Learning() {
  const t = useTranslations("learning");
  const rtl = getDirection(useLocale() as Locale) === "rtl";

  return (
    <section id="learning" className="scroll-mt-20 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionLabel index="05">{t("label")}</SectionLabel>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 1, ease }}
            className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-tight"
          >
            {t.rich("title", { em: (chunks) => <em className="text-accent">{chunks}</em> })}
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-muted"
          >
            {isolateLatin(t("intro"), rtl)}
          </motion.p>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:pt-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.1, ease }}>
              <p className="text-sm tracking-[0.2em] text-muted uppercase">{t("current")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.map((id) => (
                  <li
                    key={id}
                    className="flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated/60 px-4 py-2 text-sm"
                  >
                    <span aria-hidden className="pulse-dot size-1.5 shrink-0 rounded-full bg-accent" />
                    {isolateLatin(t(`items.${id}`), rtl)}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.15, ease }} className="shrink-0">
              <p className="text-sm tracking-[0.2em] text-muted uppercase">{t("next")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {next.map((id) => (
                  <li key={id} className="rounded-full border border-dashed border-accent px-4 py-2 text-sm text-accent">
                    {t(`items.${id}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="border-s-2 border-accent ps-5 font-display text-[clamp(1.625rem,2.6vw,2.25rem)] leading-snug text-pretty italic md:ps-7"
          >
            {isolateLatin(t("goal"), rtl)}
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="text-muted"
          >
            {t("closing")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
