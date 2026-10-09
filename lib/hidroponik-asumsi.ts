/** Asumsi operasional semai hidroponik (rockwool slab → dadu). */
export const ROCKWOOL = {
  /** Ukuran slab umum di pasar (cm). */
  slabCm: { panjang: 100, lebar: 15, tebal: 7.5 },
  /** Dadu semai setelah potong (cm). */
  daduCm: 2.5,
  /** 100/2,5 × 15/2,5 × 7,5/2,5 */
  daduPerSlab: 720,
  slabPerBal: 16,
} as const;

/** Kisaran referensi pasar — dipakai di UI bantuan, bukan validasi keras. */
export const BIJI_PER_GRAM_KISARAN = {
  selada: { min: 600, max: 1000, tipikal: 800 },
  pakcoy: { min: 250, max: 350, tipikal: 300 },
  kailan: { min: 250, max: 300, tipikal: 275 },
  kale: { min: 200, max: 300, tipikal: 250 },
} as const;

export function estimasiSlabRockwool(jumlahBibit: number): number {
  if (!Number.isFinite(jumlahBibit) || jumlahBibit <= 0) return 0;
  return Math.ceil(jumlahBibit / ROCKWOOL.daduPerSlab);
}

export function estimasiGramBenih(jumlahBibit: number, bijiPerGram: number): number {
  if (!Number.isFinite(jumlahBibit) || jumlahBibit <= 0 || bijiPerGram <= 0) return 0;
  return jumlahBibit / bijiPerGram;
}

export function formatAngkaSingkat(n: number, digit = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("id-ID", {
    maximumFractionDigits: digit,
    minimumFractionDigits: 0,
  });
}
