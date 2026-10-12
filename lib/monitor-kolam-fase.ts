import { isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";

const FASE_MONITOR: FaseProduksi[] = [
  "SPROUT_DAUN",
  "TAMBAL",
  "PINDAH_KOLAM",
  "PENDEWASAAN",
];

/** Batch aktif boleh catat monitor harian kolam. */
export function siklusBolehMonitorKolam(status: string) {
  return isFaseProduksi(status) && FASE_MONITOR.includes(status);
}
