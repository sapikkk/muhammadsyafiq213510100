import type { TindakanAir } from "@/lib/air-kolam-tindakan";

export const SEKTOR_PAPAN = 6;

export type TitikRiwayatKolam = {
  waktu: string;
  ph: number;
  ppm: number;
  suhu: number;
};

export type SektorKolamPapan = {
  slot: number;
  kolamId: number | null;
  nama: string;
  greenhouse: string;
  kapasitas: number;
  kosong: boolean;
  siklus: null | {
    id: number;
    sayur: string;
    fase: string;
    jumlahDisemai: number;
    totalSusut: number;
    bolehMonitor: boolean;
    bolehGagal: boolean;
  };
  bacaanTerakhir: null | { ph: number; ppm: number; suhu: number; waktu: string };
  tindakan: TindakanAir | null;
  riwayat: TitikRiwayatKolam[];
};
