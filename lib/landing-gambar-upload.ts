import "server-only";

import { mkdir, writeFile } from "fs/promises";
import path from "path";

/** Batas unggah lewat server (Vercel ~4,5 MB). */
export const LANDING_GAMBAR_MAX_BYTES = 4 * 1024 * 1024;

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export function landingBlobKey(original: string): string {
  const base = original.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return `landing/${Date.now()}-${base.slice(0, 80) || "gambar"}`;
}

export function assertLandingGambarType(contentType: string) {
  if (!ALLOWED.has(contentType.split(";")[0]?.trim() ?? "")) {
    throw new Error("Format: JPEG, PNG, WebP, atau GIF.");
  }
}

export async function storeLandingGambarLocalDev(original: string, buf: Buffer): Promise<string> {
  const name = landingBlobKey(original).replace(/^landing\//, "");
  const dir = path.join(process.cwd(), "public/landing/uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);
  return `/landing/uploads/${name}`;
}

export async function storeLandingGambar(file: File): Promise<string> {
  if (file.size > LANDING_GAMBAR_MAX_BYTES) {
    throw new Error("Gambar maksimal 4 MB (batas unggah server).");
  }
  assertLandingGambarType(file.type);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(landingBlobKey(file.name), file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  if (process.env.NODE_ENV === "development") {
    const buf = Buffer.from(await file.arrayBuffer());
    return storeLandingGambarLocalDev(file.name, buf);
  }

  throw new Error(
    "Jalankan vercel env pull (token BLOB_READ_WRITE_TOKEN) atau unggah lewat production yang sudah di-link ke Blob kokonusfarm-blob.",
  );
}
