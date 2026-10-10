import type { VarietasStatus } from "@/lib/varietas-status";

export type SerializedVarietas = {
  id: number;
  nama: string;
  hargaBenihPerGram: string;
  bijiPerGram: string;
  dayaKecambah: string;
  lamaSemai: number;
  lamaDiKolam: number;
  beratRataRataPanen: string;
  beratPerPack: string;
  hargaJualCurah: string;
  hargaJualPack: string;
  status: VarietasStatus;
  jumlahSiklus: number;
};
