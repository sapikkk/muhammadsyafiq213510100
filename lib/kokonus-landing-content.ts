import type { LucideIcon } from "lucide-react";
import { Building2, LineChart, Package, Truck, Wallet, Waves } from "lucide-react";

export type LandingNavItem = { href: string; label: string };
export type LandingFeature = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  wide?: boolean;
  tag?: string;
};
export type LandingFlowStep = { step: string; title: string; body: string };
export type LandingRoleCard = { title: string; body: string; highlights: string[] };

export const LANDING_NAV: LandingNavItem[] = [
  { href: "#kebun", label: "Kebun" },
  { href: "#fitur", label: "Fitur" },
  { href: "#alur", label: "Alur" },
  { href: "#peran", label: "Peran" },
];

export const LANDING_DOMAIN_TAGS = [
  "Greenhouse",
  "Rakit apung",
  "Hidroponik",
  "Penjualan",
  "Pengantaran",
  "Petani",
] as const;

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: "greenhouse",
    title: "Greenhouse & kolam",
    body: "Pantau varietas, siklus tanam, dan panen dari benih sampai sayur siap angkat.",
    icon: Building2,
    wide: true,
    tag: "Produksi",
  },
  {
    id: "rakit",
    title: "Rakit apung",
    body: "Biaya benih, nutrisi, dan pack siap pakai terhubung ke stok nyata di kolam.",
    icon: Waves,
    tag: "Hidroponik",
  },
  {
    id: "stok",
    title: "Stok & inventaris",
    body: "Barang masuk, sisa pack, dan peringatan stok rendah — tanpa spreadsheet.",
    icon: Package,
    tag: "Operasi",
  },
  {
    id: "penjualan",
    title: "Penjualan",
    body: "Pesanan jual, harga, dan piutang pelanggan dalam satu alur.",
    icon: Wallet,
    wide: true,
    tag: "Penjualan",
  },
  {
    id: "pengantaran",
    title: "Pengantaran",
    body: "Jadwal kirim dan status pengiriman — petani tahu apa yang harus dibawa hari ini.",
    icon: Truck,
    tag: "Pengantaran",
  },
  {
    id: "keuangan",
    title: "Laporan keuangan",
    body: "Arus kas, laba rugi, jurnal — untuk owner dan admin kebun.",
    icon: LineChart,
    tag: "Keuangan",
  },
];

export const LANDING_FLOW: LandingFlowStep[] = [
  {
    step: "1",
    title: "Di greenhouse",
    body: "Petani catat siklus, panen, dan pakai stok di kolam rakit apung.",
  },
  {
    step: "2",
    title: "Ke penjualan",
    body: "Admin buat pesanan jual; pengantaran dijadwalkan ke pelanggan.",
  },
  {
    step: "3",
    title: "Ke laporan",
    body: "Owner lihat biaya produksi dan uang masuk — angka selaras dengan lapangan.",
  },
];

export const LANDING_ROLES: LandingRoleCard[] = [
  {
    title: "Petani",
    body: "Fokus di kolam dan greenhouse: tugas hari ini, inventaris, panen, pengiriman.",
    highlights: ["Beranda petani", "Monitor kolam", "Paket siap pakai"],
  },
  {
    title: "Admin",
    body: "Operasi harian kebun plus penjualan, pelanggan, dan jurnal.",
    highlights: ["Pesanan jual", "Pengantaran", "Stok & panen"],
  },
  {
    title: "Owner",
    body: "Gambaran keuangan utuh tanpa harus mengecek setiap kolam sendiri.",
    highlights: ["Arus kas", "Laba rugi", "Varietas & biaya"],
  },
];

export const LANDING_KEBUN_COPY = {
  eyebrow: "Greenhouse · rakit apung · hidroponik",
  titleLead: "Dari kolam",
  titleAccent: "sampai pelanggan.",
  lead: "Kokonus Farm menghubungkan kerja di greenhouse, biaya rakit apung, penjualan sayur, dan pengantaran — dalam bahasa Indonesia yang mudah dibaca di lapangan.",
  panelTitle: "Satu alur kebun",
  panelBody:
    "Trial di lapangan, catat di aplikasi. Stok, siklus, pesanan, dan uang tidak lagi terpisah di chat atau buku tulis.",
};
