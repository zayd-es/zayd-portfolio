import { Download } from "lucide-react";
import type { ComponentProps } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Compact "download CV" pill (header, mobile menu); the icon drops through on hover. */
export function CvLink({ className, children, ...props }: Omit<ComponentProps<"a">, "href" | "download">) {
  return (
    <a
      href={profile.resume}
      download={profile.resumeFile}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent",
        className,
      )}
      {...props}
    >
      <span className="relative grid size-4 place-items-center overflow-hidden">
        <Download aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-5" />
        <Download
          aria-hidden
          className="absolute size-4 -translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        />
      </span>
      {children}
    </a>
  );
}
