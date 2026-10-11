import { LayoutDashboard } from "lucide-react";
import type { NavFlowGroup } from "@/lib/nav-flow";
import { getNavItems } from "@/lib/nav-items";

/** Sidebar Owner — modul keuangan dan operasi (grup bernomor 1.0–7.0). */
export function getOwnerEpicNavGroups(stokRendahCount: number): NavFlowGroup[] {
  const catalog = getNavItems("OWNER", stokRendahCount);
  const pick = (href: string) => catalog.find((i) => i.href === href);

  const link = (code: string, title: string, href: string) => {
    const base = pick(href);
    return {
      label: code ? `${code} ${title}` : title,
      href,
      icon: base?.icon ?? LayoutDashboard,
      badge: base?.badge,
    };
  };

  return [
    {
      id: "epic-ringkasan",
      title: "Ringkasan",
      hint: "",
      items: [link("", "Dashboard KPI", "/owner"), link("", "Ekspor laporan", "/owner/laporan")],
    },
    {
      id: "epic-1",
      title: "1.0 Manajemen Varietas & Asumsi",
      hint: "",
      items: [
        link("1.1", "Parameter varietas", "/owner/varietas"),
        link("1.2", "Parameter infrastruktur", "/owner/infrastruktur"),
        link("1.3", "Aktivasi / nonaktifkan varietas", "/owner/varietas"),
      ],
    },
    {
      id: "epic-2",
      title: "2.0 Manajemen Produksi & Siklus",
      hint: "",
      items: [
        link("2.1", "Persiapan semai", "/owner/produksi"),
        link("2.2", "Proses semai di rockwool", "/owner/produksi"),
        link("2.3", "Monitoring sprout & pertumbuhan", "/owner/produksi"),
        link("2.4", "Pindah ke kolam", "/owner/produksi"),
        link("2.5", "Pendewasaan di kolam", "/owner/produksi"),
        link("2.6", "Panen & sortasi", "/owner/produksi"),
        link("2.7", "Tambal susulan", "/owner/produksi"),
        link("", "Inventaris bahan", "/owner/inventaris"),
        link("", "Stok rendah", "/owner/stok-rendah"),
      ],
    },
    {
      id: "epic-3",
      title: "3.0 Pencatatan Kegagalan & Susut",
      hint: "",
      items: [
        link("3.1", "Catat kegagalan per tahap", "/owner/kegagalan-susut"),
        link("3.2", "Hitung total susut", "/owner/kegagalan-susut"),
        link("3.3", "Klasifikasi normal vs abnormal", "/owner/kegagalan-susut"),
        link("3.4", "Hitung jumlah layak jual", "/owner/kegagalan-susut"),
        link("3.5", "Tidak layak jual saat panen", "/owner/kegagalan-susut"),
        link("3.6", "Total susut per siklus", "/owner/kegagalan-susut"),
        link("3.7", "Susut: normal vs abnormal", "/owner/kegagalan-susut"),
        link("3.8", "Jumlah layak jual final", "/owner/kegagalan-susut"),
      ],
    },
    {
      id: "epic-4",
      title: "4.0 Perhitungan Biaya & HPP",
      hint: "",
      items: [
        link("4.1", "Biaya langsung", "/owner/biaya"),
        link("4.2", "Biaya overhead", "/owner/biaya"),
        link("4.3", "Alokasi overhead", "/owner/biaya"),
        link("4.4", "Total biaya per kolam per siklus", "/owner/biaya"),
        link("4.5", "HPP per kg", "/owner/evaluasi"),
        link("4.6", "HPP per lubang tanam", "/owner/evaluasi"),
        link("4.7", "HPP per kg (validasi)", "/owner/evaluasi"),
        link("4.8", "HPP per pack", "/owner/evaluasi"),
      ],
    },
    {
      id: "epic-5",
      title: "5.0 Penjualan & Pemasaran",
      hint: "",
      items: [
        link("5.1", "Terima pesanan", "/owner/penjualan"),
        link("5.2", "Packing & distribusi", "/owner/penjualan"),
        link("5.3", "Catat pendapatan", "/owner/jurnal"),
      ],
    },
    {
      id: "epic-6",
      title: "6.0 Evaluasi & Keputusan",
      hint: "",
      items: [
        link("6.1", "Analisis margin (HPP vs harga jual)", "/owner/evaluasi"),
        link("6.2", "Analisis breakeven point", "/owner/evaluasi"),
        link("6.3", "Evaluasi idle capacity", "/owner/evaluasi"),
        link("6.4", "Keputusan strategis", "/owner/evaluasi"),
      ],
    },
    {
      id: "epic-7",
      title: "7.0 Pelaporan Keuangan",
      hint: "",
      items: [
        link("7.1", "Klasifikasi pos akuntansi", "/owner/akun"),
        link("7.2", "Laporan laba rugi", "/owner/laporan"),
        link("7.3", "Neraca", "/owner/laporan"),
        link("7.4", "Arus kas", "/owner/arus-kas"),
        link("", "Jurnal & persetujuan", "/owner/jurnal"),
        link("", "Prive / modal", "/owner/prive"),
      ],
    },
    {
      id: "epic-kelola",
      title: "Kelola",
      hint: "",
      items: [
        link("", "Master petani", "/owner/petani"),
        link("", "User & peran", "/owner/pengguna"),
      ],
    },
  ];
}
