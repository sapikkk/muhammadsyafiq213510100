"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import { PeriodLockError, setPeriodeTutup } from "@/lib/period-lock";

export type PeriodLockState = { error?: string; ok?: string };

export async function updatePeriodeTutupAction(
  _prev: PeriodLockState,
  formData: FormData,
): Promise<PeriodLockState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };

  const clear = formData.get("clear") === "on";
  const tanggalText = String(formData.get("periodeTutup") ?? "").trim();

  try {
    if (clear) {
      await setPeriodeTutup(null);
      revalidatePath("/admin/akuntansi");
      return { ok: "Period lock dihapus. Jurnal backdate diizinkan lagi." };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalText)) {
      return { error: "Isi tanggal tutup periode (YYYY-MM-DD) atau centang hapus lock." };
    }
    await setPeriodeTutup(new Date(tanggalText));
    revalidatePath("/admin/akuntansi");
    return {
      ok: `Periode tutup ${tanggalText}: jurnal sebelum tanggal ini ditolak (kecuali override Admin).`,
    };
  } catch (error) {
    if (error instanceof PeriodLockError) return { error: error.message };
    throw error;
  }
}
