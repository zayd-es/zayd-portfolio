"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useIntro } from "@/components/providers/intro-provider";
import { useFinePointer, useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const BlobScene = dynamic(() => import("./blob-scene"), { ssr: false });

let webgl: boolean | undefined;
function supportsWebGL() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}
const noop = () => () => {};

/**
 * Liquid-metal 3D blob on desktop mouse devices, a CSS ember blob everywhere
 * else (touch, small screens, reduced motion, no WebGL). The 3D chunk is only
 * downloaded once the preloader has finished.
 */
export function HeroVisual({ className }: { className?: string }) {
  const { done } = useIntro();
  const fine = useFinePointer();
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const gl = useSyncExternalStore(noop, supportsWebGL, () => false);
  const use3D = done && fine && wide && !reduced && gl;

  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showCanvas = use3D && ready;

  return (
    <div ref={ref} aria-hidden className={cn("relative aspect-square", className)}>
      <div
        className={cn(
          "ember-blob absolute inset-[14%] transition-opacity duration-1000",
          showCanvas && "opacity-0",
        )}
      />
      {use3D && (
        <div
          className={cn(
            "absolute inset-0 transition-[opacity,scale] duration-[1400ms] ease-out-expo",
            showCanvas ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          <BlobScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
