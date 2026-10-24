import { Fragment, type ReactNode } from "react";

// A run of Latin words ("Next.js", "React Native", "next-intl"), without trailing punctuation.
const LATIN_RUN = /[A-Za-z][\w+#./-]*[\w+#]?(?: [A-Za-z][\w+#./-]*[\w+#]?)*/g;

/**
 * Wraps Latin runs in <bdi dir="ltr"> so mixed Arabic/English text keeps its
 * order in RTL: without it "React وNext.js." renders as ".Next.js React و".
 * LTR text is returned untouched.
 */
export function isolateLatin(text: string, rtl: boolean): ReactNode {
  if (!rtl) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LATIN_RUN)) {
    let run = match[0];
    // Keep sentence punctuation outside the isolate.
    while (/[.\-/]$/.test(run)) run = run.slice(0, -1);
    const start = match.index;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <bdi key={start} dir="ltr">
        {run}
      </bdi>,
    );
    last = start + run.length;
  }
  if (last === 0) return text;
  parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
