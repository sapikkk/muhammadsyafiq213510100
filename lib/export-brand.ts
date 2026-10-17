/** Salinan teks kopsurat PDF/XLSX — selaras Figma Cover & Style Guide. */
export const EXPORT_BRAND = {
  legalName: "Kokonus Farm",
  tagline: "Tata kelola biaya produksi hidroponik rakit apung",
  documentCodePrefix: "KKN",
  footerLeft: "2026 © Kokonus Farm. Hak cipta dilindungi.",
  footerRight: "Dokumen internal — verifikasi saldo di aplikasi.",
} as const;

export function exportDocumentMetaLines(extra?: string[]): string[] {
  return [EXPORT_BRAND.legalName, EXPORT_BRAND.tagline, ...(extra ?? [])];
}
