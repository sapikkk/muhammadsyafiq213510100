"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BiayaError, createOverhead, updateBiayaLangsung } from "@/lib/biaya";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) throw new BiayaError("Hanya Admin.", 403);
}

export async function simpanBiayaLangsung(
  _prev: { error?: string; ok?: boolean },
  formData: FormData,
) {
  try {
    await assertAdmin();
    const siklusId = Number(formData.get("siklusId"));
    await updateBiayaLangsung(siklusId, {
      biayaNutrisi: formData.get("biayaNutrisi"),
      biayaListrikPompa: formData.get("biayaListrikPompa"),
    });
    revalidatePath("/admin/biaya");
    return { ok: true };
  } catch (error) {
    if (error instanceof BiayaError) return { error: error.message };
    throw error;
  }
}

export async function simpanOverhead(
  _prev: { error?: string; ok?: boolean },
  formData: FormData,
) {
  try {
    await assertAdmin();
    await createOverhead({
      periode: formData.get("periode"),
      depresiasiGreenhouse: formData.get("depresiasiGreenhouse"),
      depresiasiListrik: formData.get("depresiasiListrik"),
      sewaLahan: formData.get("sewaLahan"),
      gajiKaryawan: formData.get("gajiKaryawan"),
    });
    revalidatePath("/admin/biaya");
    return { ok: true };
  } catch (error) {
    if (error instanceof BiayaError) return { error: error.message };
    throw error;
  }
}
