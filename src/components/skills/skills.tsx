"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useRef } from "react";
import { Marquee } from "@/components/motion/marquee";
import { SectionLabel } from "@/components/ui/section-label";
import { skillGroups } from "@/data/skills";
import { getDirection, type Locale } from "@/i18n/routing";
import { SkillCard } from "./skill-card";

// Same condition as the `lg:motion-safe:` classes that switch the deck to a horizontal track.
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function Skills() {
  const t = useTranslations("skills");
  const rtl = getDirection(useLocale() as Locale) === "rtl";
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Pinned horizontal scroll on desktop. GSAP is only downloaded here.
  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        gsap.to(track, {
          x: () => (rtl ? distance() : -distance()),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
          },
        });
      });
      revert = () => mm.revert();

      // The pin spacer just shifted everything below this section: re-apply a
      // pending #anchor (e.g. "Back to projects") so it lands in the right place.
      const target = window.location.hash && document.querySelector(window.location.hash);
      if (target && pinRef.current?.compareDocumentPosition(target) === Node.DOCUMENT_POSITION_FOLLOWING) {
        target.scrollIntoView();
      }
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [rtl]);

  const words = skillGroups.flatMap((g) => g.skills.map((s) => ("name" in s ? s.name : t(`items.${s.key}`))));
  const half = Math.ceil(words.length / 2);

  return (
    <section id="skills" className="relative scroll-mt-20 overflow-x-clip">
      <div
        ref={pinRef}
        className="flex flex-col px-4 py-28 md:px-8 md:py-36 lg:motion-safe:h-svh lg:motion-safe:pt-28 lg:motion-safe:pb-10"
      >
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">{t("label")}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-tight">
              {t.rich("title", { em: (chunks) => <em className="text-accent">{chunks}</em> })}
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-pretty text-muted">{t("intro")}</p>
        </div>

        <div className="mx-auto mt-8 hidden h-px w-full max-w-[1600px] bg-line lg:motion-safe:block">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent rtl:origin-right" />
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1600px] lg:motion-safe:mt-8 lg:motion-safe:min-h-0 lg:motion-safe:flex-1">
          <div
            ref={trackRef}
            className="grid gap-4 md:grid-cols-2 lg:motion-safe:flex lg:motion-safe:h-full lg:motion-safe:gap-6 lg:motion-safe:overflow-visible"
          >
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:motion-safe:w-[min(42vw,620px)] lg:motion-safe:shrink-0"
              >
                <SkillCard id={group.id} index={i} skills={group.skills} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 border-y border-line py-8 md:py-10">
        <Marquee speed={1.6}>
          {words.slice(0, half).map((w) => (
            <Fragment key={w}>
              <span className="px-6 font-display text-6xl whitespace-nowrap italic md:text-8xl">{w}</span>
              <span className="self-center text-3xl text-accent">✦</span>
            </Fragment>
          ))}
        </Marquee>
        <Marquee speed={-1.6}>
          {words.slice(half).map((w) => (
            <Fragment key={w}>
              <span className="px-6 font-display text-6xl whitespace-nowrap text-transparent [-webkit-text-stroke:1px_var(--fg)] md:text-8xl">
                {w}
              </span>
              <span className="self-center text-3xl text-accent">✦</span>
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
