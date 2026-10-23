"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import chromeStill from "@/assets/hero-chrome.webp";
import { useIntro } from "@/components/providers/intro-provider";
import { useInteracted } from "@/hooks/use-interacted";
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
 * Gold liquid-chrome blob. Everyone first gets a still render of the scene;
 * desktop mouse users then get the live 3D version cross-faded over it (the 3D
 * chunk is only downloaded after the preloader and the first interaction, so
 * it never competes with first paint). Touch devices,
 * small screens, reduced motion and browsers without WebGL keep the still.
 */
export function HeroVisual({ className }: { className?: string }) {
  const { done } = useIntro();
  const fine = useFinePointer();
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const gl = useSyncExternalStore(noop, supportsWebGL, () => false);
  const interacted = useInteracted();
  const use3D = done && interacted && fine && wide && !reduced && gl;

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
      <Image
        src={chromeStill}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 768px) 44vw, 88vw"
        className={cn("object-contain transition-opacity duration-1000", showCanvas && "opacity-0")}
      />
      {use3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            showCanvas ? "opacity-100" : "opacity-0",
          )}
        >
          <BlobScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
