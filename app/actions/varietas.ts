"use server";

import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { isVarietasStatus } from "@/lib/varietas-status";
import { logEntityChange } from "@/lib/entity-audit";
import {
  VarietasError,
  createVarietas,
  getVarietas,
  parseVarietasInput,
  serializeVarietas,
  setVarietasStatus,
  updateVarietas,
} from "@/lib/varietas";

type FormState = { error?: string; ok?: string };

async function requireWrite() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new VarietasError("Belum masuk.", 401);
  if (!isRoleAllowed(session.user.role, ["ADMIN", "OWNER"])) {
    throw new VarietasError("Peran Anda tidak berhak.", 403);
  }
  return session;
}

function toState(error: unknown): FormState {
  if (error instanceof VarietasError) return { error: error.message };
  throw error;
}

function revalidateVarietas(id?: number) {
  revalidatePath("/admin/varietas");
  revalidatePath("/owner/varietas");
  revalidatePath("/petani/varietas");
  if (id) {
    revalidatePath(`/admin/varietas/${id}`);
    revalidatePath(`/owner/varietas/${id}`);
    revalidatePath(`/petani/varietas/${id}`);
  }
}

function rawFromForm(formData: FormData) {
  return {
    nama: formData.get("nama"),
    hargaBenihPerGram: formData.get("hargaBenihPerGram"),
    bijiPerGram: formData.get("bijiPerGram"),
    dayaKecambah: formData.get("dayaKecambah"),
    lamaSemai: formData.get("lamaSemai"),
    lamaDiKolam: formData.get("lamaDiKolam"),
    beratRataRataPanen: formData.get("beratRataRataPanen"),
    beratPerPack: formData.get("beratPerPack"),
    hargaJualCurah: formData.get("hargaJualCurah"),
    hargaJualPack: formData.get("hargaJualPack"),
    status: formData.get("status"),
  };
}

export async function simpanVarietas(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const session = await requireWrite();
    const actor = { email: session.user!.email!, nama: session.user!.name ?? undefined };
    const id = Number(formData.get("id"));
    const input = parseVarietasInput(rawFromForm(formData));
    if (Number.isInteger(id) && id > 0) {
      const before = await getVarietas(id);
      await updateVarietas(id, input);
      if (before) {
        const prev = serializeVarietas(before);
        const changes: string[] = [];
        if (prev.nama !== input.nama) changes.push(`nama → ${input.nama}`);
        if (prev.status !== input.status) changes.push(`status → ${input.status}`);
        if (changes.length === 0) changes.push("parameter diperbarui");
        await logEntityChange({
          entitas: "Varietas",
          entitasId: id,
          aksi: "UPDATE",
          ringkasan: changes.join("; "),
          actor,
        });
      }
      revalidateVarietas(id);
    } else {
      const created = await createVarietas(input);
      await logEntityChange({
        entitas: "Varietas",
        entitasId: created.id,
        aksi: "CREATE",
        ringkasan: `Varietas baru: ${input.nama}`,
        actor,
      });
      revalidateVarietas();
    }
    return { ok: "Varietas tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function ubahStatusVarietas(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await requireWrite();
    const id = Number(formData.get("varietasId"));
    const status = String(formData.get("status") ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new VarietasError("Pilih varietas.", 400);
    }
    if (!isVarietasStatus(status)) {
      throw new VarietasError("Status tidak dikenal.", 400);
    }
    const konfirmasi = formData.get("konfirmasi") === "ya";
    if (status === "NONAKTIF" && !konfirmasi) {
      throw new VarietasError("Centang konfirmasi sebelum menonaktifkan varietas.", 400);
    }
    await setVarietasStatus(id, status);
    await logEntityChange({
      entitas: "Varietas",
      entitasId: id,
      aksi: "STATUS",
      ringkasan: `Status → ${status}`,
      actor: { email: session.user!.email!, nama: session.user!.name ?? undefined },
    });
    revalidateVarietas(id);
    return { ok: "Status varietas diperbarui." };
  } catch (error) {
    return toState(error);
  }
}
