/** Daftar induk dari URL detail (sheet atau halaman penuh). */
export function listHrefFromDetailPathname(pathname: string): string {
  const trimmed = pathname.split("?")[0]?.replace(/\/+$/, "") ?? "";
  const parts = trimmed.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  parts.pop();
  return `/${parts.join("/")}`;
}
