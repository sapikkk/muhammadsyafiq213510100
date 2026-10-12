import "server-only";

import { Prisma } from "@prisma/client";
import { listPelanggan } from "@/lib/pelanggan";
import { createPetani, listPetani, PetaniError } from "@/lib/petani";
import { prisma } from "@/lib/prisma";
import { parseSmartJurnalTipe, SmartJurnalError } from "@/lib/smart-jurnal";
import {
  pihakModeForSmartJurnalClient,
  type CatatUangPihakBundle,
} from "@/lib/catat-uang-pihak-types";

export type { CatatUangPihakBundle, CatatUangPihakOption } from "@/lib/catat-uang-pihak-types";

export async function loadCatatUangPihakBundle(): Promise<CatatUangPihakBundle> {
  const [petaniRows, pelangganRows, ownerRows] = await Promise.all([
    listPetani(true),
    listPelanggan(true),
    prisma.user.findMany({
      where: { role: "OWNER", aktif: true },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true },
    }),
  ]);

  return {
    petani: petaniRows.map((p) => ({
      key: `petani:${p.id}`,
      label: p.nama,
      group: "Karyawan",
    })),
    pelanggan: pelangganRows.map((p) => ({
      key: `pelanggan:${p.id}`,
      label: p.nama,
      group: "Pelanggan",
    })),
    pemilik: ownerRows.map((u) => ({
      key: `owner:${u.id}`,
      label: u.nama,
      group: "Pemilik",
    })),
  };
}

async function labelForPihakKey(key: string): Promise<string | null> {
  const [kind, idText] = key.split(":");
  const id = Number(idText);
  if (!Number.isInteger(id) || id <= 0) return null;
  if (kind === "petani") {
    const row = await prisma.petani.findUnique({ where: { id } });
    return row?.nama ?? null;
  }
  if (kind === "pelanggan") {
    const row = await prisma.pelanggan.findUnique({ where: { id } });
    return row?.nama ?? null;
  }
  if (kind === "owner") {
    const row = await prisma.user.findUnique({ where: { id } });
    return row?.nama ?? null;
  }
  return null;
}

async function ensurePetaniBaru(nama: string) {
  const trimmed = nama.trim();
  if (trimmed.length < 2) {
    throw new SmartJurnalError("Nama karyawan baru minimal 2 karakter.", 400);
  }
  const existing = await prisma.petani.findFirst({
    where: { nama: { equals: trimmed, mode: "insensitive" }, aktif: true },
  });
  if (existing) return existing.nama;
  try {
    const created = await createPetani({
      nama: trimmed,
      gajiBulanan: new Prisma.Decimal(0),
    });
    return created.nama;
  } catch (error) {
    if (error instanceof PetaniError) {
      throw new SmartJurnalError(error.message, error.status);
    }
    throw error;
  }
}

/** Sisipkan nama pihak ke catatan sebelum jurnal dibuat. */
export async function enrichSmartJurnalRawWithPihak(
  raw: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const tipe = parseSmartJurnalTipe(raw.tipe);
  const mode = pihakModeForSmartJurnalClient(tipe);
  if (!mode) return raw;

  const key = String(raw.pihakKey ?? "").trim();
  const namaBaru = String(raw.namaPihakBaru ?? "").trim();
  let pihakLabel: string | null = null;

  if (key === "__baru_karyawan__") {
    if (!namaBaru) {
      throw new SmartJurnalError("Isi nama karyawan baru atau pilih dari daftar.", 400);
    }
    pihakLabel = await ensurePetaniBaru(namaBaru);
  } else if (key === "__lain__") {
    if (!namaBaru) {
      throw new SmartJurnalError("Isi nama vendor / pihak lain.", 400);
    }
    pihakLabel = namaBaru.slice(0, 100);
  } else if (key && key !== "__none__") {
    pihakLabel = await labelForPihakKey(key);
    if (!pihakLabel) {
      throw new SmartJurnalError("Pihak yang dipilih tidak ditemukan.", 400);
    }
  } else if (mode === "karyawan" || mode === "pemilik" || mode === "pelanggan") {
    throw new SmartJurnalError("Pilih nama pihak transaksi.", 400);
  }

  if (!pihakLabel) return raw;

  const prefix =
    mode === "karyawan" || key.startsWith("petani:") || key === "__baru_karyawan__"
      ? "Karyawan"
      : mode === "pemilik" || key.startsWith("owner:")
        ? "Pemilik"
        : mode === "pelanggan" || key.startsWith("pelanggan:")
          ? "Pelanggan"
          : "Pihak";

  const catatan = String(raw.catatan ?? "").trim();
  const tambahan = `${prefix}: ${pihakLabel}`;
  const merged = catatan ? `${catatan} · ${tambahan}` : tambahan;

  return { ...raw, catatan: merged.slice(0, 200) };
}
