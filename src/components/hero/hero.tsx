"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { SplitChars } from "@/components/motion/split-chars";
import { useIntro } from "@/components/providers/intro-provider";
import { PillLink } from "@/components/ui/pill-link";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-media-query";
import { getDirection, type Locale } from "@/i18n/routing";
import { isolateLatin } from "@/lib/bidi";
import { HeroVisual } from "./hero-visual";
import { LocalTime } from "./local-time";

const rise: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay, duration: 1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const t = useTranslations("hero");
  const tCv = useTranslations("cv");
  const rtl = getDirection(useLocale() as Locale) === "rtl";
  const { done } = useIntro();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const still = (v: number) => (reduced ? 0 : v);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", `${still(-30)}%`]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", `${still(35)}%`]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1 + still(0.25)]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);

  const state = done ? "show" : "hidden";

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-svh flex-col overflow-hidden px-4 pt-24 pb-6 md:px-8 md:pt-28 md:pb-8"
    >
      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30vmax] start-[10%] -z-10 size-[80vmax] rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_60%)]"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-sm"
      >
        <motion.p variants={rise} initial="hidden" animate={state} custom={0.5} className="flex items-center gap-2.5 rounded-full border border-line bg-bg/70 px-4 py-2 backdrop-blur-md">
          <span className="pulse-dot size-2 rounded-full bg-accent" />
          {t("available")}
        </motion.p>
        <motion.p variants={rise} initial="hidden" animate={state} custom={0.6} className="flex items-center gap-2 text-muted">
          <span>{t("location")}</span>
          <span aria-hidden className="text-accent">•</span>
          <span className="sr-only">{t("localTime")}</span>
          <LocalTime />
        </motion.p>
      </motion.div>

      <div className="relative flex flex-1 items-center py-10">
        <motion.div
          style={{ y: visualY, scale: visualScale }}
          className="absolute top-[24%] right-[-24%] w-[88vw] -translate-y-1/2 sm:right-[-8%] sm:w-[70vw] md:top-1/2 md:right-[4%] md:w-[44vw] md:max-w-[700px] md:-translate-y-[64%]"
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={done ? { scale: 1 } : undefined}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <HeroVisual />
          </motion.div>
        </motion.div>

        {/* The name block is laid out LTR in every language, like the visual beside it. */}
        <motion.div style={{ y: nameY }} dir="ltr" className="relative w-full">
          <motion.p variants={rise} initial="hidden" animate={state} custom={0.35} className="mb-4 flex items-center gap-3 text-sm tracking-[0.2em] text-muted uppercase md:mb-6">
            <span aria-hidden className="h-px w-10 bg-accent" />
            {t("role")}
          </motion.p>
          {/* Arabic pages give every element line-height 1.7 (globals.css): keep the letters on the h1's own. */}
          <h1
            aria-label={`${profile.name}, ${t("role")}`}
            className="font-display text-[clamp(4.5rem,21vw,17.5rem)] leading-[0.8] tracking-[-0.035em] **:leading-[inherit]"
          >
            <SplitChars text={profile.firstName} play={done} delay={0.05} className="text-cream italic" />
            <span className="block text-end">
              <SplitChars text={profile.lastName} play={done} delay={0.25} />
            </span>
          </h1>
        </motion.div>
      </div>

      <motion.div style={{ opacity: fade }} className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <motion.p variants={rise} initial="hidden" animate={state} custom={0.7} className="text-lg leading-relaxed text-pretty text-muted md:text-xl">
            {isolateLatin(t("tagline"), rtl)}
          </motion.p>
          <motion.div variants={rise} initial="hidden" animate={state} custom={0.85} className="mt-7 flex flex-wrap gap-3">
            <PillLink href="#projects">{t("ctaWork")}</PillLink>
            <PillLink href="#contact" variant="outline">
              {t("ctaContact")}
            </PillLink>
            <PillLink href={profile.resume} download={profile.resumeFile} variant="outline" icon="download">
              {tCv("download")}
            </PillLink>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          variants={rise}
          initial="hidden"
          animate={state}
          custom={1}
          className="group hidden items-center gap-4 text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg md:flex"
        >
          {t("scroll")}
          <span aria-hidden className="relative h-14 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-accent" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
