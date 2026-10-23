"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitChars } from "@/components/motion/split-chars";
import { profile } from "@/data/profile";

/** Giant name that rises letter by letter when the bottom of the page is reached. */
export function Wordmark() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <p
      ref={ref}
      dir="ltr"
      // Decorative: the name is also in the copyright line.
      aria-hidden
      className="flex justify-between gap-[0.15em] font-display text-[17.6vw] leading-[0.8] tracking-[-0.03em] text-accent select-none"
    >
      <SplitChars text={profile.firstName} play={inView} className="italic" />
      <SplitChars text={profile.lastName} play={inView} delay={0.15} />
    </p>
  );
}

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Magnetic>
      <button
        type="button"
        onClick={toTop}
        className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-fg"
      >
        {label}
        <span className="grid size-11 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
          <ArrowUp aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
        </span>
      </button>
    </Magnetic>
  );
}
