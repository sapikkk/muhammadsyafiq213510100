"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  AkunError,
  createAkun,
  parseAkunInput,
  setAkunAktif,
  updateAkun,
} from "@/lib/akun";

export type AkunFormState = { error?: string; saved?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

function formToRecord(formData: FormData) {
  return {
    kode: formData.get("kode"),
    nama: formData.get("nama"),
    tipe: formData.get("tipe"),
    parentId: formData.get("parentId"),
  };
}

export async function saveAkun(
  _prev: AkunFormState,
  formData: FormData,
): Promise<AkunFormState> {
  if (!(await requireAdmin())) {
    return { error: "Hanya Admin yang bisa mengubah bagan akun." };
  }
  const id = Number(formData.get("id"));
  try {
    const input = parseAkunInput(formToRecord(formData));
    const akun = id
      ? await updateAkun(id, input)
      : await createAkun(input);
    revalidatePath("/admin/akun");
    if (id) redirect("/admin/akun");
    return { saved: `Akun ${akun.kode} ${akun.nama} tersimpan.` };
  } catch (error) {
    if (error instanceof AkunError) return { error: error.message };
    throw error;
  }
}

export async function toggleAkun(
  _prev: AkunFormState,
  formData: FormData,
): Promise<AkunFormState> {
  if (!(await requireAdmin())) {
    return { error: "Hanya Admin yang bisa mengubah bagan akun." };
  }
  const id = Number(formData.get("id"));
  const aktif = formData.get("aktif") === "true";
  try {
    const akun = await setAkunAktif(id, aktif);
    revalidatePath("/admin/akun");
    return {
      saved: `Akun ${akun.kode} ${akun.nama} ${aktif ? "diaktifkan" : "dinonaktifkan"}.`,
    };
  } catch (error) {
    if (error instanceof AkunError) return { error: error.message };
    throw error;
  }
}
