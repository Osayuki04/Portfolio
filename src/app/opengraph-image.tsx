import { ImageResponse } from "next/og";

export const alt = "Osayuki Obazee — Full Stack Developer & Founder of MEXO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card generated at build time.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#041b18",
          color: "#ece7d5",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: "0.12em", color: "#d7d0bc" }}>
          OSAYUKIOBAZEE.XYZ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.04 }}>
            Osayuki Obazee
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#b8bbae" }}>
            Full Stack Developer · Founder of MEXO
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px", fontSize: 24, color: "#cba56a" }}>
          <span>Next.js</span>
          <span style={{ color: "#6b7a6e" }}>/</span>
          <span>PHP</span>
          <span style={{ color: "#6b7a6e" }}>/</span>
          <span>MySQL</span>
          <span style={{ color: "#6b7a6e" }}>/</span>
          <span>Building in Public</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
