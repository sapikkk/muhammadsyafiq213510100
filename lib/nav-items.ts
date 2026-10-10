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
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Inventaris", href: "/admin/inventaris", icon: Box },
      { label: "Active pack", href: "/admin/active-pack", icon: Package },
      { label: "Infrastruktur", href: "/admin/infrastruktur", icon: Home },
      { label: "Varietas", href: "/admin/varietas", icon: LeafyGreen },
      { label: "Laporan panen", href: "/admin/harvest", icon: ClipboardList },
      { label: "Klasifikasi susut", href: "/admin/susut", icon: Layers },
      alertItem,
      { label: "Pelanggan", href: "/admin/pelanggan", icon: Contact },
      { label: "Sales order", href: "/admin/penjualan", icon: Receipt },
      { label: "Jurnal", href: "/admin/jurnal", icon: Layers },
      { label: "Akuntansi", href: "/admin/akuntansi", icon: Calculator },
      { label: "Bagan akun", href: "/admin/akun", icon: BookOpen },
      { label: "Biaya & overhead", href: "/admin/biaya", icon: Receipt },
      { label: "Master petani", href: "/admin/petani", icon: Users },
    ];
  }

  if (role === "OWNER") {
    return [
      { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
      { label: "Ekspor laporan", href: "/owner/laporan", icon: FileDown },
      { label: "Jurnal", href: "/owner/jurnal", icon: Layers },
      { label: "Bagan akun", href: "/owner/akun", icon: BookOpen },
      { label: "Prive", href: "/owner/prive", icon: CircleDollarSign },
      { label: "Arus kas", href: "/owner/arus-kas", icon: Wallet },
      { label: "Breakdown biaya", href: "/owner/biaya", icon: PieChart },
      { label: "Evaluasi margin", href: "/owner/evaluasi", icon: LineChart },
      { label: "Inventaris", href: "/owner/inventaris", icon: Box },
      { label: "Infrastruktur", href: "/owner/infrastruktur", icon: Home },
      { label: "Varietas", href: "/owner/varietas", icon: LeafyGreen },
      { label: "Master petani", href: "/owner/petani", icon: Users },
      alertItem,
      { label: "Kelola user", href: "/owner/pengguna", icon: UserCog },
    ];
  }

  return [
    { label: "Dashboard", href: "/petani", icon: LayoutDashboard },
    { label: "Siklus produksi", href: "/petani/siklus", icon: Layers },
    { label: "Active pack", href: "/petani/active-pack", icon: Package },
    { label: "Inventaris", href: "/petani/inventaris", icon: Box },
    { label: "Varietas", href: "/petani/varietas", icon: LeafyGreen },
    { label: "Pengiriman", href: "/petani/pengiriman", icon: Truck },
    alertItem,
  ];
}
