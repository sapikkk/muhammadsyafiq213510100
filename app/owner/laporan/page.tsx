import { PageHeader } from "@/components/page-header";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string };

function defaultMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function OwnerLaporanPage({ searchParams }: { searchParams: Search }) {
  const dari = searchParams.dari && /^\d{4}-\d{2}$/.test(searchParams.dari) ? searchParams.dari : defaultMonth();
  const sampai =
    searchParams.sampai && /^\d{4}-\d{2}$/.test(searchParams.sampai) ? searchParams.sampai : defaultMonth();
  const q = `dari=${encodeURIComponent(dari)}&sampai=${encodeURIComponent(sampai)}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ekspor laporan"
        description="US6.3 — laba rugi & neraca PDF (Owner/Admin). Jurnal xlsx di menu Admin."
      />

      <form method="get" className="flex flex-wrap items-end gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Dari (YYYY-MM)</span>
          <input
            name="dari"
            defaultValue={dari}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Sampai (YYYY-MM)</span>
          <input
            name="sampai"
            defaultValue={sampai}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <button type="submit" className="h-9 rounded-md bg-primary px-4 text-primary-foreground">
          Terapkan
        </button>
      </form>

      <ul className="grid gap-3 sm:grid-cols-2">
        <li>
          <a
            href={`/api/export/income-statement?${q}`}
            className="block rounded-md border p-4 hover:bg-muted/50"
          >
            <p className="font-medium">Laba rugi (PDF)</p>
            <p className="text-sm text-muted-foreground">
              Periode {dari}–{sampai} · jurnal APPROVED
            </p>
          </a>
        </li>
        <li>
          <a href={`/api/export/balance-sheet?${q}`} className="block rounded-md border p-4 hover:bg-muted/50">
            <p className="font-medium">Neraca (PDF)</p>
            <p className="text-sm text-muted-foreground">Saldo akun posting (snapshot)</p>
          </a>
        </li>
        <li>
          <a href={`/api/export/cash-flow?${q}`} className="block rounded-md border p-4 hover:bg-muted/50">
            <p className="font-medium">Arus kas (PDF)</p>
            <p className="text-sm text-muted-foreground">Kas/Bank · jurnal APPROVED</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
