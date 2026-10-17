"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { storeLandingGambar } from "@/lib/landing-gambar-upload";
import { isRoleAllowed } from "@/lib/rbac";

export type UploadLandingGambarResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function uploadLandingGambar(formData: FormData): Promise<UploadLandingGambarResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) {
    return { ok: false, error: "Belum masuk." };
  }
  if (!isRoleAllowed(session.user.role, ["ADMIN", "OWNER"])) {
    return { ok: false, error: "Hanya admin atau owner." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Pilih file gambar." };
  }

  try {
    const url = await storeLandingGambar(file);
    return { ok: true, url };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unggah gagal.";
    return { ok: false, error: message };
  }
}
