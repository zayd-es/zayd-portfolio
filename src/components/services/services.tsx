"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { PillLink } from "@/components/ui/pill-link";
import { SectionLabel } from "@/components/ui/section-label";
import { services } from "@/data/services";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="scroll-mt-20 px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
          <SectionLabel index="04">{t("label")}</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-tight">
            {t.rich("title", { em: (chunks) => <em className="text-accent">{chunks}</em> })}
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-pretty text-muted">{t("intro")}</p>

          <div className="mt-8 flex max-w-sm items-start gap-3 rounded-2xl border border-line bg-bg-elevated/60 p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Sparkles aria-hidden className="size-4" />
            </span>
            <p>
              <span className="block font-medium">{t("ai")}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t("aiDetail")}</span>
            </p>
          </div>

          <div className="mt-8">
            <PillLink href="#contact">{t("cta")}</PillLink>
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-8">
          {services.map(({ id, icon: Icon, main }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
              className="group relative isolate overflow-hidden border-b border-line"
            >
              {/* Fill sweep on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
              />
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 px-1 py-8 transition-[padding,color] duration-700 ease-out-expo group-hover:text-[#120e0c] md:grid-cols-[4rem_1fr_minmax(0,22rem)_auto] md:items-center md:gap-x-8 md:py-10 md:group-hover:ps-6 md:group-hover:pe-4">
                <span className="font-display text-xl text-accent italic transition-colors duration-700 group-hover:text-[#120e0c] md:text-2xl">
                  0{i + 1}
                </span>

                <div>
                  <h3 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-none">{t(`items.${id}.title`)}</h3>
                  {main && (
                    <span className="mt-3 inline-block rounded-full border border-accent px-3 py-1 text-xs text-accent transition-colors duration-700 group-hover:border-[#120e0c] group-hover:text-[#120e0c]">
                      {t("main")}
                    </span>
                  )}
                </div>

                <p className="col-span-full col-start-2 leading-relaxed text-pretty text-muted transition-colors duration-700 group-hover:text-[#120e0c]/80 md:col-span-1 md:col-start-auto">
                  {t(`items.${id}.description`)}
                </p>

                <span
                  aria-hidden
                  className="relative col-start-3 row-start-1 grid size-12 place-items-center rounded-full border border-line transition-[border-color,rotate,background-color,color] duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[#120e0c] group-hover:text-accent md:col-start-auto md:row-start-auto md:size-14"
                >
                  <Icon className="size-5 transition-opacity duration-300 group-hover:opacity-0" />
                  <ArrowUpRight className="absolute size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
