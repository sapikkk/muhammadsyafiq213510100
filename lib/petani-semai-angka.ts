/** Angka form petani singkat → lubang yang disimpan di siklus. */

export function parseBaki(raw: unknown): number {
  const n = Number(String(raw ?? "").replace(/\s/g, "").replace(",", "."));
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error("Isi berapa baki, bilangan bulat lebih dari nol.");
  }
  if (n > 500) {
    throw new Error("Jumlah baki terlalu besar.");
  }
  return n;
}

/** "800-1000", "800 – 1000", "800 s.d. 1000", atau satu angka. */
export function parseKisaranSemai(raw: unknown): { min: number; max: number; tengah: number } {
  const text = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/s\.?d\.?/g, "-")
    .replace(/–|—|hingga|sampai/g, "-")
    .replace(/\s+/g, "");
  if (!text) {
    throw new Error("Isi kisaran jumlah yang disemai.");
  }
  const parts = text.split("-").filter(Boolean);
  const nums = parts.map((p) => Number(p.replace(",", ".")));
  if (nums.some((n) => !Number.isFinite(n) || n <= 0)) {
    throw new Error("Kisaran harus angka. Contoh: 800-1000.");
  }
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const tengah = Math.round((min + max) / 2);
  return { min, max, tengah };
}

export function lubangDariSemaiSingkat(opts: {
  baki: number;
  kisaranTengah: number;
  kapasitasKolam: number;
}): number {
  const dariBaki = opts.baki * 32;
  const calon = opts.kisaranTengah > 0 ? opts.kisaranTengah : dariBaki;
  const n = Math.max(1, Math.round(calon));
  if (n > opts.kapasitasKolam) {
    throw new Error(
      `Kisaran ${n} lubang melebihi kapasitas kolam (${opts.kapasitasKolam}). Kurangi baki atau kisaran.`,
    );
  }
  return n;
}

export function catatanSemaiSingkat(baki: number, kisaranAsli: string): string {
  return `Semai ${baki} baki. Kisaran ${kisaranAsli.trim()}.`;
}
