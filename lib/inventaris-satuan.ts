/** Satuan inventaris (mirror enum Prisma) — tanpa import @prisma/client di client bundle. */

export const satuanInventarisList = ["GRAM", "KG", "PCS", "PACK", "LITER"] as const;

export type SatuanInventaris = (typeof satuanInventarisList)[number];

export const satuanInventarisLabel: Record<SatuanInventaris, string> = {
  GRAM: "gram",
  KG: "kg",
  PCS: "pcs",
  PACK: "pack",
  LITER: "liter",
};
