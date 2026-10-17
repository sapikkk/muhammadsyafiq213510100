/** Daftar induk dari URL detail (sheet atau halaman penuh). */
export function listHrefFromDetailPathname(pathname: string): string {
  const trimmed = pathname.split("?")[0]?.replace(/\/+$/, "") ?? "";
  const parts = trimmed.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  const last = parts[parts.length - 1] ?? "";
  // Intercept `@detail`: pathname sering tetap `/owner/varietas` saat sheet terbuka.
  // Jangan naik ke `/owner` (dashboard modul).
  if (!/^\d+$/.test(last)) {
    return `/${parts.join("/")}`;
  }
  parts.pop();
  return `/${parts.join("/")}`;
}
