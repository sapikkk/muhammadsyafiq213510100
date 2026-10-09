"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { createPriveJurnal, PriveError } from "@/lib/prive";

export type PriveState = { ok?: boolean; error?: string; jurnalId?: number };

export async function submitPrive(_prev: PriveState, formData: FormData): Promise<PriveState> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "OWNER") {
    return { error: "Hanya Owner yang dapat mencatat prive." };
  }
  const userId = Number(session.user.id);
  if (!Number.isInteger(userId)) return { error: "Sesi tidak valid." };

  try {
    const jurnal = await createPriveJurnal(
      {
        tanggal: formData.get("tanggal"),
        nominal: formData.get("nominal"),
        catatan: formData.get("catatan"),
      },
      userId,
    );
    revalidatePath("/owner/prive");
    revalidatePath("/owner/jurnal");
    revalidatePath("/admin/jurnal");
    return { ok: true, jurnalId: jurnal.id };
  } catch (error) {
    if (error instanceof PriveError) return { error: error.message };
    throw error;
  }
}
