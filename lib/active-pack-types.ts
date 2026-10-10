import type { SatuanInventaris } from "@/lib/inventaris-satuan";

export type SerializedActivePack = {
  id: number;
  kode: string;
  itemId: number;
  status: string;
  hargaPack: string;
  jumlahUnit: string;
  sisaUnit: string;
  biayaPerUnit: string;
  depleted: boolean;
  keterangan: string | null;
  dibuatOlehId: number;
  dibuatPada: Date;
};

export type ActivePackListRow = SerializedActivePack & {
  item: { kode: string; nama: string; satuan: SatuanInventaris };
  dibuatOleh: { nama: string };
};
