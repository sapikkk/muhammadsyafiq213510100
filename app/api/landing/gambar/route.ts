import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/api-auth";
import {
  LANDING_GAMBAR_MAX_BYTES,
  assertLandingGambarType,
  landingBlobKey,
  storeLandingGambarLocalDev,
} from "@/lib/landing-gambar-upload";

export async function POST(request: Request): Promise<NextResponse> {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") ?? "gambar.bin";
  const contentType = request.headers.get("content-type") ?? "application/octet-stream";
  const length = Number(request.headers.get("content-length") ?? "0");

  try {
    assertLandingGambarType(contentType);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Format tidak didukung.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (length > LANDING_GAMBAR_MAX_BYTES) {
    return NextResponse.json(
      { error: "Gambar maksimal 4 MB (batas unggah server Vercel)." },
      { status: 413 },
    );
  }

  if (!request.body) {
    return NextResponse.json({ error: "Body kosong." }, { status: 400 });
  }

  const key = landingBlobKey(filename);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, request.body, {
      access: "public",
      contentType,
    });
    return NextResponse.json({ url: blob.url });
  }

  if (process.env.NODE_ENV === "development") {
    const buf = Buffer.from(await request.arrayBuffer());
    if (buf.byteLength > LANDING_GAMBAR_MAX_BYTES) {
      return NextResponse.json({ error: "Gambar maksimal 4 MB." }, { status: 413 });
    }
    const url = await storeLandingGambarLocalDev(filename, buf);
    return NextResponse.json({ url });
  }

  return NextResponse.json(
    {
      error:
        "Token Blob belum ada. Jalankan vercel link && vercel env pull, atau set BLOB_READ_WRITE_TOKEN di Vercel.",
    },
    { status: 503 },
  );
}
