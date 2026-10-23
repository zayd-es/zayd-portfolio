"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const spring = { stiffness: 180, damping: 18, mass: 0.5 };

/** Tilts its content in 3D toward the pointer, with a soft glare (fine pointers only). */
export function Tilt({
  children,
  max = 8,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glare = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / 0.18), transparent 55%)`,
  );
  const active = fine && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("[perspective:1200px]", className)} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative"
      >
        {children}
        {active && (
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}
