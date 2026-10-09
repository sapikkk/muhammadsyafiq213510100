"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
  if (!["ADMIN", "PEKERJA"].includes(session.user.role)) {
    throw new ActivePackError("Peran Anda tidak berhak.", 403);
  }
  return userId;
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
    const userId = await requirePack();
    const raw = Object.fromEntries(formData.entries());
    await buatActivePack(parseActivePackInput(raw, userId));
    revalidatePath(basePath);
    return { ok: "Active pack tersimpan." };
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
    await requirePack();
    const id = Number(formData.get("id"));
    const jumlah = formData.get("jumlah");
    if (!Number.isInteger(id) || id <= 0) {
      return { error: "Pilih pack." };
    }
    const pack = await pakaiActivePack(id, jumlah);
    revalidatePath(basePath);
    return {
      ok:
        pack.status === "HABIS"
          ? "Pack habis (DEPLETED). Biaya per unit tetap tercatat untuk HPP."
          : "Pemakaian unit tercatat.",
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
