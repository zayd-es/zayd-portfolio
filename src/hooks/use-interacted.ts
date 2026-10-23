"use client";

import { useSyncExternalStore } from "react";

const EVENTS = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

let interacted = false;
const listeners = new Set<() => void>();

function markInteracted() {
  if (interacted) return;
  interacted = true;
  EVENTS.forEach((e) => window.removeEventListener(e, markInteracted));
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  if (!interacted && listeners.size === 0) {
    EVENTS.forEach((e) => window.addEventListener(e, markInteracted, { passive: true, once: true }));
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * `true` once the visitor has moved, scrolled, touched or typed (for the rest
 * of the session). Used to load heavy extras (3D, GSAP) after first paint
 * instead of competing with it.
 */
export function useInteracted() {
  return useSyncExternalStore(subscribe, () => interacted, () => false);
}
