"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocalTime } from "@/components/hero/local-time";
import { RevealWords } from "@/components/motion/reveal-words";
import { PillLink } from "@/components/ui/pill-link";
import { SectionLabel } from "@/components/ui/section-label";
import { profile } from "@/data/profile";
import { ContactForm } from "./contact-form";

export function Contact() {
  const t = useTranslations("contact");
  const tCv = useTranslations("cv");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden px-4 py-28 md:px-8 md:py-40">
      <div
        aria-hidden
        className="absolute -bottom-[40vmax] start-1/2 -z-10 size-[90vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_60%)] rtl:translate-x-1/2"
      />

      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="06">{t("label")}</SectionLabel>
        <RevealWords
          text={t.raw("title")}
          className="mt-8 max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight"
        />

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-12 lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-pretty text-muted">{t("intro")}</p>

            <div>
              <p className="text-xs tracking-[0.2em] text-muted uppercase">{t("emailLabel")}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  dir="ltr"
                  className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight break-all decoration-accent decoration-1 underline-offset-8 hover:underline"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {copied ? <Check aria-hidden className="size-4 text-accent" /> : <Copy aria-hidden className="size-4" />}
                  <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
                </button>
              </div>
              <div className="mt-6">
                <PillLink href={profile.resume} download={profile.resumeFile} variant="outline" icon="download">
                  {tCv("download")}
                </PillLink>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-muted uppercase">{t("socials")}</p>
              <ul className="mt-3 border-t border-line">
                {profile.socials.map((s) => (
                  <li key={s.id} className="border-b border-line">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-4 text-xl transition-colors hover:text-accent"
                    >
                      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                        {s.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45 rtl:-scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="pulse-dot size-2 rounded-full bg-accent" />
              {t("based")}
              <span aria-hidden>•</span>
              <LocalTime />
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
