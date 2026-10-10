"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import { catatPenyusutanBulan, PenyusutanError } from "@/lib/penyusutan-otomatis";

export type PenyusutanFormState = { error?: string; ok?: string };

export async function catatPenyusutanBulanAction(
  _prev: PenyusutanFormState,
  formData: FormData,
): Promise<PenyusutanFormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };

  try {
    const hasil = await catatPenyusutanBulan(Number(session.user.id), {
      bulan: formData.get("bulan"),
    });
    revalidatePath("/admin/akuntansi");
    revalidatePath("/admin/jurnal");
    revalidatePath("/admin/akun");
    return {
      ok: `Penyusutan ${hasil.bulan}: jurnal ${hasil.jurnalIds.map((id) => `#${id}`).join(", ")} (GH ${hasil.greenhouse}, inst. ${hasil.instalasi}).`,
    };
  } catch (error) {
    if (error instanceof PenyusutanError) return { error: error.message };
    throw error;
  }
}
