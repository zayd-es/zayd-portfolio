"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CvLink } from "@/components/ui/cv-link";
import { profile, sections } from "@/data/profile";
import { useMounted } from "@/hooks/use-mounted";
import { getDirection, type Locale } from "@/i18n/routing";
import { SectionLink } from "./section-link";

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const tCv = useTranslations("cv");
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const mounted = useMounted();
  const origin = getDirection(useLocale() as Locale) === "rtl" ? "0% 0%" : "100% 0%";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={t("openMenu")}
        onClick={() => setOpen(true)}
        className="flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg lg:hidden"
      >
        {t("menu")}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={t("label")}
                className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-5 pt-5 pb-8"
                initial={{ clipPath: `circle(0% at ${origin})` }}
                animate={{ clipPath: `circle(150% at ${origin})` }}
                exit={{ clipPath: `circle(0% at ${origin})` }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t("closeMenu")}
                    className="h-11 rounded-full border border-line px-5 text-sm font-medium"
                  >
                    {t("close")}
                  </button>
                </div>

                <nav aria-label={t("label")}>
                  <ul className="space-y-1">
                    {sections.map((id, i) => (
                      <li key={id} className="overflow-hidden">
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "100%" }}
                          transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                        >
                          <SectionLink
                            section={id}
                            onClick={() => setOpen(false)}
                            className="flex items-baseline gap-4 font-display text-6xl leading-tight italic"
                          >
                            <span className="font-sans text-sm text-accent not-italic tabular-nums">
                              0{i + 1}
                            </span>
                            {t(id)}
                          </SectionLink>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="flex flex-col items-start gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  <CvLink onClick={() => setOpen(false)}>{tCv("download")}</CvLink>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    {profile.socials.map((s) => (
                      <li key={s.id}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
