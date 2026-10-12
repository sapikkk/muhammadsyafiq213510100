import type React from "react";
import {
  BookOpen,
  Box,
  Contact,
  ClipboardList,
  Home,
  Layers,
  LayoutDashboard,
  LeafyGreen,
  Package,
  FileDown,
  PieChart,
  LineChart,
  Wallet,
  Receipt,
  Truck,
  Users,
  UserCog,
  CircleDollarSign,
  TriangleAlert,
  Calculator,
} from "lucide-react";
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
      { label: "Lahan & kolam", href: "/admin/infrastruktur", icon: Home },
      { label: "Varietas", href: "/admin/varietas", icon: LeafyGreen },
      { label: "Setujui panen", href: "/admin/harvest", icon: ClipboardList },
      { label: "Jenis susut", href: "/admin/susut", icon: Layers },
      alertItem,
      { label: "Pelanggan", href: "/admin/pelanggan", icon: Contact },
      { label: "Pesanan jual", href: "/admin/penjualan", icon: Receipt },
      { label: "Catatan keuangan", href: "/admin/jurnal", icon: Layers },
      { label: "Akuntansi", href: "/admin/akuntansi", icon: Calculator },
      { label: "Daftar akun", href: "/admin/akun", icon: BookOpen },
      { label: "Biaya & overhead", href: "/admin/biaya", icon: Receipt },
      { label: "Data petani", href: "/admin/petani", icon: Users },
    ];
  }

  if (role === "OWNER") {
    return [
      { label: "Beranda", href: "/owner", icon: LayoutDashboard },
      { label: "Unduh laporan", href: "/owner/laporan", icon: FileDown },
      { label: "Catatan keuangan", href: "/owner/jurnal", icon: Layers },
      { label: "Daftar akun", href: "/owner/akun", icon: BookOpen },
      { label: "Ambil pribadi", href: "/owner/prive", icon: CircleDollarSign },
      { label: "Arus kas", href: "/owner/arus-kas", icon: Wallet },
      { label: "Rincian biaya", href: "/owner/biaya", icon: PieChart },
      { label: "Cek untung & rugi", href: "/owner/evaluasi", icon: LineChart },
      { label: "Produksi", href: "/owner/produksi", icon: Layers },
      { label: "Kegagalan & susut", href: "/owner/kegagalan-susut", icon: ClipboardList },
      { label: "Penjualan", href: "/owner/penjualan", icon: Receipt },
      { label: "Stok barang", href: "/owner/inventaris", icon: Box },
      { label: "Lahan & kolam", href: "/owner/infrastruktur", icon: Home },
      { label: "Varietas", href: "/owner/varietas", icon: LeafyGreen },
      { label: "Data petani", href: "/owner/petani", icon: Users },
      alertItem,
      { label: "Kelola akun", href: "/owner/pengguna", icon: UserCog },
    ];
  }

  return [
    { label: "Beranda", href: "/petani", icon: LayoutDashboard },
    { label: "Siklus tanam", href: "/petani/siklus", icon: Layers },
    { label: "Paket siap pakai", href: "/petani/active-pack", icon: Package },
    { label: "Stok barang", href: "/petani/inventaris", icon: Box },
    { label: "Varietas", href: "/petani/varietas", icon: LeafyGreen },
    { label: "Pengiriman", href: "/petani/pengiriman", icon: Truck },
    alertItem,
  ];
}
