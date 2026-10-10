"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  SiklusError,
  buatSiklusSemai,
  lanjutFase,
  parseSiklusInput,
} from "@/lib/siklus-produksi";
import { faseLabel } from "@/lib/siklus-fase";

type FormState = { error?: string; ok?: string };

export async function mulaiSiklusSemai(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    if (!isRoleAllowed(session?.user?.role, "PEKERJA")) {
      throw new SiklusError("Peran Anda tidak berhak.", 403);
    }
    const raw = Object.fromEntries(formData.entries());
    const siklus = await buatSiklusSemai(parseSiklusInput(raw), Number(session!.user!.id));
    revalidatePath("/petani/siklus");
    return { ok: `Siklus ${siklus.kode_batch} tersimpan. Fase ${siklus.status}.` };
  } catch (error) {
    if (error instanceof SiklusError) return { error: error.message };
    throw error;
  }
}

export async function pindahFaseSiklus(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? Number(session.user.id) : null;
    if (session?.user?.role !== "PEKERJA" || !userId) {
      throw new SiklusError("Peran Anda tidak berhak.", 403);
    }
    const siklusId = Number(formData.get("siklusId"));
    if (!Number.isInteger(siklusId) || siklusId <= 0) {
      return { error: "Siklus tidak valid." };
    }
    const raw = Object.fromEntries(formData.entries());
    raw.konfirmasi = formData.get("konfirmasi") ? "on" : "";
    const hasil = await lanjutFase(siklusId, userId, raw);
    revalidatePath(`/petani/siklus/${siklusId}`);
    revalidatePath("/petani/siklus");
    return {
      ok: `Fase diperbarui: ${faseLabel[hasil.fase_dari]} → ${faseLabel[hasil.fase_ke]}.`,
    };
  } catch (error) {
    if (error instanceof SiklusError) return { error: error.message };
    throw error;
  }
}
