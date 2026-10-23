"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** Keeps `v` inside [min, max) so the duplicated track loops seamlessly. */
const wrap = (min: number, max: number, v: number) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

/**
 * Infinite horizontal loop. Drifts at `speed` (% of one copy per second) and
 * accelerates / flips direction with the page's scroll velocity.
 */
export function Marquee({
  children,
  speed = 2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);
  const ref = useRef<HTMLDivElement>(null);
  // No per-frame work while the band is off screen.
  const inView = useInView(ref);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const step = direction.current * speed * (delta / 1000);
    base.set(base.get() - step - step * Math.abs(b));
  });

  return (
    <div ref={ref} aria-hidden dir="ltr" className={cn("overflow-x-clip", className)}>
      <motion.div style={{ x }} className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
