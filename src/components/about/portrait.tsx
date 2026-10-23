"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import zayd from "@/assets/zayd.jpg";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** Photo revealed by a rising curtain, with a slow inner parallax. */
export function Portrait({ alt, className }: { alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-10%", "10%"]);
  // Observe the unclipped wrapper: the figure itself has no visible area until revealed.
  const revealed = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.figure
        className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg-elevated shadow-2xl shadow-black/20"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={revealed ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
          <Image
            src={zayd}
            alt={alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-cover object-[50%_30%] grayscale-[35%] transition-[filter,scale] duration-1000 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          />
        </motion.div>
        {/* Warm ember tint */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(18_14_12/0.55),transparent_45%),radial-gradient(circle_at_80%_10%,rgb(255_90_31/0.25),transparent_55%)]"
        />
      </motion.figure>

      <RotatingBadge
        text={`${profile.name} • Frontend Dev • `}
        className="absolute -bottom-12 end-4 rounded-full border border-line bg-bg text-fg md:-end-10"
      />
    </div>
  );
}
