import type React from "react";
import {
  BookOpen,
  Box,
  ClipboardList,
  Coins,
  Home,
  LayoutDashboard,
  LeafyGreen,
  Package,
  Banknote,
  FileDown,
  Sprout,
  Wallet,
  Truck,
  Users,
  UserCog,
  PiggyBank,
  TriangleAlert,
  Calculator,
  LandPlot,
  ShoppingCart,
} from "lucide-react";
import { ICON_ARUS_KAS, ICON_EVALUASI, ICON_PELANGGAN, ICON_PENJUALAN } from "@/lib/nav-icons";
import type { Role } from "@/types/role";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  epicCode?: string;
  navKey?: string;
};

export function getNavItems(role: Role, stokRendahCount: number): NavItem[] {
  const alertItem: NavItem = {
    label: "Stok rendah",
    href: `/${role === "PEKERJA" ? "petani" : role === "ADMIN" ? "admin" : "owner"}/stok-rendah`,
    icon: TriangleAlert,
    badge: stokRendahCount > 0 ? stokRendahCount : undefined,
  };

  if (role === "ADMIN") {
    return [
      { label: "Beranda", href: "/admin", icon: LayoutDashboard },
      { label: "Stok barang", href: "/admin/inventaris", icon: Box },
      { label: "Paket siap pakai", href: "/admin/active-pack", icon: Package },
      { label: "Lahan & kolam", href: "/admin/infrastruktur", icon: LandPlot },
      { label: "Varietas", href: "/admin/varietas", icon: LeafyGreen },
      { label: "Setujui panen", href: "/admin/harvest", icon: ClipboardList },
      { label: "Jenis susut", href: "/admin/susut", icon: ClipboardList },
      alertItem,
      { label: "Modul keuangan", href: "/admin/keuangan", icon: Wallet },
      { label: "Pelanggan", href: "/admin/pelanggan", icon: ICON_PELANGGAN },
      { label: "Pesanan jual", href: "/admin/penjualan", icon: ICON_PENJUALAN },
      { label: "Catatan keuangan", href: "/admin/jurnal", icon: Banknote },
      { label: "Akuntansi", href: "/admin/akuntansi", icon: Calculator },
      { label: "Daftar akun", href: "/admin/akun", icon: BookOpen },
      { label: "Biaya & overhead", href: "/admin/biaya", icon: Coins },
      { label: "Data petani", href: "/admin/petani", icon: Users },
    ];
  }

  if (role === "OWNER") {
    return [
      { label: "Beranda", href: "/owner", icon: LayoutDashboard },
      { label: "Modul keuangan", href: "/owner/keuangan", icon: Wallet },
      { label: "Unduh laporan", href: "/owner/laporan", icon: FileDown },
      { label: "Catatan keuangan", href: "/owner/jurnal", icon: Banknote },
      { label: "Daftar akun", href: "/owner/akun", icon: BookOpen },
      { label: "Rekening bank", href: "/owner/rekening", icon: Wallet },
      { label: "Ambil pribadi", href: "/owner/prive", icon: PiggyBank },
      { label: "Arus kas", href: "/owner/arus-kas", icon: ICON_ARUS_KAS },
      { label: "Rincian biaya", href: "/owner/biaya", icon: Coins },
      { label: "Untung & titik impas", href: "/owner/evaluasi", icon: ICON_EVALUASI },
      { label: "Produksi", href: "/owner/produksi", icon: Sprout },
      { label: "Kegagalan & susut", href: "/owner/kegagalan-susut", icon: ClipboardList },
      { label: "Penjualan", href: "/owner/penjualan", icon: ShoppingCart },
      { label: "Stok barang", href: "/owner/inventaris", icon: Box },
      { label: "Lahan & kolam", href: "/owner/infrastruktur", icon: LandPlot },
      { label: "Varietas", href: "/owner/varietas", icon: LeafyGreen },
      { label: "Data petani", href: "/owner/petani", icon: Users },
      alertItem,
      { label: "Kelola akun", href: "/owner/pengguna", icon: UserCog },
    ];
  }

  return [
    { label: "Beranda", href: "/petani", icon: LayoutDashboard },
    { label: "Siklus tanam", href: "/petani/siklus", icon: Sprout },
    { label: "Paket siap pakai", href: "/petani/active-pack", icon: Package },
    { label: "Stok barang", href: "/petani/inventaris", icon: Box },
    { label: "Varietas", href: "/petani/varietas", icon: LeafyGreen },
    { label: "Pengiriman", href: "/petani/pengiriman", icon: Truck },
    alertItem,
  ];
}
