import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & { variant?: "solid" | "outline" };

/** Magnetic pill link with a rolling label and a fill sweep on hover. */
export function PillLink({ variant = "solid", className, children, ...props }: Props) {
  return (
    <Magnetic>
      <a
        className={cn(
          "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full ps-7 pe-2 text-base font-medium isolate",
          "transition-colors duration-500 ease-out-expo",
          variant === "solid"
            ? "bg-accent text-on-accent hover:text-bg"
            : "border border-line text-fg hover:text-bg",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-full rounded-[inherit] bg-fg transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        />
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
        <span
          className={cn(
            "grid size-10 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45 rtl:-scale-x-100",
            variant === "solid" ? "bg-on-accent text-accent" : "bg-accent text-on-accent",
          )}
        >
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </a>
    </Magnetic>
  );
}
