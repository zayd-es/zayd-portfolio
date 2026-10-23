"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Token = { word: string; em: boolean; glued: boolean };

/** Splits a message containing `<em>` tags into words, keeping punctuation glued. */
function tokenize(raw: string) {
  const tokens: Token[] = [];
  let em = false;
  let spaceBefore = true;
  for (const part of raw.split(/(<em>|<\/em>)/)) {
    if (part === "<em>" || part === "</em>") {
      em = part === "<em>";
      continue;
    }
    part.split(/\s+/).forEach((word, i) => {
      if (!word) return;
      // The first word of a chunk touches the previous one when no space separates them.
      const glued = i === 0 && !spaceBefore && !/^\s/.test(part);
      tokens.push({ word, em, glued });
    });
    if (part) spaceBefore = /\s$/.test(part);
  }
  return tokens;
}

/**
 * Paragraph whose words light up one after another as it scrolls through the
 * viewport. Words wrapped in `<em>` get the italic accent treatment.
 */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const tokens = tokenize(text);

  return (
    <p ref={ref} className={className}>
      {tokens.map((token, i) => (
        <Fragment key={i}>
          {i > 0 && !token.glued && " "}
          <Word
            token={token}
            progress={scrollYProgress}
            range={[i / tokens.length, (i + 1) / tokens.length]}
            still={reduced}
          />
        </Fragment>
      ))}
    </p>
  );
}

function Word({
  token,
  progress,
  range,
  still,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <motion.span
      style={{ opacity: still ? 1 : opacity }}
      className={cn(token.em && "font-display text-accent italic")}
    >
      {token.word}
    </motion.span>
  );
}
