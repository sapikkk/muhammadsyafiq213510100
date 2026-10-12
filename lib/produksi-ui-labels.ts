/** Label layar produksi & penjualan — lokasi + varietas dulu, kode batch opsional. */

export type SiklusLabelParts = {
  greenhouseNama: string;
  kolamNama: string;
  varietasNama: string;
  jumlahLayak?: number;
  kodeBatch?: string;
};

export function partsFromSiklusNested(s: {
  kode_batch?: string;
  varietas: { nama: string };
  kolam: { nama: string; greenhouse: { nama: string } };
}): SiklusLabelParts {
  return {
    greenhouseNama: s.kolam.greenhouse.nama,
    kolamNama: s.kolam.nama,
    varietasNama: s.varietas.nama,
    kodeBatch: s.kode_batch,
  };
}

export function partsFromSerializeSiklus(s: {
  kode_batch: string;
  varietas_nama: string;
  kolam_nama: string;
  greenhouse_nama: string;
}): SiklusLabelParts {
  return {
    greenhouseNama: s.greenhouse_nama,
    kolamNama: s.kolam_nama,
    varietasNama: s.varietas_nama,
    kodeBatch: s.kode_batch,
  };
}

/** Dropdown / pilih siklus: tanpa kode batch. */
export function labelSiklusPilihBaris(parts: SiklusLabelParts): string {
  const lokasi = `${parts.greenhouseNama} · Kolam ${parts.kolamNama}`;
  const varText = parts.varietasNama;
  if (parts.jumlahLayak != null && parts.jumlahLayak > 0) {
    return `${lokasi} · ${varText} (${parts.jumlahLayak} lubang layak)`;
  }
  return `${lokasi} · ${varText}`;
}

/** Judul baris / detail: greenhouse · kolam · varietas. */
export function labelBarisProduksiUtama(parts: SiklusLabelParts): string {
  return `${parts.greenhouseNama} · Kolam ${parts.kolamNama} · ${parts.varietasNama}`;
}

/** Kolom tabel: varietas dulu, lokasi ringkas. */
export function labelSiklusDaftarUtama(parts: SiklusLabelParts): string {
  return `${parts.varietasNama} · ${parts.greenhouseNama} / Kolam ${parts.kolamNama}`;
}

export function labelJenisBaris(jenis: string): string {
  return jenis === "PACK" ? "Pack" : "Curah (kg)";
}

/** Prisma select untuk teks notifikasi / ringkasan siklus. */
export const siklusLabelSelect = {
  kode_batch: true,
  varietas: { select: { nama: true } },
  kolam: {
    select: {
      nama: true,
      greenhouse: { select: { nama: true } },
    },
  },
} as const;

export function ringkasanSiklusUntukTeks(s: {
  kode_batch?: string;
  varietas: { nama: string };
  kolam: { nama: string; greenhouse: { nama: string } };
}): string {
  return labelBarisProduksiUtama(partsFromSiklusNested(s));
}

/** Label lahan di layar biaya — pakai nama greenhouse jika ada. */
export function labelLahanUntukLayar(lahanId: number, greenhouseNama?: string | null): string {
  const names = greenhouseNama?.trim();
  if (names) return `Lahan · ${names}`;
  return `Lahan ${lahanId}`;
}
