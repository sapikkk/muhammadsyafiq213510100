import { STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

/** Label fase/status siklus untuk tampilan layar. */
export function labelSiklusStatus(status: string): string {
  if (status === STATUS_GAGAL_TOTAL) return "Gagal total";
  if (isFaseProduksi(status)) return faseLabel[status];
  return status;
}
