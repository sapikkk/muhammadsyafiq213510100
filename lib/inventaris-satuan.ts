import type { SatuanInventaris } from "@prisma/client";

export const satuanInventarisList: SatuanInventaris[] = [
  "GRAM",
  "KG",
  "PCS",
  "PACK",
  "LITER",
];

export const satuanInventarisLabel: Record<SatuanInventaris, string> = {
  GRAM: "gram",
  KG: "kg",
  PCS: "pcs",
  PACK: "pack",
  LITER: "liter",
};
