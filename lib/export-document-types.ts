export type ExportFormat = "pdf" | "xlsx";
export type ExportOrientation = "portrait" | "landscape";

export type ExportTableSection = {
  title?: string;
  headers: string[];
  rows: string[][];
  /** Indeks kolom rata kanan (angka / nominal). */
  alignRight?: number[];
};

/** Kerangka unduhan: judul, meta baris, satu atau lebih tabel. */
export type ExportDocument = {
  title: string;
  subtitleLines?: string[];
  sections: ExportTableSection[];
};
