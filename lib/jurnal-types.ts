import type { StatusJurnalKey } from "@/lib/jurnal-status";

export type SerializedJurnalBarisRingkas = {
  id: number;
  akunNama: string;
  debit: string;
  kredit: string;
};

export type SerializedJurnalListRow = {
  id: number;
  tanggalIso: string;
  keterangan: string;
  status: StatusJurnalKey;
  sumber: string;
  dibuatOlehNama: string;
  barisCount: number;
  totalDebit: string;
  totalKredit: string;
  baris: SerializedJurnalBarisRingkas[];
};
