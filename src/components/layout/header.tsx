"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useIntro } from "@/components/providers/intro-provider";
import { sections } from "@/data/profile";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { SectionLink } from "./section-link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("nav");
  const { done } = useIntro();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 24);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      // Stays put while page content slides during navigations.
      style={{ viewTransitionName: "site-header" }}
      initial={{ y: "-120%" }}
      animate={{ y: done && !hidden ? "0%" : "-120%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: done && !scrolled ? 0.6 : 0 }}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1600px] items-center justify-between gap-4 rounded-full border py-2 ps-5 pe-2 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent",
        )}
      >
        <SectionLink
          section="home"
          dir="ltr"
          className="font-display text-2xl leading-none italic"
        >
          {/* The accessible name keeps the visible "Zayd" so voice control can target it. */}
          Zayd<span className="text-accent">.</span>
          <span className="sr-only"> {t("home")}</span>
        </SectionLink>

        <nav aria-label={t("label")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((id) => (
              <li key={id}>
                <SectionLink
                  section={id}
                  className="group relative block px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {t(id)}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-1 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100 rtl:origin-left rtl:group-hover:origin-right"
                  />
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
