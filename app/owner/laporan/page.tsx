import { CrudPageLayout } from "@/components/crud-page-layout";
import { LaporanExportDaftar } from "@/components/laporan-export-daftar";
import { MonthRangeFilter } from "@/components/month-range-filter";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string };

function defaultMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function OwnerLaporanPage({ searchParams }: { searchParams: Search }) {
  const dari =
    searchParams.dari && /^\d{4}-\d{2}$/.test(searchParams.dari) ? searchParams.dari : defaultMonth();
  const sampai =
    searchParams.sampai && /^\d{4}-\d{2}$/.test(searchParams.sampai)
      ? searchParams.sampai
      : defaultMonth();
  const rows = [
    {
      id: "laba-rugi",
      judul: "Laba rugi",
      jenisPratinjau: "laba-rugi",
      unduhPath: "/api/export/income-statement",
    },
    {
      id: "neraca",
      judul: "Neraca",
      jenisPratinjau: "neraca",
      unduhPath: "/api/export/balance-sheet",
    },
    {
      id: "arus-kas",
      judul: "Arus kas",
      jenisPratinjau: "arus-kas",
      unduhPath: "/api/export/cash-flow",
    },
  ];

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Ekspor laporan"
      list={
        <div className="space-y-4">
          <MonthRangeFilter dari={dari} sampai={sampai} />
          <LaporanExportDaftar rows={rows} dari={dari} sampai={sampai} />
        </div>
      }
      listTitle="Unduhan"
    />
  );
}
