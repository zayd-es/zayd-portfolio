"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up from zero the first time it scrolls into view. */
export function Counter({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {/* Static value for crawlers and no-JS; replaced by the live count. */}
      <span className="sr-only">{`${to.toFixed(decimals)}${suffix}`}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
