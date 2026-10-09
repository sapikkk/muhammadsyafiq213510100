"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  JurnalError,
  ajukanJurnal,
  createJurnal,
  parseJurnalInput,
  setujuiJurnal,
  tolakJurnal,
} from "@/lib/jurnal";

export type JurnalFormState = { error?: string; saved?: string };

async function adminId() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return null;
  return Number(session.user.id);
}

const bukanAdmin = { error: "Hanya Admin yang bisa mengelola jurnal." };

// Baris datang sebagai akunId[], debit[], kredit[] dari form.
function barisDariForm(formData: FormData) {
  const akunIds = formData.getAll("akunId");
  return akunIds.map((akunId, i) => ({
    akunId,
    debit: formData.getAll("debit")[i],
    kredit: formData.getAll("kredit")[i],
  }));
}

export async function simpanJurnal(
  _prev: JurnalFormState,
  formData: FormData,
): Promise<JurnalFormState> {
  const id = await adminId();
  if (!id) return bukanAdmin;
  let jurnalId: number;
  try {
    const input = parseJurnalInput({
      tanggal: formData.get("tanggal"),
      keterangan: formData.get("keterangan"),
      status: formData.get("status"),
      baris: barisDariForm(formData),
    });
    jurnalId = (await createJurnal(input, id)).id;
  } catch (error) {
    if (error instanceof JurnalError) return { error: error.message };
    throw error;
  }
  revalidatePath("/admin/jurnal");
  redirect(`/admin/jurnal/${jurnalId}`);
}

async function putuskan(
  formData: FormData,
  aksi: (jurnalId: number, olehId: number, alasan: string) => Promise<unknown>,
  pesan: string,
): Promise<JurnalFormState> {
  const id = await adminId();
  if (!id) return bukanAdmin;
  const jurnalId = Number(formData.get("id"));
  try {
    await aksi(jurnalId, id, String(formData.get("alasan") ?? ""));
  } catch (error) {
    if (error instanceof JurnalError) return { error: error.message };
    throw error;
  }
  revalidatePath("/admin/jurnal");
  revalidatePath(`/admin/jurnal/${jurnalId}`);
  revalidatePath("/admin/akun");
  return { saved: pesan };
}

export async function ajukanJurnalAction(
  _prev: JurnalFormState,
  formData: FormData,
) {
  return putuskan(
    formData,
    (jurnalId) => ajukanJurnal(jurnalId),
    "Jurnal diajukan, menunggu persetujuan.",
  );
}

export async function setujuiJurnalAction(
  _prev: JurnalFormState,
  formData: FormData,
) {
  return putuskan(formData, (j, o) => setujuiJurnal(j, o), "Jurnal disetujui. Saldo akun diperbarui.");
}

export async function tolakJurnalAction(
  _prev: JurnalFormState,
  formData: FormData,
) {
  return putuskan(formData, tolakJurnal, "Jurnal ditolak.");
}
