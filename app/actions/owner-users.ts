"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import {
  createUserByOwner,
  OwnerUserError,
  resetPasswordByOwner,
} from "@/lib/owner-users";

export type OwnerUserState = { ok?: boolean; error?: string; message?: string };

async function requireOwnerId() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "OWNER") return null;
  const id = Number(session.user.id);
  return Number.isInteger(id) ? { id, session } : null;
}

export async function createOwnerUser(
  _prev: OwnerUserState,
  formData: FormData,
): Promise<OwnerUserState> {
  const ctx = await requireOwnerId();
  if (!ctx) return { error: "Hanya Owner." };

  try {
    await createUserByOwner({
      nama: formData.get("nama"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    });
    revalidatePath("/owner/pengguna");
    return { ok: true, message: "Akun baru dibuat." };
  } catch (error) {
    if (error instanceof OwnerUserError) return { error: error.message };
    throw error;
  }
}

export async function resetOwnerUserPassword(
  _prev: OwnerUserState,
  formData: FormData,
): Promise<OwnerUserState> {
  const ctx = await requireOwnerId();
  if (!ctx) return { error: "Hanya Owner." };

  const userId = Number(formData.get("userId"));
  if (!Number.isInteger(userId)) return { error: "User tidak valid." };

  try {
    await resetPasswordByOwner(userId, ctx.id, { password: formData.get("password") });
    revalidatePath("/owner/pengguna");
    return { ok: true, message: "Sandi direset; user wajib ganti saat login." };
  } catch (error) {
    if (error instanceof OwnerUserError) return { error: error.message };
    throw error;
  }
}
