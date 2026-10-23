"use client";

import { useLocale } from "next-intl";
import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const subscribe = (onTick: () => void) => {
  const id = window.setInterval(onTick, 10_000);
  return () => window.clearInterval(id);
};

/** Live clock in Tetouan's time zone (rendered client-side only). */
export function LocalTime() {
  const locale = useLocale();
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timeZone,
      }).format(new Date()),
    () => "--:--",
  );

  return (
    <time dir="ltr" className="tabular-nums" suppressHydrationWarning>
      {time}
    </time>
  );
}
