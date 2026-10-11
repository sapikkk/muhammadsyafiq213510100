"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  PetaniError,
  createPetani,
  parsePetaniInput,
  updatePetani,
} from "@/lib/petani";

type FormState = { error?: string; ok?: string };

export async function simpanPetaniMaster(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return { error: "Hanya Admin." };
  }
  try {
    const raw = Object.fromEntries(formData.entries());
    const id = Number(raw.id);
    const input = parsePetaniInput(raw);
    if (Number.isInteger(id) && id > 0) {
      await updatePetani(id, input);
    } else {
      await createPetani(input);
    }
    revalidatePath("/admin/petani");
    revalidatePath("/owner/petani");
    return { ok: "Data petani tersimpan." };
  } catch (error) {
    if (error instanceof PetaniError) return { error: error.message };
    throw error;
  }
}
