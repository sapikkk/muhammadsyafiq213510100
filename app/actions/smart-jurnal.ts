"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import { enrichSmartJurnalRawWithPihak } from "@/lib/catat-uang-pihak";
import { updateLahanListrikBulan } from "@/lib/infrastruktur";
import { createSmartJurnal, SmartJurnalError } from "@/lib/smart-jurnal";

export type SmartJurnalState = { error?: string; ok?: string };

export async function submitSmartJurnal(
  _prev: SmartJurnalState,
  formData: FormData,
): Promise<SmartJurnalState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };

  const raw = Object.fromEntries(formData.entries());
  const adminOverridePeriod = formData.get("adminOverridePeriod") === "on";

  try {
    const enriched = await enrichSmartJurnalRawWithPihak(raw);
    const row = await createSmartJurnal(enriched, Number(session.user.id), {
      adminOverridePeriod,
    });
    revalidatePath("/admin/petani");
    revalidatePath("/owner/petani");
    if (
      String(raw.tipe ?? "").toUpperCase() === "BAYAR_LISTRIK" &&
      raw.syncListrikHpp === "on"
    ) {
      const lahanId = Number(raw.lahanId);
      if (Number.isInteger(lahanId) && lahanId > 0) {
        await updateLahanListrikBulan(lahanId, { biayaListrikBulan: raw.nominal });
        revalidatePath("/admin/biaya");
        revalidatePath("/admin/infrastruktur");
        revalidatePath("/owner/infrastruktur");
      }
    }
    revalidatePath("/admin/jurnal");
    redirect(`/admin/jurnal/${row.id}`);
  } catch (error) {
    if (error instanceof SmartJurnalError) return { error: error.message };
    throw error;
  }
}
