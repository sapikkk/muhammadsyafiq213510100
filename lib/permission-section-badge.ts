/** Badge izin CRUD di section — teks internal tetap enum; tampilan layar bahasa Indonesia. */
export type PermissionSectionBadge = "Read" | "Create" | "Update" | "Delete";

export function labelPermissionSectionBadge(
  badge: PermissionSectionBadge | undefined,
  hidden: boolean,
): string | null {
  if (hidden || !badge) return null;
  switch (badge) {
    case "Create":
      return "Buat";
    case "Update":
      return "Ubah";
    case "Delete":
      return "Hapus";
    case "Read":
      return "Lihat";
    default:
      return null;
  }
}
