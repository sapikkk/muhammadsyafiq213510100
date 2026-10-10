/** Opsi kondisi monitor — aman untuk komponen client (tanpa Prisma). */

export const kondisiMonitorOptions = [
  { value: "BAIK", label: "Baik" },
  { value: "PERHATIAN", label: "Perlu perhatian" },
  { value: "BURUK", label: "Buruk / risiko gagal" },
] as const;

export type KondisiMonitor = (typeof kondisiMonitorOptions)[number]["value"];
