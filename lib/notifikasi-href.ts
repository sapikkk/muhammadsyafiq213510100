import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";

/** Arahkan href notifikasi ke halaman setara untuk peran penerima. */
export function resolveNotifikasiHref(
  href: string | null | undefined,
  role: Role,
): string {
  const fallback = roleHome[role];
  if (!href) return fallback;
  const raw = href.trim();
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;

  if (role === "OWNER" && raw.startsWith("/admin/")) {
    return mapAdminToOwner(raw);
  }
  if (role === "ADMIN" && raw.startsWith("/owner/")) {
    return mapOwnerToAdmin(raw);
  }
  if (role === "PEKERJA") {
    return mapUntukPetani(raw);
  }
  return raw;
}

function mapAdminToOwner(path: string): string {
  const rules: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
    [/^\/admin\/penjualan\/(\d+)/, (m) => `/owner/penjualan/${m[1]}`],
    [/^\/admin\/jurnal\/(\d+)/, (m) => `/owner/jurnal/${m[1]}`],
    [/^\/admin\/inventaris\/(\d+)/, (m) => `/owner/inventaris/${m[1]}`],
    [/^\/admin\/varietas\/(\d+)/, (m) => `/owner/varietas/${m[1]}`],
    [/^\/admin\/harvest\/(\d+)/, () => `/owner/produksi`],
    [/^\/admin\/susut/, () => `/owner/kegagalan-susut`],
    [/^\/admin\/stok-rendah/, () => `/owner/stok-rendah`],
    [/^\/admin\/penjualan/, () => `/owner/penjualan`],
    [/^\/admin\/inventaris/, () => `/owner/inventaris`],
  ];
  for (const [re, fn] of rules) {
    const m = path.match(re);
    if (m) return fn(m);
  }
  return "/owner";
}

function mapOwnerToAdmin(path: string): string {
  const rules: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
    [/^\/owner\/penjualan\/(\d+)/, (m) => `/admin/penjualan/${m[1]}`],
    [/^\/owner\/jurnal\/(\d+)/, (m) => `/admin/jurnal/${m[1]}`],
    [/^\/owner\/inventaris\/(\d+)/, (m) => `/admin/inventaris/${m[1]}`],
    [/^\/owner\/varietas\/(\d+)/, (m) => `/admin/varietas/${m[1]}`],
    [/^\/owner\/penjualan/, () => `/admin/penjualan`],
    [/^\/owner\/stok-rendah/, () => `/admin/stok-rendah`],
  ];
  for (const [re, fn] of rules) {
    const m = path.match(re);
    if (m) return fn(m);
  }
  return "/admin";
}

function mapUntukPetani(path: string): string {
  if (path.startsWith("/admin/harvest/")) return "/petani";
  if (path.startsWith("/admin/")) return "/petani";
  return path;
}
