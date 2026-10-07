export const varietasStatusList = ["AKTIF", "NONAKTIF"] as const;
export type VarietasStatus = (typeof varietasStatusList)[number];

export const varietasStatusLabel: Record<VarietasStatus, string> = {
  AKTIF: "Aktif",
  NONAKTIF: "Nonaktif",
};

export function isVarietasStatus(value: string): value is VarietasStatus {
  return varietasStatusList.includes(value as VarietasStatus);
}
