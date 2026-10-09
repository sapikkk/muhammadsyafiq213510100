// Terpisah dari lib/jurnal.ts supaya komponen client tidak ikut memuat Prisma.
export const statusJurnalLabel = {
  DRAFT: "Draf",
  PENDING: "Menunggu",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
} as const;

export type StatusJurnalKey = keyof typeof statusJurnalLabel;

export const statusJurnalList = Object.keys(
  statusJurnalLabel,
) as StatusJurnalKey[];
