"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useId, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { Magnetic } from "@/components/motion/magnetic";
import {
  contactSchema,
  type ContactErrorCode,
  type ContactField,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success";
type FieldErrors = Partial<Record<ContactField, string>>;

const fields: { name: ContactField; type: string; autoComplete: string; multiline?: boolean }[] = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "message", type: "text", autoComplete: "off", multiline: true },
];

function validate(values: Record<string, unknown>): FieldErrors {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const flat = z.flattenError(result.error).fieldErrors;
  return { name: flat.name?.[0], email: flat.email?.[0], message: flat.message?.[0] };
}

export function ContactForm() {
  const t = useTranslations("contact");
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [formError, setFormError] = useState<ContactErrorCode | "network" | null>(null);

  const readValues = () => Object.fromEntries(new FormData(formRef.current!));

  const onBlur = (field: ContactField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(readValues()));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = readValues();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok: boolean; error?: ContactErrorCode } = await res.json();
      if (!data.ok) throw data.error ?? "server";
      setStatus("success");
    } catch (err) {
      setFormError(typeof err === "string" ? (err as ContactErrorCode) : "network");
      setStatus("idle");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
    setTouched({});
  };

  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-line bg-bg-elevated/70 p-6 backdrop-blur-sm md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[30rem] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 96 96" className="size-24 text-accent" aria-hidden>
              <motion.circle
                cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M30 49 l12 12 l24 -26" fill="none" stroke="currentColor" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              />
            </svg>
            <h3 className="mt-8 font-display text-5xl">{t("successTitle")}</h3>
            <p className="mt-3 max-w-xs text-muted">{t("successBody")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {t("again")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col gap-8"
          >
            {fields.map((f) => {
              const error = touched[f.name] ? errors[f.name] : undefined;
              const inputId = `${id}-${f.name}`;
              const errorId = `${inputId}-error`;
              const shared = {
                id: inputId,
                name: f.name,
                placeholder: " ",
                autoComplete: f.autoComplete,
                "aria-invalid": !!error,
                "aria-describedby": error ? errorId : undefined,
                onBlur: () => onBlur(f.name),
                onChange: () => touched[f.name] && setErrors(validate(readValues())),
                className: cn(
                  "peer w-full resize-none border-b bg-transparent pt-7 pb-3 text-lg outline-none transition-colors",
                  error ? "border-accent" : "border-line focus:border-fg",
                ),
              };
              return (
                <div key={f.name} className="relative">
                  {f.multiline ? <textarea rows={5} {...shared} /> : <input type={f.type} {...shared} />}
                  {/* Floating label: sits in the field until it has focus or content. */}
                  <label
                    htmlFor={inputId}
                    className="pointer-events-none absolute start-0 top-0 text-xs tracking-[0.15em] text-muted uppercase transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.15em] peer-focus:uppercase"
                  >
                    {t(`fields.${f.name}`)}
                  </label>
                  <span
                    aria-hidden
                    className="absolute start-0 bottom-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo peer-focus:scale-x-100 rtl:origin-right"
                  />
                  {error && (
                    <p id={errorId} className="mt-2 text-sm text-accent">
                      {t(`errors.${error}`)}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Honeypot (hidden from people and assistive tech) */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -start-[9999px] size-px opacity-0" />

            {formError && (
              <p role="alert" className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm">
                {t(`errors.${formError}`)}
              </p>
            )}

            <Magnetic className="self-start">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-accent ps-7 pe-2 font-medium text-[#120e0c] isolate disabled:opacity-70"
              >
                <span aria-hidden className="absolute inset-0 -z-10 translate-y-full rounded-[inherit] bg-fg transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <span className="transition-colors duration-500 group-hover:text-bg">
                  {status === "sending" ? t("sending") : t("send")}
                </span>
                <span className="grid size-10 place-items-center rounded-full bg-[#120e0c] text-accent">
                  {status === "sending" ? (
                    <LoaderCircle aria-hidden className="size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100" />
                  )}
                </span>
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
