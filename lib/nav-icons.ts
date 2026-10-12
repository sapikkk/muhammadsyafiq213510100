import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpen,
  Calculator,
  Coins,
  Contact,
  FileDown,
  Landmark,
  LayoutGrid,
  LineChart,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Wallet,
} from "lucide-react";

/** Ikon modul keuangan (Lucide, MIT — sama paket dengan sidebar). */
export const FINANCE_MODULE_ICONS: Record<string, LucideIcon> = {
  ringkasan: LayoutGrid,
  transaksi: Banknote,
  penjualan: ShoppingCart,
  biaya: Coins,
  "buku-besar": BookOpen,
  "tutup-buku": Calculator,
  analisis: TrendingUp,
  laporan: FileDown,
  prive: PiggyBank,
  rekening: Landmark,
};

export function financeModuleIcon(id: string): LucideIcon {
  return FINANCE_MODULE_ICONS[id] ?? Wallet;
}

/** Ikon arus kas / kas (tab keuangan Owner). */
export const ICON_ARUS_KAS = Landmark;

/** Ikon evaluasi / untung. */
export const ICON_EVALUASI = LineChart;

/** Ikon produksi & siklus (tanaman). */
export const ICON_PRODUKSI = Sprout;

/** Ikon pesanan / faktur. */
export const ICON_PENJUALAN = Receipt;

/** Ikon pelanggan. */
export const ICON_PELANGGAN = Contact;
