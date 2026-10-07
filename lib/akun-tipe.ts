// Terpisah dari lib/akun.ts supaya komponen client tidak ikut memuat Prisma.
export const tipeAkunLabel = {
  ASET: "Aset",
  KEWAJIBAN: "Kewajiban",
  MODAL: "Modal",
  PENDAPATAN: "Pendapatan",
  BEBAN: "Beban",
} as const;

export type TipeAkunKey = keyof typeof tipeAkunLabel;

export const tipeAkunList = Object.keys(tipeAkunLabel) as TipeAkunKey[];
