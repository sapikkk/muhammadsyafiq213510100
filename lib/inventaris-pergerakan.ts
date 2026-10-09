import type { TipePergerakan } from "@prisma/client";

export const tipePergerakanList: TipePergerakan[] = ["IN", "OUT", "ADJUST"];

export const tipePergerakanLabel: Record<TipePergerakan, string> = {
  IN: "Masuk",
  OUT: "Keluar",
  ADJUST: "Penyesuaian",
};
