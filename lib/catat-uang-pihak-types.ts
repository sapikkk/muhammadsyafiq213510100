import { smartJurnalTipe, type SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";

export type CatatUangPihakOption = {
  key: string;
  label: string;
  group: string;
};

export type CatatUangPihakBundle = {
  petani: CatatUangPihakOption[];
  pelanggan: CatatUangPihakOption[];
  pemilik: CatatUangPihakOption[];
};

export type PihakUiMode = "karyawan" | "pemilik" | "pelanggan" | "umum" | null;

export function pihakModeForSmartJurnalClient(tipe: SmartJurnalTipe): PihakUiMode {
  switch (tipe) {
    case "GAJI_PETANI":
      return "karyawan";
    case "PRIVE":
      return "pemilik";
    case "TERIMA_PIUTANG":
      return "pelanggan";
    case "BAYAR_HUTANG":
    case "PEMBELIAN_BAHAN_TUNAI":
    case "PEMBELIAN_BAHAN_KREDIT":
    case "BELI_BENIH_TUNAI":
    case "BEBAN_OPERASIONAL":
    case "BEBAN_PENGIRIMAN":
    case "PENDAPATAN_LAIN":
    case "BAYAR_LISTRIK":
    case "BAYAR_BUNGA":
    case "BELI_ASET_TUNAI":
      return "umum";
    default:
      return null;
  }
}

export function isSmartJurnalTipe(raw: string): raw is SmartJurnalTipe {
  return (smartJurnalTipe as readonly string[]).includes(raw);
}
