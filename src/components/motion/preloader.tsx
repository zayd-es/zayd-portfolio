"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useIntro } from "@/components/providers/intro-provider";
import { profile } from "@/data/profile";

type Phase = "count" | "exit" | "gone";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen intro: the name rises letter by letter while a counter runs,
 * then the curtain lifts and hands off to the hero entrance.
 */
export function Preloader() {
  const t = useTranslations("preloader");
  const { finish } = useIntro();
  const [phase, setPhase] = useState<Phase>("count");
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(progress, 100, {
      duration: reduced ? 0.4 : 2,
      ease: [0.65, 0, 0.35, 1],
    });
    controls.then(() => {
      setPhase("exit");
      finish();
    });
    return () => controls.stop();
  }, [progress, finish]);

  useEffect(() => {
    if (phase === "gone") document.documentElement.removeAttribute("data-intro");
  }, [phase]);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <motion.div
      data-preloader
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-4 py-6 text-fg md:px-8"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={exiting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 1, ease, delay: 0.25 }}
      onAnimationComplete={() => exiting && setPhase("gone")}
    >
      <div className="flex justify-between text-xs tracking-[0.2em] text-muted uppercase">
        <span>{t("loading")}</span>
        <span dir="ltr">Portfolio ©{new Date().getFullYear()}</span>
      </div>

      <p
        dir="ltr"
        className="flex flex-wrap justify-center font-display text-[clamp(3rem,11vw,10rem)] leading-none italic"
      >
        {Array.from(profile.name).map((c, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
            <motion.span
              className="inline-block"
              initial={{ y: "105%", opacity: 0 }}
              animate={
                exiting
                  ? { y: "-105%", opacity: 0, transition: { duration: 0.6, delay: i * 0.015, ease } }
                  : { y: "0%", opacity: 1, transition: { duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] } }
              }
            >
              {c === " " ? " " : c}
            </motion.span>
          </span>
        ))}
      </p>

      <div className="flex items-end justify-between gap-6">
        <div className="relative h-px flex-1 overflow-hidden bg-line">
          <motion.div
            className="absolute inset-0 origin-left bg-accent rtl:origin-right"
            style={{ scaleX: bar }}
          />
        </div>
        <motion.span className="font-display text-5xl tabular-nums md:text-7xl">{counter}</motion.span>
      </div>
    </motion.div>
  );
}
