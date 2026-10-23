import { useLocale, useTranslations } from "next-intl";
import { NotFoundView } from "@/components/layout/not-found-view";
import { PillLink } from "@/components/ui/pill-link";
import type { Locale } from "@/i18n/routing";
import { localePath } from "@/lib/site";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale() as Locale;

  return (
    <NotFoundView
      title={t("title")}
      body={t("body")}
      action={<PillLink href={localePath(locale)}>{t("home")}</PillLink>}
    />
  );
}
