"use client";

import { useEffect } from "react";

/**
 * Touch screens have no hover, so cards marked `data-touch` get their hover look
 * (`data-touch-hover`, wired into the `hover:` variant in globals.css) while they
 * cross the middle of the viewport. Mouse users keep the normal :hover.
 */
export function TouchHover() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          target.toggleAttribute("data-touch-hover", isIntersecting);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-touch]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    // Route changes swap the page content, so pick up new cards as they mount.
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    scan();
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
