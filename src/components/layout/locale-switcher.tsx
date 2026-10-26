"use client";

import { Check, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    itemsRef.current[routing.locales.indexOf(current)]?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, current]);

  const select = (locale: Locale) => {
    setOpen(false);
    buttonRef.current?.focus();
    if (locale === current) return;
    startTransition(() => router.replace(pathname, { locale, scroll: false }));
  };

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = itemsRef.current.filter(Boolean) as HTMLButtonElement[];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus();
    if (e.key === "ArrowDown") focusAt(index + 1);
    else if (e.key === "ArrowUp") focusAt(index - 1);
    else if (e.key === "Home") focusAt(0);
    else if (e.key === "End") focusAt(items.length - 1);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") buttonRef.current?.focus();
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium uppercase transition-colors hover:border-accent hover:text-accent",
          pending && "opacity-60",
        )}
      >
        <Globe aria-hidden className="size-4" />
        {current}
        <span className="sr-only normal-case">, {t("change", { language: localeNames[current] })}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t("label")}
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute end-0 top-[calc(100%+0.5rem)] w-48 origin-top-right overflow-hidden rounded-2xl border border-line bg-bg-elevated/95 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl rtl:origin-top-left"
          >
            {routing.locales.map((locale, i) => (
              <button
                key={locale}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={locale === current}
                lang={locale}
                dir={locale === "ar" ? "rtl" : "ltr"}
                onClick={() => select(locale)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-start text-sm transition-colors outline-none hover:bg-accent-soft focus-visible:bg-accent-soft"
              >
                <span>{localeNames[locale]}</span>
                {locale === current && <Check aria-hidden className="size-4 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
