import type { PetaniAlurLangkah } from "@/lib/petani-alur-langkah";
import { PETANI_ALUR_LANGKAH } from "@/lib/petani-alur-langkah";

export type PetaniModulKey =
  | "siklus"
  | "inventaris"
  | "active-pack"
  | "varietas"
  | "pengiriman"
  | "stok-rendah";

const MODUL_STEP: Record<PetaniModulKey, number> = {
  siklus: 1,
  inventaris: 3,
  "active-pack": 3,
  varietas: 3,
  pengiriman: 4,
  "stok-rendah": 3,
};

export function petaniLangkahUntukModul(key: PetaniModulKey): PetaniAlurLangkah {
  const no = MODUL_STEP[key];
  return PETANI_ALUR_LANGKAH.find((s) => s.no === no) ?? PETANI_ALUR_LANGKAH[0]!;
}
