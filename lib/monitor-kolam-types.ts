/** Tipe grafik monitor — aman diimpor komponen client. */
export type MonitorGrafikTitik = {
  waktu: string;
  label: string;
  ppm: number;
  ph: number;
  suhu: number;
  kolam: string;
  /** Label tanam untuk tooltip (bukan kode batch). */
  siklusLabel: string;
};
