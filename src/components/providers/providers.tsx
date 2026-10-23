"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { IntroProvider } from "./intro-provider";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Skips transform/layout animations for visitors who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">
        <IntroProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </IntroProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
