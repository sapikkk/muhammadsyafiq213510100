/** Konstanta & helper murni — aman untuk client (tanpa Prisma). */

export const STATUS_GAGAL_TOTAL = "GAGAL_TOTAL";

export function siklusBolehAbort(status: string, laporanStatus?: string | null) {
  if (status === STATUS_GAGAL_TOTAL || status === "SELESAI") return false;
  if (laporanStatus === "APPROVED") return false;
  return true;
}
