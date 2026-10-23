import { CodeXml, Server, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Skill, SkillGroupId } from "@/data/skills";

const icons: Record<SkillGroupId, LucideIcon> = {
  frontend: CodeXml,
  backend: Server,
  ai: Sparkles,
  tools: Wrench,
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
  const Icon = icons[id];

  return (
    <article className="group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-bg-elevated p-7 transition-colors duration-500 hover:border-accent/40 md:p-9 lg:motion-safe:h-full lg:motion-safe:min-h-0">
      <div
        aria-hidden
        className="absolute -end-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_70%)] transition-transform duration-1000 ease-out-expo group-hover:scale-150"
      />

      <div className="flex items-start justify-between">
        <span className="font-display text-3xl text-accent italic">0{index + 1}</span>
        <span className="grid size-14 place-items-center rounded-full border border-line transition-[background-color,color,rotate] duration-500 group-hover:rotate-[-12deg] group-hover:bg-accent group-hover:text-on-accent">
          <Icon aria-hidden className="size-6" />
        </span>
      </div>

      <div>
        <h3 className="font-display text-5xl leading-none md:text-6xl">{t(`groups.${id}.title`)}</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-pretty text-muted">{t(`groups.${id}.description`)}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
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
