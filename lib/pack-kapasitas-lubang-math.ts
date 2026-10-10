import { ROCKWOOL, estimasiGramBenih, estimasiSlabRockwool } from "@/lib/hidroponik-asumsi";
import { isItemBenih, isItemMedia } from "@/lib/siklus-pack";

/** Bibit per lubang (MVP v2-C.1): 1 biji = 1 lubang. */
export const BIJI_PER_LUBANG_DEFAULT = 1;

/** Kapasitas lubang dari isi pack benih (gram). */
export function kapasitasLubangBenihPack(
  beratGram: number,
  bijiPerGram: number,
  bijiPerLubang: number = BIJI_PER_LUBANG_DEFAULT,
): number {
  if (
    !Number.isFinite(beratGram) ||
    beratGram <= 0 ||
    !Number.isFinite(bijiPerGram) ||
    bijiPerGram <= 0 ||
    bijiPerLubang <= 0
  ) {
    return 0;
  }
  return Math.floor((beratGram * bijiPerGram) / bijiPerLubang);
}

/** Kapasitas lubang dari pack media rockwool (satuan slab/pcs). */
export function kapasitasLubangMediaPack(sisaUnit: number, itemKode: string): number {
  if (!Number.isFinite(sisaUnit) || sisaUnit <= 0) return 0;
  if (!isItemMedia(itemKode)) return 0;
  if (itemKode.startsWith("RW-")) {
    return Math.floor(sisaUnit * ROCKWOOL.daduPerSlab);
  }
  return Math.floor(sisaUnit);
}

export function gramBenihUntukLubangAngka(jumlahLubang: number, bijiPerGram: number): number {
  return estimasiGramBenih(jumlahLubang, bijiPerGram);
}

export function mediaUnitUntukLubangAngka(jumlahLubang: number): number {
  return estimasiSlabRockwool(jumlahLubang);
}

export function validasiKapasitasPackBenih(
  jumlahLubang: number,
  sisaUnitGram: number,
  bijiPerGram: number,
): { ok: true; kapasitas: number } | { ok: false; kapasitas: number; message: string } {
  const kap = kapasitasLubangBenihPack(sisaUnitGram, bijiPerGram);
  if (jumlahLubang > kap) {
    return {
      ok: false,
      kapasitas: kap,
      message: `Pack benih cukup untuk ${kap} lubang (sisa ${sisaUnitGram} g), butuh ${jumlahLubang}.`,
    };
  }
  return { ok: true, kapasitas: kap };
}

export function validasiKapasitasPackMedia(
  jumlahLubang: number,
  sisaUnit: number,
  itemKode: string,
): { ok: true; kapasitas: number } | { ok: false; kapasitas: number; message: string } {
  const kap = kapasitasLubangMediaPack(sisaUnit, itemKode);
  if (kap <= 0) {
    return { ok: false, kapasitas: 0, message: "Pack media tidak mendukung kapasitas lubang." };
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

export { isItemBenih, isItemMedia };
