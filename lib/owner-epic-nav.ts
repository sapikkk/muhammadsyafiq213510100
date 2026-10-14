import { LayoutDashboard } from "lucide-react";
import type { NavFlowGroup } from "@/lib/nav-flow";
import { getNavItems } from "@/lib/nav-items";

/** Sidebar Owner — modul keuangan dan operasi. */
export function getOwnerEpicNavGroups(stokRendahCount: number): NavFlowGroup[] {
  const catalog = getNavItems("OWNER", stokRendahCount);
  const pick = (href: string) => catalog.find((i) => i.href === href);

  const link = (code: string, title: string, href: string) => {
    const base = pick(href);
    return {
      label: title,
      epicCode: code || undefined,
      navKey: `${href}::${code || title}`,
      href,
      icon: base?.icon ?? LayoutDashboard,
      badge: base?.badge,
    };
  };

  return [
    {
      id: "epic-ringkasan",
      title: "Ringkasan",
      hint: "Angka usaha dan unduh laporan",
      items: [
        link("", "Beranda", "/owner"),
        link("", "Modul keuangan", "/owner/keuangan"),
        link("", "Laba rugi", "/owner/laporan?laporan=laba-rugi"),
      ],
    },
    {
      id: "epic-1",
      title: "1. Varietas & lahan",
      hint: "Jenis sayur dan fasilitas",
      items: [
        link("1.1", "Data varietas", "/owner/varietas"),
        link("1.2", "Lahan & kolam", "/owner/infrastruktur"),
        link("1.3", "Aktif / nonaktif varietas", "/owner/varietas?tampilan=status"),
      ],
    },
    {
      id: "epic-2",
      title: "2. Produksi",
      hint: "Semai sampai panen (lihat saja)",
      items: [
        link("2.1", "Semai", "/owner/produksi"),
        link("2.2", "Rockwool", "/owner/produksi"),
        link("2.3", "Pertumbuhan", "/owner/produksi"),
        link("2.4", "Pindah kolam", "/owner/produksi"),
        link("2.5", "Pendewasaan", "/owner/produksi"),
        link("2.6", "Panen", "/owner/produksi"),
        link("2.7", "Tambal susulan", "/owner/produksi"),
        link("", "Stok barang", "/owner/inventaris"),
        link("", "Stok rendah", "/owner/stok-rendah"),
      ],
    },
    {
      id: "epic-3",
      title: "3. Kegagalan & susut",
      hint: "Tanaman gagal atau susut",
      items: [
        link("3.1", "Catat kegagalan", "/owner/kegagalan-susut?bagian=menunggu"),
        link("3.2", "Total susut", "/owner/kegagalan-susut?bagian=total"),
        link("3.3", "Normal vs tidak normal", "/owner/kegagalan-susut?bagian=klasifikasi"),
        link("3.4", "Jumlah layak jual", "/owner/kegagalan-susut?bagian=layak"),
        link("3.5", "Tidak layak jual", "/owner/kegagalan-susut?bagian=tidak-layak"),
        link("3.6", "Susut per siklus", "/owner/kegagalan-susut?bagian=per-siklus"),
      ],
    },
    {
      id: "epic-4",
      title: "4. Biaya & HPP",
      hint: "Biaya produksi per kg",
      items: [
        link("4.1", "Biaya langsung", "/owner/biaya"),
        link("4.2", "Biaya umum", "/owner/biaya"),
        link("4.3", "Alokasi biaya", "/owner/biaya"),
        link("4.4", "Biaya per kolam", "/owner/biaya"),
        link("4.5", "HPP per kg", "/owner/evaluasi"),
        link("4.6", "HPP per lubang", "/owner/evaluasi"),
        link("4.7", "Cek HPP", "/owner/evaluasi"),
        link("4.8", "HPP per pack", "/owner/evaluasi"),
      ],
    },
    {
      id: "epic-5",
      title: "5. Penjualan",
      hint: "Pesanan dan pendapatan",
      items: [
        link("5.1", "Terima pesanan", "/owner/penjualan"),
        link("5.2", "Kemas & kirim", "/owner/penjualan"),
        link("5.3", "Catat pendapatan", "/owner/jurnal"),
      ],
    },
    {
      id: "epic-6",
      title: "6. Evaluasi",
      hint: "Untung, impas, kapasitas",
      items: [
        link("6.1", "Untung vs harga jual", "/owner/evaluasi"),
        link("6.2", "Titik impas", "/owner/evaluasi"),
        link("6.3", "Kolam kosong", "/owner/evaluasi"),
        link("6.4", "Keputusan harga", "/owner/evaluasi"),
      ],
    },
    {
      id: "epic-7",
      title: "7. Laporan keuangan",
      hint: "Laba rugi, neraca, kas",
      items: [
        link("", "Modul keuangan", "/owner/keuangan"),
        link("7.1", "Daftar akun", "/owner/akun"),
        link("7.2", "Laba rugi", "/owner/laporan?laporan=laba-rugi"),
        link("7.3", "Neraca", "/owner/laporan?laporan=neraca"),
        link("7.4", "Arus kas", "/owner/arus-kas"),
        link("", "Catatan keuangan", "/owner/jurnal"),
        link("", "Ambil pribadi", "/owner/prive"),
      ],
    },
    {
      id: "epic-kelola",
      title: "Kelola",
      hint: "Petani dan akun login",
      items: [
        link("", "Data petani", "/owner/petani"),
        link("", "Kelola akun", "/owner/pengguna"),
      ],
    },
  ];
}
