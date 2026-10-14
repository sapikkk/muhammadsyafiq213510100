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

/** Tab horizontal Owner — selaras bagian 7 sidebar (laporan keuangan). */
const ownerModules: FinanceModule[] = [
  {
    id: "ringkasan",
    label: "Ringkasan",
    href: "/owner/keuangan",
    matchPrefixes: ["/owner/keuangan"],
    hint: "Angka ringkas dan pintasan.",
  },
  {
    id: "catatan",
    label: "Catatan keuangan",
    href: "/owner/jurnal",
    matchPrefixes: ["/owner/jurnal"],
    hint: "Daftar catatan dan koreksi.",
  },
  {
    id: "laba-rugi",
    label: "Laba rugi",
    href: "/owner/laporan?laporan=laba-rugi",
    matchPrefixes: ["/owner/laporan"],
    matchSearch: { laporan: "laba-rugi" },
    hint: "Pendapatan, beban, laba periode.",
  },
  {
    id: "neraca",
    label: "Neraca",
    href: "/owner/laporan?laporan=neraca",
    matchPrefixes: ["/owner/laporan"],
    matchSearch: { laporan: "neraca" },
    hint: "Aset, kewajiban, modal.",
  },
  {
    id: "arus-kas",
    label: "Arus kas",
    href: "/owner/arus-kas",
    matchPrefixes: ["/owner/arus-kas"],
    hint: "Masuk dan keluar kas.",
  },
  {
    id: "akun",
    label: "Daftar akun",
    href: "/owner/akun",
    matchPrefixes: ["/owner/akun"],
    hint: "Bagan akun.",
  },
  {
    id: "rekening",
    label: "Rekening",
    href: "/owner/rekening",
    matchPrefixes: ["/owner/rekening"],
    hint: "Kas, bank, e-wallet.",
  },
  {
    id: "prive",
    label: "Ambil pribadi",
    href: "/owner/prive",
    matchPrefixes: ["/owner/prive"],
    hint: "Pencairan pribadi dari kas.",
  },
];

export function getFinanceModules(role: "ADMIN" | "OWNER"): FinanceModule[] {
  return role === "ADMIN" ? adminModules : ownerModules;
}

export function resolveFinanceModuleId(
  pathname: string,
  role: "ADMIN" | "OWNER",
  searchParams?: URLSearchParams | null,
): string | null {
  const modules = getFinanceModules(role);

  if (role === "OWNER" && pathname === "/owner/laporan") {
    const j = searchParams?.get("laporan");
    if (j === "neraca") return "neraca";
    return "laba-rugi";
  }

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

    return mod.id;
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
