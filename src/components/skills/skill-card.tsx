import { CodeXml, Server, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Skill, SkillGroupId } from "@/data/skills";
import { getDirection, type Locale } from "@/i18n/routing";
import { isolateLatin } from "@/lib/bidi";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroupId, LucideIcon> = {
  frontend: CodeXml,
  backend: Server,
  ai: Sparkles,
  tools: Wrench,
};

// Titles scale with the viewport; languages with long words get a smaller ramp,
// and Arabic needs a smaller size with room for its taller glyphs.
const titleSize: Record<Locale, string> = {
  en: "text-[clamp(2.25rem,min(1.6rem+2.4vw,7vh),3.75rem)] leading-[0.95]",
  fr: "text-[clamp(2rem,min(1.5rem+1.9vw,6vh),3.25rem)] leading-[0.95]",
  es: "text-[clamp(2rem,min(1.5rem+1.9vw,6vh),3.25rem)] leading-[0.95]",
  de: "text-[clamp(2rem,min(1.5rem+1.9vw,6vh),3.25rem)] leading-[0.95]",
  ar: "text-[clamp(1.75rem,min(1.4rem+1.6vw,5vh),2.75rem)] leading-[1.35]",
};

export function SkillCard({
  id,
  index,
  skills,
}: {
  id: SkillGroupId;
  index: number;
  skills: readonly Skill[];
}) {
  const t = useTranslations("skills");
  const locale = useLocale() as Locale;
  const rtl = getDirection(locale) === "rtl";
  const Icon = icons[id];

  return (
    <article
      data-touch
      className="group relative isolate flex h-full min-h-[26rem] flex-col justify-between gap-10 rounded-[2rem] border border-line bg-bg-elevated p-7 transition-colors duration-500 hover:border-accent/40 md:p-9 lg:motion-safe:min-h-[min(28rem,48vh)] lg:motion-safe:gap-[3vh] lg:motion-safe:p-[clamp(1.25rem,3.5vh,2.25rem)]"
    >
      {/* Only the glow is clipped to the card, never the text. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <div className="absolute -end-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] transition-transform duration-1000 ease-out-expo group-hover:scale-150" />
      </div>

      <div className="flex items-start justify-between">
        <span className="font-display text-3xl text-accent italic">0{index + 1}</span>
        <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line transition-[background-color,color,rotate] duration-500 group-hover:rotate-[-12deg] group-hover:bg-accent group-hover:text-on-accent">
          <Icon aria-hidden className="size-6" />
        </span>
      </div>

      <div>
        <h3 className={cn("font-display break-words text-balance", titleSize[locale])}>{t(`groups.${id}.title`)}</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-pretty text-muted lg:motion-safe:mt-[1.5vh]">
          {isolateLatin(t(`groups.${id}.description`), rtl)}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2 lg:motion-safe:mt-[2.5vh]">
          {skills.map((s) => {
            const label = "name" in s ? s.name : t(`items.${s.key}`);
            return (
              <li
                key={label}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
