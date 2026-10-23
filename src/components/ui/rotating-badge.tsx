import { useId } from "react";
import { cn } from "@/lib/utils";

/** Circular text that slowly spins around a center mark (decorative). */
export function RotatingBadge({ text, className }: { text: string; className?: string }) {
  const id = useId();

  return (
    <div aria-hidden className={cn("relative grid size-32 place-items-center md:size-40", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-[spin_22s_linear_infinite]">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text direction="ltr" className="fill-current text-[17px] tracking-[0.18em] uppercase">
          <textPath href={`#${id}`} textLength="485">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="font-display text-4xl text-accent italic">Z</span>
    </div>
  );
}
