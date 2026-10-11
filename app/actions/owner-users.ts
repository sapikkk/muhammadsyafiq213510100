"use server";

import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import {
  createUserByOwner,
  OwnerUserError,
  resetPasswordByOwner,
  setUserAktifByOwner,
} from "@/lib/owner-users";

export type OwnerUserState = { ok?: boolean; error?: string; message?: string };

async function requireOwnerId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  if (!isRoleAllowed(session.user.role, "OWNER")) return null;
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
    const user = await createUserByOwner({
      nama: formData.get("nama"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    });
    await logEntityChange({
      entitas: "User",
      entitasId: user.id,
      aksi: "CREATE",
      ringkasan: `Akun baru · ${user.email} (${user.role})`,
      actor: actorFromSession(ctx.session),
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
    await logEntityChange({
      entitas: "User",
      entitasId: userId,
      aksi: "UPDATE",
      ringkasan: "Sandi direset oleh Owner",
      actor: actorFromSession(ctx.session),
    });
    revalidatePath("/owner/pengguna");
    return { ok: true, message: "Sandi direset; user wajib ganti saat login." };
  } catch (error) {
    if (error instanceof OwnerUserError) return { error: error.message };
    throw error;
  }
}

export async function ubahStatusOwnerUser(
  _prev: { error?: string; ok?: string },
  formData: FormData,
): Promise<{ error?: string; ok?: string }> {
  const ctx = await requireOwnerId();
  if (!ctx) return { error: "Hanya Owner." };

  const userId = Number(formData.get("userId"));
  const aktif = formData.get("aktif") === "true";
  if (!Number.isInteger(userId)) return { error: "User tidak valid." };
  if (!aktif && formData.get("konfirmasi") !== "ya") {
    return { error: "Centang konfirmasi sebelum menonaktifkan user." };
  }

  try {
    const row = await setUserAktifByOwner(userId, ctx.id, aktif);
    await logEntityChange({
      entitas: "User",
      entitasId: userId,
      aksi: "STATUS",
      ringkasan: aktif ? "Diaktifkan" : "Dinonaktifkan",
      actor: actorFromSession(ctx.session),
    });
    revalidatePath("/owner/pengguna");
    return {
      ok: `Akun ${row.email} ${aktif ? "diaktifkan" : "dinonaktifkan"}.`,
    };
  } catch (error) {
    if (error instanceof OwnerUserError) return { error: error.message };
    throw error;
  }
}
