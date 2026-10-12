export type PiutangUmur = "current" | "31-60" | "61-90" | "90plus";

export type PiutangPenjualanRow = {
  id: number;
  nomor_so: string;
  pelanggan_nama: string;
  total: string;
  sisa_piutang: string;
  terkirim_pada: string | null;
  hari_tertunggak: number;
  umur: PiutangUmur;
};

export const labelUmurPiutang: Record<PiutangUmur, string> = {
  current: "0–30 hari",
  "31-60": "31–60 hari",
  "61-90": "61–90 hari",
  "90plus": "Lebih dari 90 hari",
};

export function klasifikasiUmurPiutang(hari: number): PiutangUmur {
  if (hari <= 30) return "current";
  if (hari <= 60) return "31-60";
  if (hari <= 90) return "61-90";
  return "90plus";
}
