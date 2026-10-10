import { Prisma } from "@prisma/client";
import { ROCKWOOL, estimasiGramBenih, estimasiSlabRockwool } from "@/lib/hidroponik-asumsi";
import { isItemBenih, isItemMedia } from "@/lib/siklus-pack";

/** Bibit per lubang (MVP v2-C.1): 1 biji = 1 lubang. */
export const BIJI_PER_LUBANG_DEFAULT = 1;

/**
 * Kapasitas lubang dari isi pack benih (gram): berat × biji/gram ÷ biji/lubang.
 * Blueprint §2 — `docs/blueprint/akuntansi-logistik-hidroponik.md`.
 */
export function kapasitasLubangBenihPack(
  beratGram: number | Prisma.Decimal,
  bijiPerGram: number | Prisma.Decimal,
  bijiPerLubang: number | Prisma.Decimal = BIJI_PER_LUBANG_DEFAULT,
): number {
  const berat = Number(beratGram);
  const bpg = Number(bijiPerGram);
  const bpl = Number(bijiPerLubang);
  if (!Number.isFinite(berat) || berat <= 0 || !Number.isFinite(bpg) || bpg <= 0 || bpl <= 0) {
    return 0;
  }
  return Math.floor((berat * bpg) / bpl);
}

/** Kapasitas lubang dari pack media rockwool (satuan slab/pcs). */
export function kapasitasLubangMediaPack(sisaUnit: number | Prisma.Decimal, itemKode: string): number {
  const unit = Number(sisaUnit);
  if (!Number.isFinite(unit) || unit <= 0) return 0;
  if (!isItemMedia(itemKode)) return 0;
  if (itemKode.startsWith("RW-")) {
    return Math.floor(unit * ROCKWOOL.daduPerSlab);
  }
  return Math.floor(unit);
}

/** Gram benih untuk semai N lubang. */
export function gramBenihUntukLubang(
  jumlahLubang: number,
  bijiPerGram: number | Prisma.Decimal,
): Prisma.Decimal {
  const gram = estimasiGramBenih(jumlahLubang, Number(bijiPerGram));
  return new Prisma.Decimal(gram.toFixed(4));
}

/** Unit media (slab) proporsional untuk N lubang. */
export function mediaUnitUntukLubang(jumlahLubang: number): Prisma.Decimal {
  const slab = estimasiSlabRockwool(jumlahLubang);
  return new Prisma.Decimal(slab);
}

export function validasiKapasitasPackBenih(
  jumlahLubang: number,
  sisaUnitGram: Prisma.Decimal,
  bijiPerGram: Prisma.Decimal,
): { ok: true; kapasitas: number } | { ok: false; kapasitas: number; message: string } {
  const kap = kapasitasLubangBenihPack(sisaUnitGram, bijiPerGram);
  if (jumlahLubang > kap) {
    return {
      ok: false,
      kapasitas: kap,
      message: `Pack benih cukup untuk ${kap} lubang (sisa ${sisaUnitGram.toString()} g), butuh ${jumlahLubang}.`,
    };
  }
  return { ok: true, kapasitas: kap };
}

export function validasiKapasitasPackMedia(
  jumlahLubang: number,
  sisaUnit: Prisma.Decimal,
  itemKode: string,
): { ok: true; kapasitas: number } | { ok: false; kapasitas: number; message: string } {
  const kap = kapasitasLubangMediaPack(sisaUnit, itemKode);
  if (kap <= 0) {
    return { ok: false, kapasitas: 0, message: "Pack media tidak mendukung hitung kapasitas lubang." };
  }
  if (jumlahLubang > kap) {
    return {
      ok: false,
      kapasitas: kap,
      message: `Pack media cukup untuk ${kap} lubang, butuh ${jumlahLubang}.`,
    };
  }
  return { ok: true, kapasitas: kap };
}
