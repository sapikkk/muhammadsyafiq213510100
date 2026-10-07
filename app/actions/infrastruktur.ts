"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import {
  InfrastrukturError,
  createGreenhouse,
  createKolam,
  createLahan,
  parseGreenhouseInput,
  parseKolamInput,
  parseLahanInput,
  updateKolamStatus,
} from "@/lib/infrastruktur";
import { isKolamStatus } from "@/lib/infrastruktur-kolam-status";

type FormState = { error?: string; ok?: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role) throw new InfrastrukturError("Belum masuk.", 401);
  if (session.user.role !== "ADMIN") {
    throw new InfrastrukturError("Peran Anda tidak berhak.", 403);
  }
}

function toState(error: unknown): FormState {
  if (error instanceof InfrastrukturError) return { error: error.message };
  throw error;
}

function revalidate() {
  revalidatePath("/admin/infrastruktur");
  revalidatePath("/owner/infrastruktur");
}

export async function simpanLahan(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    await createLahan(
      parseLahanInput({
        nilaiSewa: formData.get("nilaiSewa"),
        masaSewa: formData.get("masaSewa"),
      }),
    );
    revalidate();
    return { ok: "Lahan tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function simpanGreenhouse(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireAdmin();
    await createGreenhouse(
      parseGreenhouseInput({
        lahanId: formData.get("lahanId"),
        nama: formData.get("nama"),
        nilaiInvestasi: formData.get("nilaiInvestasi"),
        umurEkonomis: formData.get("umurEkonomis"),
      }),
    );
    revalidate();
    return { ok: "Greenhouse tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function simpanKolam(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    await createKolam(
      parseKolamInput({
        greenhouseId: formData.get("greenhouseId"),
        nama: formData.get("nama"),
        kapasitasLubang: formData.get("kapasitasLubang"),
        status: formData.get("status"),
      }),
    );
    revalidate();
    return { ok: "Kolam tersimpan." };
  } catch (error) {
    return toState(error);
  }
}

export async function ubahStatusKolam(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireAdmin();
    const id = Number(formData.get("kolamId"));
    const status = String(formData.get("status") ?? "").trim().toUpperCase();
    if (!Number.isInteger(id) || id <= 0) {
      throw new InfrastrukturError("Pilih kolam.", 400);
    }
    if (!isKolamStatus(status)) {
      throw new InfrastrukturError("Status tidak dikenal.", 400);
    }
    await updateKolamStatus(id, status);
    revalidate();
    return { ok: "Status kolam diperbarui." };
  } catch (error) {
    return toState(error);
  }
}
