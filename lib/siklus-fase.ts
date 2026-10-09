/** Urutan fase produksi — hanya maju, tidak lompat (US3.2 / F10). */
export const urutanFase = [
  "SEMAI",
  "SPROUT_DAUN",
  "TAMBAL",
  "PINDAH_KOLAM",
  "PENDEWASAAN",
  "PANEN",
  "SELESAI",
] as const;

export type FaseProduksi = (typeof urutanFase)[number];

export const faseLabel: Record<FaseProduksi, string> = {
  SEMAI: "Semai",
  SPROUT_DAUN: "Sprout / daun",
  TAMBAL: "Tambal susulan",
  PINDAH_KOLAM: "Pindah kolam",
  PENDEWASAAN: "Pendewasaan",
  PANEN: "Panen & sortasi",
  SELESAI: "Selesai",
};

export function isFaseProduksi(value: string): value is FaseProduksi {
  return (urutanFase as readonly string[]).includes(value);
}

export function faseBerikutnya(saatIni: string): FaseProduksi | null {
  if (!isFaseProduksi(saatIni)) return null;
  const idx = urutanFase.indexOf(saatIni);
  if (idx < 0 || idx >= urutanFase.length - 1) return null;
  return urutanFase[idx + 1];
}
