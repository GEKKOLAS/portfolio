import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Card shown when the portfolio link is shared (LinkedIn, WhatsApp, X…).
// Generated at build time from the profile photo.
export const alt = "Nicolás Murillo, International Business Professional and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public", "HeroProfile3.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 48,
          padding: "0 64px",
          background: "radial-gradient(circle at 85% 15%, #3b0f4f 0%, #0b0b0f 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 300,
            height: 300,
            borderRadius: 9999,
            overflow: "hidden",
            border: "6px solid #a855f7",
            flexShrink: 0,
          }}
        >
          <img src={src} width={300} height={450} style={{ objectFit: "cover", marginTop: -6 }} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, color: "#facc15", fontWeight: 700 }}>Nicolás Murillo</div>
          <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1, marginTop: 8, color: "#f472b6" }}>International Business Professional</div>
          <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1 }}>&amp; Full-Stack Developer</div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 18, color: "#d4d4d8" }}>
            bridging&nbsp;<span style={{ color: "#f59e0b" }}>business</span>,&nbsp;
            <span style={{ color: "#ec4899" }}>design</span>,&nbsp;
            <span style={{ color: "#22d3ee" }}>marketing</span>&nbsp;&amp;&nbsp;
            <span style={{ color: "#4ade80" }}>code</span>
          </div>
          <div style={{ fontSize: 28, marginTop: 34, color: "#a1a1aa" }}>.NET · React · Azure · n8n — Available for freelance</div>
        </div>
      </div>
    ),
    size,
  );
}
