"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
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
    const row = await createSmartJurnal(raw, Number(session.user.id), {
      adminOverridePeriod,
    });
    revalidatePath("/admin/jurnal");
    redirect(`/admin/jurnal/${row.id}`);
  } catch (error) {
    if (error instanceof SmartJurnalError) return { error: error.message };
    throw error;
  }
}
