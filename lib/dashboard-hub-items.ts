import { UserPlus } from "lucide-react";
import { getNavItems, type NavItem } from "@/lib/nav-items";
import type { Role } from "@/types/role";

const HOME_HREFS = new Set(["/admin", "/owner", "/petani"]);

/** Menu sidebar (tanpa Beranda) + pintasan khusus beranda, sesuai RBAC. */
export function getDashboardHubItems(role: Role, stokRendahCount: number): NavItem[] {
  const items = getNavItems(role, stokRendahCount).filter((item) => !HOME_HREFS.has(item.href));

  if (role === "ADMIN") {
    items.push({
      label: "Daftarkan petani",
      href: "/admin/daftar-petani",
      icon: UserPlus,
    });
  }

  return items;
}
