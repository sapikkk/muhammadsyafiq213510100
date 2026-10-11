import type { Role } from "@/types/role";
import type { NavItem } from "@/lib/nav-items";
import { getNavItems } from "@/lib/nav-items";
import { getOwnerEpicNavGroups } from "@/lib/owner-epic-nav";

export type NavFlowGroup = {
  id: string;
  title: string;
  hint: string;
  items: NavItem[];
};

/** Sidebar dikelompokkan per alur bisnis — bukan daftar datar. */
export function getNavFlowGroups(role: Role, stokRendahCount: number): NavFlowGroup[] {
  const byHref = (href: string) => {
    const item = getNavItems(role, stokRendahCount).find((i) => i.href === href);
    if (!item) throw new Error(`Nav item missing: ${href}`);
    return item;
  };

  const prefix =
    role === "ADMIN" ? "/admin" : role === "OWNER" ? "/owner" : "/petani";

  if (role === "ADMIN") {
    return [
      {
        id: "start",
        title: "Mulai",
        hint: "Ringkasan tugas & akun petani",
        items: [byHref("/admin")],
      },
      {
        id: "produksi",
        title: "Produksi & stok",
        hint: "Bahan → pack → panen",
        items: [
          byHref(`${prefix}/inventaris`),
          byHref(`${prefix}/active-pack`),
          byHref(`${prefix}/infrastruktur`),
          byHref(`${prefix}/varietas`),
          byHref(`${prefix}/harvest`),
          byHref(`${prefix}/susut`),
          byHref(`${prefix}/stok-rendah`),
        ],
      },
      {
        id: "penjualan",
        title: "Penjualan",
        hint: "Pelanggan → SO → kirim → jurnal",
        items: [byHref(`${prefix}/pelanggan`), byHref(`${prefix}/penjualan`)],
      },
      {
        id: "akuntansi",
        title: "Akuntansi",
        hint: "Catat → setujui → laporan",
        items: [
          byHref(`${prefix}/jurnal`),
          byHref(`${prefix}/akuntansi`),
          byHref(`${prefix}/akun`),
          byHref(`${prefix}/biaya`),
        ],
      },
      {
        id: "people",
        title: "Tim",
        hint: "Master & reset sandi",
        items: [byHref(`${prefix}/petani`)],
      },
    ];
  }

  if (role === "OWNER") {
    return getOwnerEpicNavGroups(stokRendahCount);
  }

  return [
    {
      id: "start",
      title: "Hari ini",
      hint: "Tugas & batch aktif",
      items: [byHref("/petani")],
    },
    {
      id: "lapangan",
      title: "Di lapangan",
      hint: "Semai → fase → panen",
      items: [
        byHref(`${prefix}/siklus`),
        byHref(`${prefix}/active-pack`),
        byHref(`${prefix}/inventaris`),
        byHref(`${prefix}/varietas`),
      ],
    },
    {
      id: "logistik",
      title: "Logistik",
      hint: "Pengiriman ke pelanggan",
      items: [byHref(`${prefix}/pengiriman`)],
    },
    {
      id: "alert",
      title: "Peringatan",
      hint: "Stok di bawah minimum",
      items: [byHref(`${prefix}/stok-rendah`)],
    },
  ];
}
