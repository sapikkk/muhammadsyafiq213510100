export const roles = ["OWNER", "ADMIN", "PEKERJA"] as const;

export type Role = (typeof roles)[number];

export const roleLabel: Record<Role, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  PEKERJA: "Petani",
};
