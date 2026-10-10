import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

/** Tahap kegagalan (F11 / US3.5) — selaras alur produksi. */
export const tahapKegagalanOptions = [
  { value: "SEMAI", label: "Semai awal" },
  { value: "SPROUT_DAUN", label: "Sprout sampai daun ke-4" },
  { value: "PINDAH_KOLAM", label: "Pindah kolam" },
  { value: "PENDEWASAAN", label: "Di kolam / pendewasaan" },
  { value: "PANEN_SORTASI", label: "Tidak layak saat panen" },
] as const;

export type TahapKegagalan = (typeof tahapKegagalanOptions)[number]["value"];

export function labelTahap(tahap: string) {
  const found = tahapKegagalanOptions.find((o) => o.value === tahap);
  if (found) return found.label;
  return isFaseProduksi(tahap) ? faseLabel[tahap] : tahap;
}
