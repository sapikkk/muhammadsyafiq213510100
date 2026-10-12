"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import {
  createRekeningKas,
  parseRekeningKasInput,
  RekeningKasError,
} from "@/lib/rekening-kas";

export type RekeningKasFormState = { error?: string; ok?: string };

export async function createRekeningKasAction(
  _prev: RekeningKasFormState,
  formData: FormData,
): Promise<RekeningKasFormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isRoleAllowed(session.user.role, "OWNER")) {
    return { error: "Hanya Owner yang boleh mengelola rekening." };
  }

  try {
    const input = parseRekeningKasInput(Object.fromEntries(formData.entries()));
    await createRekeningKas(input);
    revalidatePath("/owner/rekening");
    revalidatePath("/owner");
    revalidatePath("/admin");
    revalidatePath("/admin/penjualan");
    return { ok: "Rekening tersimpan." };
  } catch (error) {
    if (error instanceof RekeningKasError) {
      return { error: error.message };
    }
    throw error;
  }
}
