"use client";

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
      <IntroProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </IntroProvider>
    </ThemeProvider>
  );
}
