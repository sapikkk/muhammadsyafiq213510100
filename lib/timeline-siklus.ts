import { formatTanggal } from "@/lib/format";
import { faseLabel, urutanFase, type FaseProduksi } from "@/lib/siklus-fase";

type SiklusDates = {
  tanggal_semai: Date;
  tanggal_pindah_kolam: Date | null;
  tanggal_panen: Date | null;
  status: string;
};

type LogFase = {
  fase_ke: string;
  waktu: Date;
};

export type TimelineStep = {
  fase: FaseProduksi;
  label: string;
  selesai: boolean;
  aktif: boolean;
  tanggal: string | null;
};

export function buildTimelineSiklus(
  siklus: SiklusDates,
  logs: LogFase[],
): TimelineStep[] {
  const produksiFase = urutanFase.filter((f) => f !== "SELESAI") as FaseProduksi[];
  const idxStatus =
    siklus.status === "SELESAI"
      ? produksiFase.length
      : Math.max(0, produksiFase.indexOf(siklus.status as FaseProduksi));
  const waktuByFase = new Map<string, Date>();

  waktuByFase.set("SEMAI", siklus.tanggal_semai);
  if (siklus.tanggal_pindah_kolam) {
    waktuByFase.set("PINDAH_KOLAM", siklus.tanggal_pindah_kolam);
  }
  if (siklus.tanggal_panen) {
    waktuByFase.set("PANEN", siklus.tanggal_panen);
  }

  for (const log of logs) {
    if (!waktuByFase.has(log.fase_ke)) {
      waktuByFase.set(log.fase_ke, log.waktu);
    }
  }

  return produksiFase.map((fase, idx) => {
    const tanggal = waktuByFase.get(fase);
    const selesai = idxStatus > idx || siklus.status === "SELESAI";
    const aktif = siklus.status === fase;
    return {
      fase,
      label: faseLabel[fase],
      selesai: selesai || (tanggal !== undefined && idx < idxStatus),
      aktif,
      tanggal: tanggal ? formatTanggal(tanggal) : null,
    };
  });
}
