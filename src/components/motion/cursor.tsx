"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/use-media-query";

type Mode = { kind: "default" | "hover" | "label"; label?: string };

const INTERACTIVE = "a, button, [role='button'], summary, label, select, [data-cursor-label]";
const SIZE = 88;
const scales = { default: 0.14, hover: 0.55, label: 1 } as const;

/**
 * Custom cursor for mouse users. Grows over interactive elements and shows a
 * label over elements with `data-cursor-label` (e.g. project cards).
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  return fine && !reduced ? <CursorDot /> : null;
}

function modeFor(target: Element | null): Mode {
  const el = target?.closest<HTMLElement>(INTERACTIVE);
  const label = el?.dataset.cursorLabel;
  return label ? { kind: "label", label } : { kind: el ? "hover" : "default" };
}

/** Mode for the element under the cursor, given the dot's top-left position. */
function modeAt(left: number, top: number): Mode {
  return modeFor(document.elementFromPoint(left + SIZE / 2, top + SIZE / 2));
}

function CursorDot() {
  const [mode, setMode] = useState<Mode>({ kind: "default" });
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => setMode(modeFor(e.target as Element | null));
    // Content moves under a still mouse while scrolling, and pointerover doesn't
    // fire for that: re-check what's under the cursor once per frame.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = modeAt(x.get(), y.get());
        setMode((prev) => (prev.kind === next.kind && prev.label === next.label ? prev : next));
      });
    };
    const onLeave = () => {
      setVisible(false);
      setMode({ kind: "default" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  // A click can swap the page under the cursor: start over from what's there now.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMode(modeAt(x.get(), y.get())));
    return () => cancelAnimationFrame(frame);
  }, [pathname, x, y]);

  const isLabel = mode.kind === "label";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[110]"
      style={{ x: sx, y: sy, width: SIZE, height: SIZE }}
    >
      <motion.div
        className={
          isLabel
            ? "grid h-full w-full place-items-center rounded-full bg-accent text-on-accent"
            : "h-full w-full rounded-full bg-white mix-blend-difference"
        }
        animate={{ scale: visible ? scales[mode.kind] : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      >
        <AnimatePresence>
          {isLabel && (
            <motion.span
              key={mode.label}
              className="text-xs font-medium tracking-wide uppercase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {mode.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
