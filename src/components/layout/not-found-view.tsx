import type { ReactNode } from "react";

/** 404 layout shared by the localized and the global not-found pages. */
export function NotFoundView({ title, body, action }: { title: string; body: string; action: ReactNode }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-32 text-center">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_60%)]"
      />
      <p dir="ltr" className="font-display text-[clamp(8rem,32vw,22rem)] leading-[0.8] text-accent italic">
        404
      </p>
      <h1 className="mt-8 font-display text-[clamp(2.25rem,5vw,4rem)] leading-none">{title}</h1>
      <p className="mt-4 max-w-md text-lg text-pretty text-muted">{body}</p>
      <div className="mt-10">{action}</div>
    </section>
  );
}
