export const kolamStatusList = ["MENGANGGUR", "TERPAKAI"] as const;
export type KolamStatus = (typeof kolamStatusList)[number];

export const kolamStatusLabel: Record<KolamStatus, string> = {
  MENGANGGUR: "Menganggur",
  TERPAKAI: "Terpakai",
};

export function isKolamStatus(value: string): value is KolamStatus {
  return kolamStatusList.includes(value as KolamStatus);
}
