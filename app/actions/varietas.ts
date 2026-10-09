"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { isVarietasStatus } from "@/lib/varietas-status";
import {
  VarietasError,
  createVarietas,
  parseVarietasInput,
  setVarietasStatus,
} from "@/lib/varietas";

type FormState = { error?: string; ok?: string };

async function requireWrite() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new VarietasError("Belum masuk.", 401);
  if (!["ADMIN", "OWNER"].includes(session.user.role)) {
    throw new VarietasError("Peran Anda tidak berhak.", 403);
  }
}

function toState(error: unknown): FormState {
  if (error instanceof VarietasError) return { error: error.message };
  throw error;
}

function revalidate() {
  revalidatePath("/admin/varietas");
  revalidatePath("/owner/varietas");
}

export async function simpanVarietas(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await requireWrite();
    await createVarietas(
      parseVarietasInput({
        nama: formData.get("nama"),
        hargaBenihPerGram: formData.get("hargaBenihPerGram"),
        bijiPerGram: formData.get("bijiPerGram"),
        dayaKecambah: formData.get("dayaKecambah"),
        lamaSemai: formData.get("lamaSemai"),
        lamaDiKolam: formData.get("lamaDiKolam"),
        beratRataRataPanen: formData.get("beratRataRataPanen"),
        beratPerPack: formData.get("beratPerPack"),
        hargaJualCurah: formData.get("hargaJualCurah"),
        hargaJualPack: formData.get("hargaJualPack"),
        status: formData.get("status"),
      }),
    );
    revalidate();
    return { ok: "Varietas tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function ubahStatusVarietas(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireWrite();
    const id = Number(formData.get("varietasId"));
    const status = String(formData.get("status") ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new VarietasError("Pilih varietas.", 400);
    }
    if (!isVarietasStatus(status)) {
      throw new VarietasError("Status tidak dikenal.", 400);
    }
    const konfirmasi = formData.get("konfirmasi") === "ya";
    if (status === "NONAKTIF" && !konfirmasi) {
      throw new VarietasError("Centang konfirmasi sebelum menonaktifkan varietas.", 400);
    }
    await setVarietasStatus(id, status);
    revalidate();
    return { ok: "Status varietas diperbarui." };
  } catch (error) {
    return toState(error);
  }
}
