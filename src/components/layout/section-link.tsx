"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { SectionId } from "@/data/profile";

type Props = Omit<ComponentProps<"a">, "href"> & { section: SectionId | "home" };

/**
 * Links to a home-page section: a plain hash on the home page (so Lenis can
 * smooth-scroll to it), a localized `/#section` link from any other page.
 */
export function SectionLink({ section, ...props }: Props) {
  const onHome = usePathname() === "/";
  const hash = section === "home" ? "#home" : `#${section}`;

  if (onHome) return <a href={hash} {...props} />;
  return <Link href={`/${hash}`} {...props} />;
}
