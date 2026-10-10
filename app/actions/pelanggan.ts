"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  PelangganError,
  createPelanggan,
  parsePelangganInput,
  updatePelanggan,
} from "@/lib/pelanggan";

type FormState = { error?: string; ok?: string };

export async function submitPelanggan(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) return { error: "Hanya Admin." };

  try {
    const raw = Object.fromEntries(formData.entries());
    const id = Number(raw.id);
    const input = parsePelangganInput(raw);
    if (Number.isInteger(id) && id > 0) {
      await updatePelanggan(id, input);
    } else {
      await createPelanggan(input);
    }
    revalidatePath("/admin/pelanggan");
    return { ok: "Pelanggan tersimpan." };
  } catch (err) {
    if (err instanceof PelangganError) return { error: err.message };
    throw err;
  }
}
