import {
  ClipboardList,
  Coins,
  LeafyGreen,
  Sprout,
  Wallet,
} from "lucide-react";
import { ICON_EVALUASI, ICON_PENJUALAN } from "@/lib/nav-icons";
import type { NavItem } from "@/lib/nav-items";

/** Sidebar Owner — hanya 7 modul utama (sub-menu lewat tab di halaman). */
export const OWNER_SIDEBAR_MODULES: NavItem[] = [
  {
    label: "Varietas & lahan",
    href: "/owner/varietas",
    icon: LeafyGreen,
  },
  {
    label: "Produksi",
    href: "/owner/produksi",
    icon: Sprout,
  },
  {
    label: "Kegagalan & susut",
    href: "/owner/kegagalan-susut",
    icon: ClipboardList,
  },
  {
    label: "Biaya & HPP",
    href: "/owner/biaya",
    icon: Coins,
  },
  {
    label: "Penjualan",
    href: "/owner/penjualan",
    icon: ICON_PENJUALAN,
  },
  {
    label: "Evaluasi",
    href: "/owner/evaluasi",
    icon: ICON_EVALUASI,
  },
  {
    label: "Laporan keuangan",
    href: "/owner/keuangan",
    icon: Wallet,
  },
];

const PREFIX_BY_HREF: Record<string, string[]> = {
  "/owner/varietas": ["/owner/varietas", "/owner/infrastruktur"],
  "/owner/produksi": ["/owner/produksi", "/owner/inventaris", "/owner/stok-rendah"],
  "/owner/kegagalan-susut": ["/owner/kegagalan-susut"],
  "/owner/biaya": ["/owner/biaya"],
  "/owner/penjualan": ["/owner/penjualan"],
  "/owner/evaluasi": ["/owner/evaluasi"],
  "/owner/keuangan": [
    "/owner/keuangan",
    "/owner/jurnal",
    "/owner/laporan",
    "/owner/arus-kas",
    "/owner/akun",
    "/owner/rekening",
    "/owner/prive",
  ],
};

export function isOwnerSidebarModuleActive(pathname: string, moduleHref: string): boolean {
  if (pathname === "/owner") return false;
  const prefixes = PREFIX_BY_HREF[moduleHref] ?? [moduleHref.split("?")[0]];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function getOwnerEpicNavGroups(stokRendahCount: number): import("@/lib/nav-flow").NavFlowGroup[] {
  void stokRendahCount;
  return OWNER_SIDEBAR_MODULES.map((item, i) => ({
    id: `owner-mod-${i + 1}`,
    title: item.label,
    hint: "",
    items: [{ ...item, navKey: item.href }],
  }));
}
