import type { TipePergerakan } from "@/lib/inventaris-pergerakan";
import type { SatuanInventaris } from "@/lib/inventaris-satuan";

export type SerializedItemInventaris = {
  id: number;
  kode: string;
  nama: string;
  satuan: SatuanInventaris;
  stokSaatIni: string;
  stokMinimum: string;
  diBawahMinimum: boolean;
  aktif: boolean;
};

export type SerializedAlertStok = SerializedItemInventaris & {
  kekurangan: string;
};

export type SerializedPergerakan = {
  id: number;
  tipe: TipePergerakan;
  jumlah: string;
  stokSebelum: string;
  stokSesudah: string;
  keterangan: string | null;
  dibuatPada: string;
  item: { kode: string; nama: string; satuan: SatuanInventaris };
  user: { nama: string; role: string };
};
