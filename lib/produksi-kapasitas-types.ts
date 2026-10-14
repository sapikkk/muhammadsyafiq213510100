import type { FaseProduksi } from "@/lib/siklus-fase";

export type KapasitasKolamRingkas = {
  totalLubang: number;
  lubangTerisi: number;
  lubangKosong: number;
  pctTerisi: number;
  pctKosong: number;
  kolamProduksi: number;
  kolamKosong: number;
};

export type KolamIsiBaris = {
  kolamId: number;
  kapasitas: number;
  terisi: number;
  pctTerisi: number;
  pctKosong: number;
  fase: string | null;
};

export type FaseMetrikBaris = {
  fase: FaseProduksi;
  label: string;
  jumlahBatch: number;
  lubang: number;
};

export type ProduksiRingkasan = {
  kapasitas: KapasitasKolamRingkas;
  fase: FaseMetrikBaris[];
  siapJualLubang: number;
  kolamIsi: KolamIsiBaris[];
};
