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

/** Tab horizontal Owner — modul 7 (laporan & akuntansi). */
const ownerModules: FinanceModule[] = [
  {
    id: "ringkasan",
    label: "Ringkasan",
    href: "/owner/keuangan",
    matchPrefixes: ["/owner/keuangan"],
    hint: "Indikator utama dan pintasan.",
  },
  {
    id: "penjualan-piutang",
    label: "Pesanan jual",
    href: "/owner/penjualan",
    matchPrefixes: ["/owner/penjualan"],
    hint: "Faktur penjualan dan status kirim.",
  },
  {
    id: "piutang",
    label: "Piutang",
    href: "/owner/penjualan/piutang",
    matchPrefixes: ["/owner/penjualan/piutang"],
    hint: "Sisa tagihan pelanggan.",
  },
  {
    id: "catatan",
    label: "Jurnal umum",
    href: "/owner/jurnal",
    matchPrefixes: ["/owner/jurnal"],
    hint: "Catatan debit/kredit harian.",
  },
  {
    id: "laba-rugi",
    label: "Laba rugi",
    href: "/owner/laporan?laporan=laba-rugi",
    matchPrefixes: ["/owner/laporan"],
    matchSearch: { laporan: "laba-rugi" },
    hint: "Pendapatan dikurangi beban.",
  },
  {
    id: "neraca",
    label: "Neraca",
    href: "/owner/laporan?laporan=neraca",
    matchPrefixes: ["/owner/laporan"],
    matchSearch: { laporan: "neraca" },
    hint: "Aset, kewajiban, ekuitas.",
  },
  {
    id: "arus-kas",
    label: "Arus kas",
    href: "/owner/arus-kas",
    matchPrefixes: ["/owner/arus-kas"],
    hint: "Operasi, investasi, pendanaan.",
  },
  {
    id: "akun",
    label: "Bagan akun",
    href: "/owner/akun",
    matchPrefixes: ["/owner/akun"],
    hint: "Buku besar per akun.",
  },
  {
    id: "rekening",
    label: "Kas & bank",
    href: "/owner/rekening",
    matchPrefixes: ["/owner/rekening"],
    hint: "Saldo rekening real-time.",
  },
  {
    id: "prive",
    label: "Ambil pribadi",
    href: "/owner/prive",
    matchPrefixes: ["/owner/prive"],
    hint: "Pencairan pribadi dari kas.",
  },
  {
    id: "petani",
    label: "Data petani",
    href: "/owner/petani",
    matchPrefixes: ["/owner/petani"],
    hint: "Master petani dan gaji.",
  },
  {
    id: "pengguna",
    label: "Kelola akun login",
    href: "/owner/pengguna",
    matchPrefixes: ["/owner/pengguna"],
    hint: "User admin dan pekerja.",
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

  if (role === "OWNER" && pathname.startsWith("/owner/penjualan/piutang")) {
    return "piutang";
  }
  if (role === "OWNER" && pathname.startsWith("/owner/penjualan")) {
    return "penjualan-piutang";
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
