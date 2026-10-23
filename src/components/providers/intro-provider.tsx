"use client";

import { createContext, use, useState, type ReactNode } from "react";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

/** Tracks whether the preloader has handed off to the page entrance. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <IntroContext value={{ done, finish: () => setDone(true) }}>
      {children}
    </IntroContext>
  );
}

export const useIntro = () => use(IntroContext);
