import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon tab browser — warna dari emblem Figma (Primary Green). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a3d2e",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c-3 2-5 5-5 9a5 5 0 0 0 10 0c0-4-2-7-5-9Z"
            stroke="#e4f222"
            strokeWidth="1.8"
          />
          <path d="M12 12v9" stroke="#f6f5f2" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
