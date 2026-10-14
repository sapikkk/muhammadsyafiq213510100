/** Tipe grafik monitor — aman diimpor komponen client. */
export type MonitorGrafikTitik = {
  waktu: string;
  label: string;
  ppm: number;
  ph: number;
  suhu: number;
  kolam: string;
  kolamNama: string;
  greenhouseNama: string;
  kolamId: number;
  siklusId: number;
  greenhouseId: number;
  lahanId: number;
  /** Label tanam untuk tooltip (bukan kode batch). */
  siklusLabel: string;
};

export type MonitorKelompokMode = "hari" | "minggu" | "bulan";

export type MonitorAgregatBaris = {
  id: string;
  periodeLabel: string;
  periodeSort: string;
  greenhouse: string;
  kolam: string;
  kolamId: number;
  greenhouseId: number;
  jumlah: number;
  phRata: number;
  ppmRata: number;
  suhuRata: number;
};

export type MonitorLogBaris = {
  id: string;
  waktu: string;
  waktuLabel: string;
  greenhouse: string;
  kolam: string;
  kolamId: number;
  siklusLabel: string;
  ph: number;
  ppm: number;
  suhu: number;
};
