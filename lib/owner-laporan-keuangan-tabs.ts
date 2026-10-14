import type { OwnerSectionTab } from "@/components/owner-section-tabs";

/** Tab modul 7 — laporan & akuntansi (bukan penjualan / pengaturan). */
export const TABS_LAPORAN_KEUANGAN: OwnerSectionTab[] = [
  { id: "ringkasan", label: "Ringkasan", href: "/owner/keuangan" },
  { id: "jurnal", label: "Jurnal umum", href: "/owner/jurnal", activePrefix: "/owner/jurnal" },
  {
    id: "laporan",
    label: "Laba & neraca",
    href: "/owner/laporan?laporan=laba-rugi",
    activePrefix: "/owner/laporan",
  },
  { id: "arus-kas", label: "Arus kas", href: "/owner/arus-kas" },
  { id: "akun", label: "Bagan akun", href: "/owner/akun" },
  { id: "kas", label: "Kas & bank", href: "/owner/rekening" },
  { id: "prive", label: "Ambil pribadi", href: "/owner/prive" },
];
