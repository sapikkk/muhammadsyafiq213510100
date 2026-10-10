"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import {
  SiklusAbortError,
  abortSiklusGagalTotal,
} from "@/lib/siklus-abort";

type FormState = { error?: string; ok?: string };

export async function submitAbortSiklus(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!session?.user?.id || !userId) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, ["PEKERJA", "ADMIN"])) {
    return { error: "Hanya petani atau admin yang boleh abort siklus." };
  }

  const siklusId = Number(formData.get("siklusId"));
  if (!Number.isInteger(siklusId) || siklusId <= 0) {
    return { error: "Siklus tidak valid." };
  }

  const konfirmasi = formData.get("konfirmasi");
  if (konfirmasi !== "on" && konfirmasi !== "true") {
    return { error: "Centang konfirmasi abort gagal total." };
  }

  try {
    const raw = Object.fromEntries(formData.entries());
    const hasil = await abortSiklusGagalTotal(siklusId, userId, raw);
    revalidatePath(`/petani/siklus/${siklusId}`);
    revalidatePath("/petani/siklus");
    revalidatePath("/admin/biaya");
    revalidatePath("/admin/jurnal");
    return {
      ok: `Siklus ${hasil.siklus.kode_batch} di-abort. Jurnal 5300 ← WIP: Rp ${hasil.wip}.`,
    };
  } catch (err) {
    if (err instanceof SiklusAbortError) return { error: err.message };
    throw err;
  }
}
