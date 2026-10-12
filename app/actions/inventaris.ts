"use server";

import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import {
  InventarisError,
  catatPergerakan,
  createItem,
  parseItemInput,
  parseItemUpdateInput,
  parseMovementInput,
  setItemAktif,
  updateItem,
} from "@/lib/inventaris";

type FormState = { error?: string; ok?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new InventarisError("Belum masuk.", 401);
  if (!isRoleAllowed(session.user.role, "ADMIN")) {
    throw new InventarisError("Peran Anda tidak berhak.", 403);
  }
  return session;
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

function revalidateInventarisPaths(itemId?: number) {
  const bases = ["/admin/inventaris", "/owner/inventaris", "/petani/inventaris"] as const;
  for (const base of bases) {
    revalidatePath(base);
    if (itemId != null) revalidatePath(`${base}/${itemId}`);
  }
}

export async function simpanItemInventaris(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await requireAdmin();
    const raw = Object.fromEntries(formData.entries());
    const item = await createItem(parseItemInput(raw));
    await logEntityChange({
      entitas: "ItemInventaris",
      entitasId: item.id,
      aksi: "CREATE",
      ringkasan: `Item baru: ${item.kode} · ${item.nama}`,
      actor: actorFromSession(session),
    });
    revalidateInventarisPaths();
    return { ok: "Item inventaris tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function ubahItemInventaris(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await requireAdmin();
    const raw = Object.fromEntries(formData.entries());
    const input = parseItemUpdateInput(raw);
    const item = await updateItem(input);
    await logEntityChange({
      entitas: "ItemInventaris",
      entitasId: item.id,
      aksi: "UPDATE",
      ringkasan: `Master diperbarui · ${item.kode}`,
      actor: actorFromSession(session),
    });
    revalidateInventarisPaths(item.id);
    return { ok: `Item ${item.kode} diperbarui.` };
  } catch (error) {
    return toState(error);
  }
}

export async function ubahStatusItemInventaris(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await requireAdmin();
    const raw = Object.fromEntries(formData.entries());
    const id = Number(raw.itemId);
    const aktif = raw.aktif === "true";
    if (!Number.isInteger(id) || id <= 0) {
      throw new InventarisError("Item tidak valid.", 400);
    }
    if (!aktif && raw.konfirmasi !== "ya") {
      throw new InventarisError("Centang konfirmasi sebelum menonaktifkan item.", 400);
    }
    const item = await setItemAktif(id, aktif);
    await logEntityChange({
      entitas: "ItemInventaris",
      entitasId: item.id,
      aksi: "STATUS",
      ringkasan: aktif ? "Diaktifkan" : "Dinonaktifkan",
      actor: actorFromSession(session),
    });
    revalidateInventarisPaths(item.id);
    return {
      ok: `Item ${item.kode} ${aktif ? "diaktifkan" : "dinonaktifkan"}.`,
    };
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
    const input = parseMovementInput(raw, userId);
    await catatPergerakan(input);
    revalidatePath(basePath);
    revalidatePath(`${basePath}/${input.itemId}`);
    revalidatePath("/owner/inventaris");
    revalidatePath(`/owner/inventaris/${input.itemId}`);
    if (basePath === "/admin/inventaris") {
      revalidatePath("/petani/inventaris");
      revalidatePath(`/petani/inventaris/${input.itemId}`);
      revalidatePath("/admin/jurnal");
    }
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
