import { ViewTransition, type ReactNode } from "react";

const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/**
 * Slides page content left/right on links tagged with `nav-forward` /
 * `nav-back`. Goes in each page (layouts persist, so they never enter/exit).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
