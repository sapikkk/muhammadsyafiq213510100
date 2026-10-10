import type { KolamStatus } from "@/lib/infrastruktur-kolam-status";

export type SerializedKolam = {
  id: number;
  greenhouseId: number;
  nama: string;
  kapasitasLubang: number;
  status: KolamStatus | string;
};

export type SerializedGreenhouse = {
  id: number;
  lahanId: number;
  nama: string;
  nilaiInvestasi: string;
  umurEkonomis: number;
  depresiasiPerBulan: string;
  kolam: SerializedKolam[];
};

export type SerializedLahan = {
  id: number;
  nilaiSewa: string;
  masaSewa: number;
  amortisasiPerBulan: string;
  greenhouse: SerializedGreenhouse[];
};

export type SerializedInfrastrukturPohon = {
  totalKapasitasLubang: number;
  lahan: SerializedLahan[];
};
