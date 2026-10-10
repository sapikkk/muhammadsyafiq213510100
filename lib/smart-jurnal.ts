import { Prisma } from "@prisma/client";
import { createJurnal, JurnalError, type JurnalInput } from "@/lib/jurnal";
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

export { smartJurnalTipe, smartJurnalTipeLabel, type SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";

export class SmartJurnalError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const AKUN_BY_TIPE: Partial<
  Record<SmartJurnalTipe, { debit?: string; kredit?: string; needsKas?: boolean; needsKasTujuan?: boolean }>
> = {
  BEBAN_OPERASIONAL: { debit: "5230", kredit: "KAS", needsKas: true },
  PRIVE: { debit: "3200", kredit: "KAS", needsKas: true },
  SUNTIKAN_MODAL: { debit: "KAS", kredit: "3100", needsKas: true },
  TRANSFER_KAS: { debit: "KAS_TUJUAN", kredit: "KAS", needsKas: true, needsKasTujuan: true },
  PINJAMAN_MASUK: { debit: "KAS", kredit: "2100", needsKas: true },
  BAYAR_HUTANG: { debit: "2100", kredit: "KAS", needsKas: true },
  BELI_ASET_TUNAI: { debit: "1500", kredit: "KAS", needsKas: true },
  BAYAR_BUNGA: { debit: "5500", kredit: "KAS", needsKas: true },
  PENYUSUTAN_GREENHOUSE: { debit: "5210", kredit: "1510", needsKas: false },
  PENYUSUTAN_INSTALASI: { debit: "5220", kredit: "1530", needsKas: false },
  PEMBELIAN_BAHAN_TUNAI: { debit: "1330", kredit: "KAS", needsKas: true },
  PEMBELIAN_BAHAN_KREDIT: { debit: "1330", kredit: "2100", needsKas: false },
  PENDAPATAN_LAIN: { debit: "KAS", kredit: "4100", needsKas: true },
  GAJI_PETANI: { debit: "5200", kredit: "KAS", needsKas: true },
  TERIMA_PIUTANG: { debit: "KAS", kredit: "1200", needsKas: true },
};

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

function resolveSideKode(side: string, kasKode: SumberKasKode, tujuanKode?: SumberKasKode): string {
  if (side === "KAS") return kasKode;
  if (side === "KAS_TUJUAN") return tujuanKode ?? kasKode;
  return side;
}

export function buildSmartJurnalBaris(
  tipe: SmartJurnalTipe,
  nominal: Prisma.Decimal,
  akunIds: Map<string, number>,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): JurnalInput["baris"] {
  const spec = AKUN_BY_TIPE[tipe];
  if (!spec?.debit || !spec.kredit) {
    throw new SmartJurnalError("Tipe Smart Jurnal belum dikonfigurasi.", 500);
  }
  const nol = new Prisma.Decimal(0);
  const debitKode = resolveSideKode(spec.debit, kasKode, tujuanKode);
  const kreditKode = resolveSideKode(spec.kredit, kasKode, tujuanKode);
  const debitId = akunIds.get(debitKode);
  const kreditId = akunIds.get(kreditKode);
  if (!debitId || !kreditId) {
    throw new SmartJurnalError("Akun untuk tipe ini belum tersedia di COA.", 400);
  }
  return [
    { akunId: debitId, debit: nominal, kredit: nol },
    { akunId: kreditId, debit: nol, kredit: nominal },
  ];
}

async function loadAkunIdsForTipe(
  tipe: SmartJurnalTipe,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): Promise<Map<string, number>> {
  const spec = AKUN_BY_TIPE[tipe]!;
  const kodes = new Set<string>();
  for (const side of [spec.debit!, spec.kredit!]) {
    const k = resolveSideKode(side, kasKode, tujuanKode);
    if (k !== "KAS" && k !== "KAS_TUJUAN") kodes.add(k);
  }
  kodes.add(kasKode);
  if (tujuanKode) kodes.add(tujuanKode);

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
  const spec = AKUN_BY_TIPE[tipe]!;

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
