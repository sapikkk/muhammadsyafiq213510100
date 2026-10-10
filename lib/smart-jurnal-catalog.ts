/** Katalog tipe Smart Jurnal — aman di-import komponen client. */
export const smartJurnalTipe = [
  "BEBAN_OPERASIONAL",
  "PRIVE",
  "SUNTIKAN_MODAL",
  "TRANSFER_KAS",
  "PINJAMAN_MASUK",
  "BAYAR_HUTANG",
  "BELI_ASET_TUNAI",
  "BAYAR_BUNGA",
  "PENYUSUTAN_GREENHOUSE",
  "PENYUSUTAN_INSTALASI",
] as const;
export type SmartJurnalTipe = (typeof smartJurnalTipe)[number];

export const smartJurnalTipeLabel: Record<SmartJurnalTipe, string> = {
  BEBAN_OPERASIONAL: "Beban operasional (5230)",
  PRIVE: "Prive pemilik (3200)",
  SUNTIKAN_MODAL: "Suntikan modal (3100)",
  TRANSFER_KAS: "Transfer antar kas/bank",
  PINJAMAN_MASUK: "Pinjaman masuk (Dr kas · Cr hutang)",
  BAYAR_HUTANG: "Bayar hutang usaha (2100)",
  BELI_ASET_TUNAI: "Beli aset tunai (1500 greenhouse)",
  BAYAR_BUNGA: "Beban bunga pinjaman (5500)",
  PENYUSUTAN_GREENHOUSE: "Penyusutan greenhouse (5210 · 1510)",
  PENYUSUTAN_INSTALASI: "Penyusutan instalasi listrik (5220 · 1530)",
};
