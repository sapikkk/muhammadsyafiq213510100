"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PetaniError, createPetani, parsePetaniInput } from "@/lib/petani";

export async function simpanPetaniMaster(
  _prev: { error?: string; ok?: boolean },
  formData: FormData,
) {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return { error: "Hanya Admin." };
  }
  try {
    await createPetani(
      parsePetaniInput({
        nama: formData.get("nama"),
        gajiBulanan: formData.get("gajiBulanan"),
      }),
    );
    revalidatePath("/admin/petani");
    revalidatePath("/owner/petani");
    return { ok: true };
  } catch (error) {
    if (error instanceof PetaniError) return { error: error.message };
    throw error;
  }
}
