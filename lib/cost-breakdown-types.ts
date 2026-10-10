export type CostSlice = {
  akunId: number;
  kode: string;
  nama: string;
  total: string;
  persen: number;
};

export type DrilldownRow = {
  jurnalId: number;
  tanggal: string;
  keterangan: string;
  nominal: string;
};

export type CostBreakdownResult = {
  dari: string;
  sampai: string;
  totalBeban: string;
  slices: CostSlice[];
  drilldown: DrilldownRow[] | null;
};
