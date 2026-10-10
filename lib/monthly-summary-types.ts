export type MonthPoint = {
  bulan: string;
  label: string;
  pendapatan: string;
  pengeluaran: string;
};

export type MonthlySummaryResult = {
  pendapatanBulanIni: string;
  pengeluaranBulanIni: string;
  labaKasarBulanIni: string;
  months: MonthPoint[];
};

export type BestProfitMonth = {
  bulan: string;
  label: string;
  laba: string;
};
