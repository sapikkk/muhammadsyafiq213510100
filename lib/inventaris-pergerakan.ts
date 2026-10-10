/** Tipe pergerakan stok — tanpa Prisma (client-safe). */

export const tipePergerakanList = ["IN", "OUT", "ADJUST"] as const;

export type TipePergerakan = (typeof tipePergerakanList)[number];

export const tipePergerakanLabel: Record<TipePergerakan, string> = {
  IN: "Masuk",
  OUT: "Keluar",
  ADJUST: "Penyesuaian",
};
