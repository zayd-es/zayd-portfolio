"use client";

import { useSyncExternalStore } from "react";

/** Reactive media query. Returns `false` on the server and during hydration. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** Mouse/trackpad users: enables cursor effects, magnetism and heavy 3D. */
export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
