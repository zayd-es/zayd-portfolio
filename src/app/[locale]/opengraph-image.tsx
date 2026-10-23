import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const alt = `${profile.name}, Frontend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "src/assets");
const [serif, serifItalic, chrome] = await Promise.all([
  readFile(join(assets, "fonts/InstrumentSerif-Regular.ttf")),
  readFile(join(assets, "fonts/InstrumentSerif-Italic.ttf")),
  readFile(join(assets, "og-chrome.png")),
]);
const chromeSrc = `data:image/png;base64,${chrome.toString("base64")}`;

/** Social preview shared by every locale (the name and stack read the same everywhere). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 78% 40%, #2a2318 0%, #0e0d0b 55%)",
          color: "#f2ede4",
          fontFamily: "Instrument Serif",
          padding: "64px 72px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
        <img src={chromeSrc} width={460} height={460} alt="" style={{ position: "absolute", right: 40, top: 70 }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#c8a96a" }}>
            <div style={{ width: 48, height: 2, background: "#c8a96a" }} />
            Frontend Developer
          </div>

          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.85 }}>
            <span style={{ fontSize: 168, fontStyle: "italic", color: "#e6d5b0" }}>{profile.firstName}</span>
            <span style={{ fontSize: 168 }}>{profile.lastName}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "rgba(242,237,228,0.7)" }}>
            <span>React · Next.js · Full-stack</span>
            <span>Tetouan, Morocco</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
