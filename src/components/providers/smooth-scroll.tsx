"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: !reduced,
        anchors: { offset: -80, immediate: reduced },
      }}
    >
      {children}
    </ReactLenis>
  );
}
