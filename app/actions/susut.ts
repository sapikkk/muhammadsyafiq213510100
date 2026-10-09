"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { KegagalanError } from "@/lib/log-kegagalan";
import { klasifikasiLogSusut, parseKlasifikasiInput } from "@/lib/susut";

type FormState = { error?: string; ok?: string };

export async function klasifikasiSusut(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (session.user.role !== "ADMIN") {
    return { error: "Hanya Admin yang boleh klasifikasi susut." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const input = parseKlasifikasiInput(raw);
    await klasifikasiLogSusut(input);
    revalidatePath("/admin/susut");
    revalidatePath("/admin/harvest");
    return { ok: "Klasifikasi tersimpan." };
  } catch (err) {
    if (err instanceof KegagalanError) return { error: err.message };
    throw err;
  }
}
