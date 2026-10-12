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
  const q = `dari=${encodeURIComponent(dari)}&sampai=${encodeURIComponent(sampai)}`;

  const rows = [
    {
      id: "laba-rugi",
      judul: "Laba rugi",
      deskripsi: "",
      href: `/api/export/income-statement?${q}`,
    },
    {
      id: "neraca",
      judul: "Neraca",
      deskripsi: "",
      href: `/api/export/balance-sheet?${q}`,
    },
    {
      id: "arus-kas",
      judul: "Arus kas",
      deskripsi: "",
      href: `/api/export/cash-flow?${q}`,
    },
  ];

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Ekspor laporan"
      list={
        <div className="space-y-4">
          <MonthRangeFilter dari={dari} sampai={sampai} />
          <LaporanExportDaftar rows={rows} />
        </div>
      }
      listTitle="Unduhan"
    />
  );
}
