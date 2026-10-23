"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** `false` during SSR and hydration, `true` afterwards. */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
