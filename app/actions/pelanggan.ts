"use server";

import { revalidatePath } from "next/cache";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { actorFromSession, logEntityChange } from "@/lib/entity-audit";
import {
  PelangganError,
  createPelanggan,
  parsePelangganInput,
  setPelangganAktif,
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
    const actor = actorFromSession(session);
    if (Number.isInteger(id) && id > 0) {
      await updatePelanggan(id, input);
      await logEntityChange({
        entitas: "Pelanggan",
        entitasId: id,
        aksi: "UPDATE",
        ringkasan: `Data diperbarui · ${input.nama}`,
        actor,
      });
    } else {
      const created = await createPelanggan(input);
      await logEntityChange({
        entitas: "Pelanggan",
        entitasId: created.id,
        aksi: "CREATE",
        ringkasan: `Pelanggan baru: ${input.nama}`,
        actor,
      });
    }
    revalidatePath("/admin/pelanggan");
    return { ok: "Pelanggan tersimpan." };
  } catch (err) {
    if (err instanceof PelangganError) return { error: err.message };
    throw err;
  }
}

export async function ubahStatusPelanggan(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!isRoleAllowed(session?.user?.role, "ADMIN")) return { error: "Hanya Admin." };

  try {
    const id = Number(formData.get("pelangganId"));
    const aktif = formData.get("aktif") === "true";
    if (!Number.isInteger(id) || id <= 0) {
      throw new PelangganError("Pelanggan tidak valid.", 400);
    }
    if (!aktif && formData.get("konfirmasi") !== "ya") {
      throw new PelangganError("Centang konfirmasi sebelum menonaktifkan pelanggan.", 400);
    }
    const row = await setPelangganAktif(id, aktif);
    await logEntityChange({
      entitas: "Pelanggan",
      entitasId: id,
      aksi: "STATUS",
      ringkasan: aktif ? "Diaktifkan" : "Dinonaktifkan",
      actor: actorFromSession(session),
    });
    revalidatePath("/admin/pelanggan");
    return { ok: `Pelanggan ${row.nama} ${aktif ? "diaktifkan" : "dinonaktifkan"}.` };
  } catch (err) {
    if (err instanceof PelangganError) return { error: err.message };
    throw err;
  }
}
