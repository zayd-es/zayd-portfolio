"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

/**
 * Switches theme with a circular reveal from the click point (View Transitions
 * API), falling back to a short colour fade.
 */
export function ThemeToggle() {
  const t = useTranslations("theme");
  const { setTheme } = useTheme();

  const toggle = async (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      root.classList.add("theme-fade");
      apply();
      window.setTimeout(() => root.classList.remove("theme-fade"), 400);
      return;
    }

    const { clientX: x, clientY: y } = e;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.classList.add("theme-vt");
    const transition = document.startViewTransition(apply);
    try {
      await transition.ready;
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
      await transition.finished;
    } finally {
      root.classList.remove("theme-vt");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
    >
      <span className="sr-only hidden dark:inline">{t("toLight")}</span>
      <span className="sr-only dark:hidden">{t("toDark")}</span>
      <Sun aria-hidden className="hidden size-[18px] transition-transform duration-500 group-hover:rotate-90 dark:block" />
      <Moon aria-hidden className="size-[18px] transition-transform duration-500 group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}
