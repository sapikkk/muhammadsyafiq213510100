import "server-only";

import { Prisma } from "@prisma/client";
import { createJurnal, JurnalError } from "@/lib/jurnal";
import { AKUN_KODE } from "@/lib/akun-kode";
import {
  KasSumberError,
  parseSumberKasKode,
  type SumberKasKode,
} from "@/lib/kas-sumber";
import { assertJurnalTanggalAllowed } from "@/lib/period-lock";
import { prisma } from "@/lib/prisma";
import {
  smartJurnalTipe,
  smartJurnalTipeLabel,
  type SmartJurnalTipe,
} from "@/lib/smart-jurnal-catalog";
import {
  buildSmartJurnalBaris,
  collectSmartJurnalAkunKodes,
  SMART_JURNAL_AKUN_BY_TIPE,
} from "@/lib/smart-jurnal-baris";

export { smartJurnalTipe, smartJurnalTipeLabel, type SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";
export { buildSmartJurnalBaris } from "@/lib/smart-jurnal-baris";

export class SmartJurnalError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseNominal(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text) || text === "0") {
    throw new SmartJurnalError("Nominal harus angka lebih dari nol.", 400);
  }
  return new Prisma.Decimal(text);
}

export function parseSmartJurnalTipe(raw: unknown): SmartJurnalTipe {
  const t = String(raw ?? "").trim().toUpperCase();
  if (!smartJurnalTipe.includes(t as SmartJurnalTipe)) {
    throw new SmartJurnalError("Pilih tipe Smart Jurnal.", 400);
  }
  return t as SmartJurnalTipe;
}

function parseTujuanKas(raw: unknown, sumber: SumberKasKode): SumberKasKode {
  let tujuan: SumberKasKode;
  try {
    tujuan = parseSumberKasKode(raw);
  } catch (error) {
    if (error instanceof KasSumberError) {
      throw new SmartJurnalError(error.message, error.status);
    }
    throw error;
  }
  if (tujuan === sumber) {
    throw new SmartJurnalError("Transfer: pilih rekening tujuan berbeda dari sumber.", 400);
  }
  return tujuan;
}

async function akunPostingKode(kode: string) {
  const akun = await prisma.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new SmartJurnalError(`Akun ${kode} tidak siap posting.`, 400);
  }
  return akun.id;
}

async function loadAkunIdsForTipe(
  tipe: SmartJurnalTipe,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): Promise<Map<string, number>> {
  const kodes = collectSmartJurnalAkunKodes(tipe, kasKode, tujuanKode);
  const map = new Map<string, number>();
  for (const kode of Array.from(kodes)) {
    map.set(kode, await akunPostingKode(kode));
  }
  return map;
}

export async function createSmartJurnal(
  raw: Record<string, unknown>,
  userId: number,
  opts?: { adminOverridePeriod?: boolean },
) {
  const tanggalText = String(raw.tanggal ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalText)) {
    throw new SmartJurnalError("Isi tanggal.", 400);
  }
  const tanggal = new Date(tanggalText);
  await assertJurnalTanggalAllowed(tanggal, { adminOverride: opts?.adminOverridePeriod });

  const tipe = parseSmartJurnalTipe(raw.tipe);
  const nominal = parseNominal(raw.nominal);
  const spec = SMART_JURNAL_AKUN_BY_TIPE[tipe]!;

  let kasKodeVal: SumberKasKode = AKUN_KODE.KAS;
  let tujuanKode: SumberKasKode | undefined;
  if (spec.needsKas) {
    try {
      kasKodeVal = parseSumberKasKode(raw.sumberKas);
    } catch (error) {
      if (error instanceof KasSumberError) {
        throw new SmartJurnalError(error.message, error.status);
      }
      throw error;
    }
  }
  if (spec.needsKasTujuan) {
    tujuanKode = parseTujuanKas(raw.tujuanKas, kasKodeVal);
  }

  const statusRaw = String(raw.status ?? "PENDING").trim();
  if (statusRaw !== "DRAFT" && statusRaw !== "PENDING") {
    throw new SmartJurnalError("Status awal hanya DRAFT atau PENDING.", 400);
  }

  const catatan = String(raw.catatan ?? "").trim();
  if (tipe === "PENDAPATAN_LAIN" && /\b(suntik(an)?\s*modal|modal\s*pemilik|setor\s*modal)\b/i.test(catatan)) {
    throw new SmartJurnalError(
      "Ini seperti suntikan modal. Pilih tipe «Suntikan modal (3100)», bukan Pendapatan lain-lain.",
      400,
    );
  }
  if (tipe === "SUNTIKAN_MODAL" && /\b(pendapatan\s*lain|bunga|jasa\s*luar)\b/i.test(catatan)) {
    throw new SmartJurnalError(
      "Bukan modal pemilik? Gunakan «Pendapatan lain-lain (4300)» atau tipe yang sesuai.",
      400,
    );
  }
  const label = smartJurnalTipeLabel[tipe];
  const keterangan = (catatan ? `${label} — ${catatan}` : label).slice(0, 255);

  const akunIds = await loadAkunIdsForTipe(tipe, kasKodeVal, tujuanKode);
  const baris = buildSmartJurnalBaris(tipe, nominal, akunIds, kasKodeVal, tujuanKode);

  try {
    return await createJurnal(
      {
        tanggal,
        keterangan,
        status: statusRaw as "DRAFT" | "PENDING",
        baris,
        sumber: "SMART",
      },
      userId,
    );
  } catch (error) {
    if (error instanceof JurnalError) {
      throw new SmartJurnalError(error.message, error.status);
    }
    throw error;
  }
}
