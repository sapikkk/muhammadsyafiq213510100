/** Satu modul dalam area keuangan (IA mirip Books / ERPNext — bukan salinan UI). */
export type FinanceModule = {
  id: string;
  label: string;
  href: string;
  /** Path aktif: exact atau prefix (tanpa query). */
  matchPrefixes: string[];
  /** Query wajib cocok (mis. laporan=neraca). */
  matchSearch?: Record<string, string>;
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

/** Owner memakai tab modul (`TABS_LAPORAN_KEUANGAN`), bukan nav horizontal ini. */
const ownerModules: FinanceModule[] = [];

export function getFinanceModules(role: "ADMIN" | "OWNER"): FinanceModule[] {
  return role === "ADMIN" ? adminModules : ownerModules;
}

export function resolveFinanceModuleId(
  pathname: string,
  role: "ADMIN" | "OWNER",
  searchParams?: URLSearchParams | null,
): string | null {
  const modules = getFinanceModules(role);

  if (role === "OWNER") return null;

  for (const mod of modules) {
    const pathOnly = mod.href.split("?")[0];
    const onPath =
      pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
    if (!onPath) continue;

    if (mod.matchSearch && searchParams) {
      const ok = Object.entries(mod.matchSearch).every(
        ([k, v]) => searchParams.get(k) === v,
      );
      if (ok) return mod.id;
      continue;
    }

    if (mod.matchSearch) continue;

    if (mod.id === "laba-rugi" || mod.id === "neraca") continue;
    if (mod.id === "penjualan-piutang" && pathname.startsWith("/owner/penjualan/piutang")) {
      continue;
    }

    return mod.id;
  }
  return null;
}

export function financeNavRoleFromPath(pathname: string): "ADMIN" | "OWNER" | null {
  if (pathname.startsWith("/admin/")) {
    if (resolveFinanceModuleId(pathname, "ADMIN")) return "ADMIN";
  }
  if (pathname.startsWith("/owner/")) {
    if (resolveFinanceModuleId(pathname, "OWNER", null)) return "OWNER";
  }
  return null;
}
