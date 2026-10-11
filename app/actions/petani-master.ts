"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import {
  PetaniError,
  createPetani,
  parsePetaniInput,
  setPetaniAktif,
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
    const actor = actorFromSession(session);
    if (Number.isInteger(id) && id > 0) {
      await updatePetani(id, input);
      await logEntityChange({
        entitas: "Petani",
        entitasId: id,
        aksi: "UPDATE",
        ringkasan: `Master diperbarui · ${input.nama}`,
        actor,
      });
    } else {
      const created = await createPetani(input);
      await logEntityChange({
        entitas: "Petani",
        entitasId: created.id,
        aksi: "CREATE",
        ringkasan: `Master petani baru: ${input.nama}`,
        actor,
      });
    }
    revalidatePath("/admin/petani");
    revalidatePath("/owner/petani");
    return { ok: "Data petani tersimpan." };
  } catch (error) {
    if (error instanceof PetaniError) return { error: error.message };
    throw error;
  }
}

export async function ubahStatusPetaniMaster(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) {
    return { error: "Hanya Admin." };
  }
  try {
    const id = Number(formData.get("petaniId"));
    const aktif = formData.get("aktif") === "true";
    if (!Number.isInteger(id) || id <= 0) {
      throw new PetaniError("Petani tidak valid.", 400);
    }
    if (!aktif && formData.get("konfirmasi") !== "ya") {
      throw new PetaniError("Centang konfirmasi sebelum menonaktifkan petani.", 400);
    }
    const row = await setPetaniAktif(id, aktif);
    await logEntityChange({
      entitas: "Petani",
      entitasId: id,
      aksi: "STATUS",
      ringkasan: aktif ? "Diaktifkan" : "Dinonaktifkan",
      actor: actorFromSession(session),
    });
    revalidatePath("/admin/petani");
    revalidatePath("/owner/petani");
    return { ok: `Master petani ${row.nama} ${aktif ? "diaktifkan" : "dinonaktifkan"}.` };
  } catch (error) {
    if (error instanceof PetaniError) return { error: error.message };
    throw error;
  }
}
