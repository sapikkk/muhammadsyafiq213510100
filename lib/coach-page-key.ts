/** Kunci panduan dari path URL (cocok dengan lib/coach-tips.ts). */
export function coachPageKeyFromPathname(pathname: string): string {
  const path = pathname.split("?")[0]?.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/admin") return "admin-home";
  if (path === "/owner") return "owner-home";
  if (path === "/petani") return "petani-home";

  const parts = path.split("/").filter(Boolean);
  if (parts.length && /^\d+$/.test(parts[parts.length - 1]!)) {
    parts.pop();
  }
  return parts.join("-") || "home";
}
