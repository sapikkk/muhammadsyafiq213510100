/** Indeks tren antar baris tabel monitor (bukan teks UI). */

export type MonitorTrendArah = "naik" | "turun" | "sama" | "tidak_ada";

export type MonitorTrendIndex = {
  arah: MonitorTrendArah;
  /** Selisih nilai − sebelumnya (positif = naik). */
  delta: number;
};

const DEFAULT_TOLERANSI = 0.01;

export function hitungMonitorTrend(
  nilai: number,
  sebelumnya: number | undefined,
  toleransi = DEFAULT_TOLERANSI,
): MonitorTrendIndex {
  if (sebelumnya == null || !Number.isFinite(sebelumnya)) {
    return { arah: "tidak_ada", delta: 0 };
  }
  const delta = nilai - sebelumnya;
  if (Math.abs(delta) <= toleransi) {
    return { arah: "sama", delta: 0 };
  }
  return { arah: delta > 0 ? "naik" : "turun", delta };
}

/** Catatan per waktu (urut terbaru dulu): bandingkan dengan catatan lebih lama di kolam yang sama. */
export function catatanSebelumnyaLog<T extends { kolamId: number }>(
  rows: T[],
  index: number,
): T | undefined {
  const cur = rows[index];
  if (!cur) return undefined;
  for (let j = index + 1; j < rows.length; j++) {
    if (rows[j].kolamId === cur.kolamId) return rows[j];
  }
  return undefined;
}

/** Ringkasan per periode (urut periode terbaru dulu): bandingkan periode sebelumnya di kolam yang sama. */
export function catatanSebelumnyaAgregat<T extends { kolamId: number }>(
  rows: T[],
  index: number,
): T | undefined {
  return catatanSebelumnyaLog(rows, index);
}
