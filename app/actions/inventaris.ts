"use server";

import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import {
  InventarisError,
  catatPergerakan,
  createItem,
  parseItemInput,
  parseMovementInput,
} from "@/lib/inventaris";

type FormState = { error?: string; ok?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new InventarisError("Belum masuk.", 401);
  if (!isRoleAllowed(session.user.role, "ADMIN")) {
    throw new InventarisError("Peran Anda tidak berhak.", 403);
  }
}

async function requireMovement() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!session?.user?.role || !userId) {
    throw new InventarisError("Belum masuk.", 401);
  }
  if (!isRoleAllowed(session.user.role, ["ADMIN", "PEKERJA"])) {
    throw new InventarisError("Peran Anda tidak berhak.", 403);
  }
  return userId;
}

function toState(error: unknown): FormState {
  if (error instanceof InventarisError) return { error: error.message };
  throw error;
}

export async function simpanItemInventaris(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireAdmin();
    const raw = Object.fromEntries(formData.entries());
    await createItem(parseItemInput(raw));
    revalidatePath("/admin/inventaris");
    return { ok: "Item inventaris tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function catatPergerakanForm(
  _prev: FormState,
  formData: FormData,
  basePath: "/admin/inventaris" | "/petani/inventaris",
): Promise<FormState> {
  try {
    const userId = await requireMovement();
    const raw = Object.fromEntries(formData.entries());
    await catatPergerakan(parseMovementInput(raw, userId));
    revalidatePath(basePath);
    return { ok: "Pergerakan stok tercatat." };
  } catch (error) {
    return toState(error);
  }
}

export async function catatPergerakanAdmin(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return catatPergerakanForm(prev, formData, "/admin/inventaris");
}

export async function catatPergerakanPetani(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return catatPergerakanForm(prev, formData, "/petani/inventaris");
}
