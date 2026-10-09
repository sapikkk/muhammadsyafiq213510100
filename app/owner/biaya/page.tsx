import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { OwnerCostPie } from "@/components/owner-cost-pie";
import { costBreakdown } from "@/lib/cost-breakdown";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string; akunId?: string };

export default async function OwnerBiayaPage({ searchParams }: { searchParams: Search }) {
  const akunId = searchParams.akunId ? Number(searchParams.akunId) : null;
  const data = await costBreakdown({
    dari: searchParams.dari ?? null,
    sampai: searchParams.sampai ?? null,
    akunId: akunId != null && Number.isInteger(akunId) ? akunId : null,
  });

  const baseQuery = new URLSearchParams();
  if (searchParams.dari) baseQuery.set("dari", searchParams.dari);
  if (searchParams.sampai) baseQuery.set("sampai", searchParams.sampai);
  const baseQueryStr = baseQuery.toString();

  const now = new Date();
  const defaultDari = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Breakdown biaya"
        description="US6.2 — pie beban per akun (jurnal APPROVED). Klik akun untuk drill-down jurnal."
      />

      <form method="get" className="flex flex-wrap items-end gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Dari (YYYY-MM)</span>
          <input
            name="dari"
            defaultValue={searchParams.dari ?? defaultDari}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted-foreground">Sampai (YYYY-MM)</span>
          <input
            name="sampai"
            defaultValue={searchParams.sampai ?? defaultDari}
            className="h-9 rounded-md border bg-background px-2"
            pattern="\d{4}-\d{2}"
          />
        </label>
        <button type="submit" className="h-9 rounded-md bg-primary px-4 text-primary-foreground">
          Terapkan
        </button>
      </form>

      <p className="text-sm text-muted-foreground">
        Periode {data.dari} s/d {data.sampai} · Total beban {formatRupiah(data.totalBeban)}
      </p>

      <OwnerCostPie
        slices={data.slices}
        selectedAkunId={akunId}
        baseQuery={baseQueryStr}
      />

      {data.drilldown && data.drilldown.length > 0 ? (
        <section className="rounded-md border">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-medium">Drill-down jurnal</h2>
            <Link href={`/owner/biaya?${baseQueryStr}`} className="text-xs text-primary hover:underline">
              Tutup drill-down
            </Link>
          </div>
          <ul className="divide-y text-sm">
            {data.drilldown.map((row, i) => (
              <li key={`${row.jurnalId}-${i}`} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                <div>
                  <p className="font-medium">Jurnal #{row.jurnalId}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.tanggal} · {row.keterangan}
                  </p>
                </div>
                <span className="tabular-nums">{formatRupiah(row.nominal)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
