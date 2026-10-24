"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { TouchHover } from "@/components/motion/touch-hover";
import { IntroProvider } from "./intro-provider";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      // The theme script only matters in the server HTML. When the layout re-renders
      // in the browser (e.g. after switching language) React warns about client-rendered
      // scripts unless they are data blocks, so mark it as one there (it never runs anyway).
      scriptProps={{ type: typeof window === "undefined" ? "text/javascript" : "application/json" }}
    >
      {/* Skips transform/layout animations for visitors who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">
        <IntroProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <TouchHover />
        </IntroProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
