import type { OwnerSectionTab } from "@/components/owner-section-tabs";

export const TABS_VARIETAS_LAHAN: OwnerSectionTab[] = [
  { id: "varietas", epic: "1.1", label: "Data varietas", href: "/owner/varietas" },
  { id: "infra", epic: "1.2", label: "Lahan & kolam", href: "/owner/infrastruktur" },
  {
    id: "status",
    epic: "1.3",
    label: "Aktif / nonaktif",
    href: "/owner/varietas?tampilan=status",
  },
];

export const TABS_PRODUKSI: OwnerSectionTab[] = [
  { id: "siklus", epic: "2.1", label: "Monitoring siklus", href: "/owner/produksi" },
  { id: "stok", label: "Stok barang", href: "/owner/inventaris" },
  { id: "rendah", label: "Stok rendah", href: "/owner/stok-rendah" },
];

export const TABS_KEGAGALAN: OwnerSectionTab[] = [
  { id: "menunggu", epic: "3.1", label: "Catat kegagalan", href: "/owner/kegagalan-susut?bagian=menunggu" },
  { id: "total", epic: "3.2", label: "Total susut", href: "/owner/kegagalan-susut?bagian=total" },
  {
    id: "klasifikasi",
    epic: "3.3",
    label: "Normal vs tidak normal",
    href: "/owner/kegagalan-susut?bagian=klasifikasi",
  },
  { id: "layak", epic: "3.4", label: "Layak jual", href: "/owner/kegagalan-susut?bagian=layak" },
  {
    id: "tidak-layak",
    epic: "3.5",
    label: "Tidak layak jual",
    href: "/owner/kegagalan-susut?bagian=tidak-layak",
  },
  {
    id: "per-siklus",
    epic: "3.6",
    label: "Susut per siklus",
    href: "/owner/kegagalan-susut?bagian=per-siklus",
  },
];

export const TABS_BIAYA: OwnerSectionTab[] = [
  { id: "langsung", epic: "4.1", label: "Biaya langsung", href: "/owner/biaya" },
  { id: "umum", epic: "4.2", label: "Biaya umum", href: "/owner/biaya" },
  { id: "alokasi", epic: "4.3", label: "Alokasi biaya", href: "/owner/biaya" },
  { id: "kolam", epic: "4.4", label: "Biaya per kolam", href: "/owner/biaya" },
  { id: "hpp-kg", epic: "4.5", label: "HPP per kg", href: "/owner/evaluasi" },
  { id: "hpp-lubang", epic: "4.6", label: "HPP per lubang", href: "/owner/evaluasi" },
  { id: "cek-hpp", epic: "4.7", label: "Cek HPP", href: "/owner/evaluasi" },
  { id: "hpp-pack", epic: "4.8", label: "HPP per pack", href: "/owner/evaluasi" },
];

export const TABS_PENJUALAN: OwnerSectionTab[] = [
  { id: "pesanan", epic: "5.1", label: "Pesanan jual", href: "/owner/penjualan" },
  { id: "piutang", label: "Piutang belum lunas", href: "/owner/penjualan/piutang" },
  { id: "penerimaan", epic: "5.3", label: "Catat pendapatan", href: "/owner/jurnal" },
];

export const TABS_EVALUASI: OwnerSectionTab[] = [
  { id: "untung", epic: "6.1", label: "Untung vs harga jual", href: "/owner/evaluasi" },
  { id: "impas", epic: "6.2", label: "Titik impas", href: "/owner/evaluasi" },
  { id: "kolam", epic: "6.3", label: "Kolam kosong", href: "/owner/evaluasi" },
  { id: "harga", epic: "6.4", label: "Keputusan harga", href: "/owner/evaluasi" },
];
