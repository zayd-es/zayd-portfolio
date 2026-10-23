import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Link from "next/link";
import { NotFoundView } from "@/components/layout/not-found-view";
import "./globals.css";

// Rendered outside the [locale] layout (URLs that match no route at all),
// so it brings its own fonts and theme, and stays in the default language.
const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${sans.variable}`}>
      <body>
        <NotFoundView
          title="Page not found"
          body="The page you’re looking for doesn’t exist or has moved."
          action={
            <Link
              href="/"
              className="inline-flex h-14 items-center rounded-full bg-accent px-7 font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Back to home
            </Link>
          }
        />
      </body>
    </html>
  );
}
