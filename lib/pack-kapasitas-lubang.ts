import "server-only";

import { Prisma } from "@prisma/client";
import {
  BIJI_PER_LUBANG_DEFAULT as BIJI_DEFAULT,
  kapasitasLubangBenihPack as kapasitasBenihMath,
  kapasitasLubangMediaPack as kapasitasMediaMath,
  gramBenihUntukLubangAngka,
  mediaUnitUntukLubangAngka,
  validasiKapasitasPackBenih as validasiBenihMath,
  validasiKapasitasPackMedia as validasiMediaMath,
} from "@/lib/pack-kapasitas-lubang-math";

export const BIJI_PER_LUBANG_DEFAULT = BIJI_DEFAULT;

export function kapasitasLubangBenihPack(
  beratGram: number | Prisma.Decimal,
  bijiPerGram: number | Prisma.Decimal,
  bijiPerLubang: number | Prisma.Decimal = BIJI_PER_LUBANG_DEFAULT,
): number {
  return kapasitasBenihMath(Number(beratGram), Number(bijiPerGram), Number(bijiPerLubang));
}

export function kapasitasLubangMediaPack(
  sisaUnit: number | Prisma.Decimal,
  itemKode: string,
): number {
  return kapasitasMediaMath(Number(sisaUnit), itemKode);
}

export function gramBenihUntukLubang(
  jumlahLubang: number,
  bijiPerGram: number | Prisma.Decimal,
): Prisma.Decimal {
  const gram = gramBenihUntukLubangAngka(jumlahLubang, Number(bijiPerGram));
  return new Prisma.Decimal(gram.toFixed(4));
}

export function mediaUnitUntukLubang(jumlahLubang: number): Prisma.Decimal {
  const slab = mediaUnitUntukLubangAngka(jumlahLubang);
  return new Prisma.Decimal(slab);
}

export function validasiKapasitasPackBenih(
  jumlahLubang: number,
  sisaUnitGram: Prisma.Decimal,
  bijiPerGram: Prisma.Decimal,
): ReturnType<typeof validasiBenihMath> {
  return validasiBenihMath(jumlahLubang, Number(sisaUnitGram), Number(bijiPerGram));
}

export function validasiKapasitasPackMedia(
  jumlahLubang: number,
  sisaUnit: Prisma.Decimal,
  itemKode: string,
): ReturnType<typeof validasiMediaMath> {
  return validasiMediaMath(jumlahLubang, Number(sisaUnit), itemKode);
}
