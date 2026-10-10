"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  HarvestError,
  kirimLaporanPanen,
  parseHarvestInput,
} from "@/lib/laporan-panen";

type FormState = { error?: string; ok?: string };

export async function submitHarvestReport(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new HarvestError("Belum masuk.", 401);
    }
    if (!isRoleAllowed(session.user.role, "PEKERJA")) {
      throw new HarvestError("Peran Anda tidak berhak.", 403);
    }
    const userId = Number(session.user.id);
    if (!Number.isInteger(userId)) {
      throw new HarvestError("Sesi tidak valid.", 401);
    }
    const raw = Object.fromEntries(formData.entries());
    await kirimLaporanPanen(userId, parseHarvestInput(raw));
    const siklusId = raw.siklusId;
    revalidatePath("/petani/siklus");
    revalidatePath(`/petani/siklus/${siklusId}`);
    return { ok: "Laporan panen terkirim. Menunggu review Admin." };
  } catch (error) {
    if (error instanceof HarvestError) return { error: error.message };
    throw error;
  }
}
