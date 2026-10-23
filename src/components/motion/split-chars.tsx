"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const char: Variants = {
  hidden: { y: "110%", rotate: 8, opacity: 0 },
  show: (delay: number) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

type Props = {
  text: string;
  play: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
};

/**
 * Splits a Latin word into masked characters that rise in sequence.
 * Decorative only: pair it with an accessible label on the parent.
 */
export function SplitChars({ text, play, delay = 0, stagger = 0.045, className }: Props) {
  return (
    <span aria-hidden className={cn("inline-flex", className)}>
      {Array.from(text).map((c, i) => (
        <span key={i} className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block origin-bottom-left will-change-transform"
            variants={char}
            initial="hidden"
            animate={play ? "show" : "hidden"}
            custom={delay + i * stagger}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
