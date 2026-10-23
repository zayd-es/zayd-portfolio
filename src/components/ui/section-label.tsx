import { cn } from "@/lib/utils";

/** Small "(01) — About" eyebrow used at the top of each section. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 text-sm tracking-[0.2em] text-muted uppercase", className)}>
      <span className="font-display text-base tracking-normal text-accent italic normal-case">
        ({index})
      </span>
      <span aria-hidden className="h-px w-10 bg-line" />
      {children}
    </p>
  );
}
