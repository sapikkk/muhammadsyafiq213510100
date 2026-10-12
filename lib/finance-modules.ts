import type { Role } from "@/types/role";

/** Satu modul dalam area keuangan (IA mirip Books / ERPNext — bukan salinan UI). */
export type FinanceModule = {
  id: string;
  label: string;
  href: string;
  /** Path aktif: exact atau prefix (tanpa query). */
  matchPrefixes: string[];
  hint: string;
};

const adminModules: FinanceModule[] = [
  {
    id: "ringkasan",
    label: "Ringkasan",
    href: "/admin/keuangan",
    matchPrefixes: ["/admin/keuangan"],
    hint: "Pintu masuk modul keuangan dan pintasan tugas.",
  },
  {
    id: "transaksi",
    label: "Transaksi",
    href: "/admin/jurnal",
    matchPrefixes: ["/admin/jurnal"],
    hint: "Catat uang, setujui, ekspor catatan.",
  },
  {
    id: "penjualan",
    label: "Penjualan & piutang",
    href: "/admin/penjualan",
    matchPrefixes: ["/admin/penjualan", "/admin/pelanggan"],
    hint: "Pesanan jual, pelanggan, faktur, sisa piutang.",
  },
  {
    id: "biaya",
    label: "Biaya & HPP",
    href: "/admin/biaya",
    matchPrefixes: ["/admin/biaya"],
    hint: "Alokasi biaya ke batch — bukan catat kas.",
  },
  {
    id: "buku-besar",
    label: "Buku besar",
    href: "/admin/akun",
    matchPrefixes: ["/admin/akun"],
    hint: "Bagan akun (COA).",
  },
  {
    id: "tutup-buku",
    label: "Tutup buku",
    href: "/admin/akuntansi",
    matchPrefixes: ["/admin/akuntansi"],
    hint: "Tutup periode dan penyusutan bulanan.",
  },
];

const ownerModules: FinanceModule[] = [
  {
    id: "ringkasan",
    label: "Ringkasan",
    href: "/owner/keuangan",
    matchPrefixes: ["/owner/keuangan"],
    hint: "Angka ringkas dan pintasan laporan.",
  },
  {
    id: "transaksi",
    label: "Transaksi",
    href: "/owner/jurnal",
    matchPrefixes: ["/owner/jurnal"],
    hint: "Daftar catatan keuangan dan koreksi.",
  },
  {
    id: "penjualan",
    label: "Penjualan",
    href: "/owner/penjualan",
    matchPrefixes: ["/owner/penjualan"],
    hint: "Pesanan dan pendapatan.",
  },
  {
    id: "biaya",
    label: "Biaya & HPP",
    href: "/owner/biaya",
    matchPrefixes: ["/owner/biaya"],
    hint: "Rincian beban dan alokasi.",
  },
  {
    id: "analisis",
    label: "Analisis",
    href: "/owner/evaluasi",
    matchPrefixes: ["/owner/evaluasi"],
    hint: "Untung, titik impas, HPP.",
  },
  {
    id: "laporan",
    label: "Laporan",
    href: "/owner/laporan",
    matchPrefixes: ["/owner/laporan", "/owner/arus-kas", "/owner/akun"],
    hint: "Laba rugi, neraca, arus kas, COA.",
  },
  {
    id: "prive",
    label: "Prive",
    href: "/owner/prive",
    matchPrefixes: ["/owner/prive"],
    hint: "Ambil pribadi dari kas.",
  },
  {
    id: "rekening",
    label: "Rekening",
    href: "/owner/rekening",
    matchPrefixes: ["/owner/rekening"],
    hint: "Kas tunai, bank, dan e-wallet pemilik.",
  },
];

export function getFinanceModules(role: "ADMIN" | "OWNER"): FinanceModule[] {
  return role === "ADMIN" ? adminModules : ownerModules;
}

export function resolveFinanceModuleId(pathname: string, role: "ADMIN" | "OWNER"): string | null {
  const modules = getFinanceModules(role);
  for (const mod of modules) {
    for (const prefix of mod.matchPrefixes) {
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        return mod.id;
      }
    }
  }
  return null;
}

export function financeNavRoleFromPath(pathname: string): "ADMIN" | "OWNER" | null {
  if (pathname.startsWith("/admin/")) {
    if (resolveFinanceModuleId(pathname, "ADMIN")) return "ADMIN";
  }
  if (pathname.startsWith("/owner/")) {
    if (resolveFinanceModuleId(pathname, "OWNER")) return "OWNER";
  }
  return null;
}
