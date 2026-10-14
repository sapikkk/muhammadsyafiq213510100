"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import {
  ActivePackError,
  buatActivePack,
  pakaiActivePack,
  parseActivePackInput,
} from "@/lib/active-pack";

type FormState = { error?: string; ok?: string };

async function requirePack() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!session?.user?.role || !userId) {
    throw new ActivePackError("Belum masuk.", 401);
  }
  if (!isRoleAllowed(session.user.role, ["ADMIN", "PEKERJA"])) {
    throw new ActivePackError("Peran Anda tidak berhak.", 403);
  }
  return { userId, session };
}

function toState(error: unknown): FormState {
  if (error instanceof ActivePackError) return { error: error.message };
  throw error;
}

export async function simpanActivePack(
  _prev: FormState,
  formData: FormData,
  basePath: "/admin/active-pack" | "/petani/active-pack",
): Promise<FormState> {
  try {
    const { userId, session } = await requirePack();
    const raw = Object.fromEntries(formData.entries());
    const pack = await buatActivePack(parseActivePackInput(raw, userId));
    await logEntityChange({
      entitas: "ActivePack",
      entitasId: pack.id,
      aksi: "CREATE",
      ringkasan: `Pack baru: ${pack.kode}`,
      actor: actorFromSession(session),
    });
    revalidatePath(basePath);
    revalidatePath("/admin/inventaris");
    revalidatePath("/petani/inventaris");
    return { ok: "Paket siap pakai tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function simpanActivePackAdmin(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return simpanActivePack(prev, formData, "/admin/active-pack");
}

export async function simpanActivePackPetani(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return simpanActivePack(prev, formData, "/petani/active-pack");
}

export async function pakaiActivePackForm(
  _prev: FormState,
  formData: FormData,
  basePath: "/admin/active-pack" | "/petani/active-pack",
): Promise<FormState> {
  try {
    const { session } = await requirePack();
    const id = Number(formData.get("id"));
    const jumlah = formData.get("jumlah");
    if (!Number.isInteger(id) || id <= 0) {
      return { error: "Pilih pack." };
    }
    const pack = await pakaiActivePack(id, jumlah);
    await logEntityChange({
      entitas: "ActivePack",
      entitasId: pack.id,
      aksi: "UPDATE",
      ringkasan: `Pakai stok · sisa ${pack.sisaUnit.toString()} unit`,
      actor: actorFromSession(session),
    });
    revalidatePath(basePath);
    revalidatePath(`${basePath}/${id}`);
    return {
      ok:
        pack.status === "HABIS"
          ? "Paket habis. Biaya per unit tetap tercatat untuk HPP."
          : "Pemakaian stok paket tercatat.",
    };
  } catch (error) {
    return toState(error);
  }
}

export async function pakaiActivePackAdmin(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return pakaiActivePackForm(prev, formData, "/admin/active-pack");
}

export async function pakaiActivePackPetani(
  prev: FormState,
  formData: FormData,
): Promise<FormState> {
  return pakaiActivePackForm(prev, formData, "/petani/active-pack");
}
