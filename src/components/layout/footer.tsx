import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocalTime } from "@/components/hero/local-time";
import { profile, sections } from "@/data/profile";
import { BackToTop, Wordmark } from "./footer-client";
import { SectionLink } from "./section-link";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line px-4 pt-20 pb-6 md:px-8 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            {t.rich("cta", { em: (chunks) => <em className="text-accent">{chunks}</em> })}
          </p>
          <SectionLink
            section="contact"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-line py-2 ps-6 pe-2 text-lg transition-colors hover:border-accent md:self-auto"
          >
            {t("ctaLink")}
            <span className="grid size-11 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-500 ease-out-expo group-hover:rotate-45 rtl:-scale-x-100">
              <ArrowUpRight aria-hidden className="size-5" />
            </span>
          </SectionLink>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label={t("navTitle")}>
            <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{t("navTitle")}</h2>
            <ul className="mt-5 space-y-2.5">
              {sections.map((id) => (
                <li key={id}>
                  <SectionLink section={id} className="text-lg transition-colors hover:text-accent">
                    {nav(id)}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{t("socialTitle")}</h2>
            <ul className="mt-5 space-y-2.5">
              {profile.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-lg transition-colors hover:text-accent"
                  >
                    {s.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:-scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{t("contactTitle")}</h2>
            <a
              href={`mailto:${profile.email}`}
              dir="ltr"
              className="mt-5 inline-block text-lg break-all transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <p className="mt-2.5 text-muted">{t("location")}</p>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{t("timeTitle")}</h2>
            <p className="mt-5 font-display text-4xl">
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Wordmark />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-6 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {/* Isolated so RTL locales keep "© year name" in order. */}
            <span dir="ltr">
              © {year} {profile.name}.
            </span>{" "}
            {t("rights")}
          </p>
          <BackToTop label={t("backToTop")} />
        </div>
      </div>
    </footer>
  );
}
