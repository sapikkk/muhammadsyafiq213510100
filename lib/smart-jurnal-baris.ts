import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import type { SumberKasKode } from "@/lib/kas-sumber";
import type { SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";

export type SmartJurnalTipeSpec = {
  debit?: string;
  kredit?: string;
  needsKas?: boolean;
  needsKasTujuan?: boolean;
};

/** Pemetaan tipe → kode akun (tanpa server-only — bisa diuji skrip CI). */
export const SMART_JURNAL_AKUN_BY_TIPE: Partial<Record<SmartJurnalTipe, SmartJurnalTipeSpec>> = {
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
  PENDAPATAN_LAIN: { debit: "KAS", kredit: AKUN_KODE.PENDAPATAN_LAIN, needsKas: true },
  GAJI_PETANI: { debit: "5200", kredit: "KAS", needsKas: true },
  TERIMA_PIUTANG: { debit: "KAS", kredit: "1200", needsKas: true },
  BEBAN_PENGIRIMAN: { debit: "5400", kredit: "KAS", needsKas: true },
  BELI_BENIH_TUNAI: { debit: "1310", kredit: "KAS", needsKas: true },
  BAYAR_LISTRIK: { debit: "5230", kredit: "KAS", needsKas: true },
};

export function resolveSmartJurnalSideKode(
  side: string,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): string {
  if (side === "KAS") return kasKode;
  if (side === "KAS_TUJUAN") return tujuanKode ?? kasKode;
  return side;
}

export function collectSmartJurnalAkunKodes(
  tipe: SmartJurnalTipe,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): Set<string> {
  const spec = SMART_JURNAL_AKUN_BY_TIPE[tipe];
  if (!spec?.debit || !spec.kredit) {
    throw new Error(`Tipe Smart Jurnal belum dikonfigurasi: ${tipe}`);
  }
  const kodes = new Set<string>();
  for (const side of [spec.debit, spec.kredit]) {
    const k = resolveSmartJurnalSideKode(side, kasKode, tujuanKode);
    if (k !== "KAS" && k !== "KAS_TUJUAN") kodes.add(k);
  }
  kodes.add(kasKode);
  if (tujuanKode) kodes.add(tujuanKode);
  return kodes;
}

export type SmartJurnalBarisRow = {
  akunId: number;
  debit: Prisma.Decimal;
  kredit: Prisma.Decimal;
};

export function buildSmartJurnalBaris(
  tipe: SmartJurnalTipe,
  nominal: Prisma.Decimal,
  akunIds: Map<string, number>,
  kasKode: SumberKasKode,
  tujuanKode?: SumberKasKode,
): SmartJurnalBarisRow[] {
  const spec = SMART_JURNAL_AKUN_BY_TIPE[tipe];
  if (!spec?.debit || !spec.kredit) {
    throw new Error("Tipe Smart Jurnal belum dikonfigurasi.");
  }
  const nol = new Prisma.Decimal(0);
  const debitKode = resolveSmartJurnalSideKode(spec.debit, kasKode, tujuanKode);
  const kreditKode = resolveSmartJurnalSideKode(spec.kredit, kasKode, tujuanKode);
  const debitId = akunIds.get(debitKode);
  const kreditId = akunIds.get(kreditKode);
  if (!debitId || !kreditId) {
    throw new Error("Akun untuk tipe ini belum tersedia di COA.");
  }
  return [
    { akunId: debitId, debit: nominal, kredit: nol },
    { akunId: kreditId, debit: nol, kredit: nominal },
  ];
}
