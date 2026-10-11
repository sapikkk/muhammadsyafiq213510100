import { CrudPageLayout } from "@/components/crud-page-layout";
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

  return (
    <CrudPageLayout
      eyebrow="Ringkasan"
      title="Ekspor laporan"
      description="US6.3 — laba rugi & neraca PDF (Owner/Admin). Jurnal xlsx di menu Admin."
      flowSteps={[
        { label: "Pilih periode", detail: "Format YYYY-MM — sama dengan filter arus kas." },
        { label: "Unduh PDF", detail: "Klik kartu — file dari API export (jurnal APPROVED)." },
      ]}
      list={
        <div className="space-y-4">
          <MonthRangeFilter dari={dari} sampai={sampai} />
          <ul className="grid gap-3 sm:grid-cols-2">
            <li>
              <a
                href={`/api/export/income-statement?${q}`}
                className="block rounded-md border p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-medium">Laba rugi (PDF)</p>
                <p className="text-sm text-muted-foreground">
                  Periode {dari}–{sampai} · jurnal APPROVED
                </p>
              </a>
            </li>
            <li>
              <a
                href={`/api/export/balance-sheet?${q}`}
                className="block rounded-md border p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-medium">Neraca (PDF)</p>
                <p className="text-sm text-muted-foreground">Saldo akun posting (snapshot)</p>
              </a>
            </li>
            <li>
              <a
                href={`/api/export/cash-flow?${q}`}
                className="block rounded-md border p-4 transition-colors hover:bg-muted/50"
              >
                <p className="font-medium">Arus kas (PDF)</p>
                <p className="text-sm text-muted-foreground">Kas/Bank · jurnal APPROVED</p>
              </a>
            </li>
          </ul>
        </div>
      }
      listTitle="Unduhan"
    />
  );
}
