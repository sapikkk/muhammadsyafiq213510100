import { redirect } from "next/navigation";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { OwnerBiayaBagianPanel } from "@/components/owner-biaya-bagian-panel";
import { TABS_BIAYA } from "@/lib/owner-section-tabs";
import { BebanDrilldownDaftar, BebanPerAkunDaftar } from "@/components/beban-per-akun-daftar";
import { MetricCards } from "@/components/metric-cards";
import { OwnerCostPie } from "@/components/owner-cost-pie";
import { PageSection } from "@/components/page-section";
import { costBreakdown } from "@/lib/cost-breakdown";
import { formatRupiah } from "@/lib/format";
import {
  loadOwnerBiayaBagianData,
  parseOwnerBiayaBagian,
} from "@/lib/owner-biaya-bagian";

export const dynamic = "force-dynamic";

type Search = { bagian?: string; dari?: string; sampai?: string; akunId?: string };

export default async function OwnerBiayaPage({ searchParams }: { searchParams: Search }) {
  if (!searchParams.bagian) {
    redirect("/owner/biaya?bagian=langsung");
  }

  const bagian = parseOwnerBiayaBagian(searchParams.bagian);
  const bagianData = await loadOwnerBiayaBagianData(bagian);

  const akunId = searchParams.akunId ? Number(searchParams.akunId) : null;
  const showBebanJurnal = bagian === "umum";
  const data = showBebanJurnal
    ? await costBreakdown({
        dari: searchParams.dari ?? null,
        sampai: searchParams.sampai ?? null,
        akunId: akunId != null && Number.isInteger(akunId) ? akunId : null,
      })
    : null;

  const baseQuery = new URLSearchParams();
  baseQuery.set("bagian", bagian);
  if (searchParams.dari) baseQuery.set("dari", searchParams.dari);
  if (searchParams.sampai) baseQuery.set("sampai", searchParams.sampai);
  const baseQueryStr = baseQuery.toString();

  const now = new Date();
  const defaultDari = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <CrudPageLayout
      title="Biaya & HPP"
      list={
        <div className="space-y-4">
          <OwnerSectionTabsShell tabs={TABS_BIAYA} />
          <OwnerBiayaBagianPanel data={bagianData} />
          {showBebanJurnal && data ? (
            <>
              <form method="get" className="flex flex-wrap items-end gap-3 text-sm">
                <input type="hidden" name="bagian" value="umum" />
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Dari (tahun-bulan)</span>
                  <input
                    name="dari"
                    defaultValue={searchParams.dari ?? defaultDari}
                    className="h-9 rounded-md border bg-background px-2"
                    pattern="\d{4}-\d{2}"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Sampai (tahun-bulan)</span>
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
              <MetricCards
                columns={2}
                items={[
                  { label: "Periode jurnal", value: `${data.dari} – ${data.sampai}` },
                  { label: "Total beban (jurnal)", value: formatRupiah(data.totalBeban) },
                ]}
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <OwnerCostPie
                  slices={data.slices}
                  selectedAkunId={akunId}
                  baseQuery={baseQueryStr}
                />
                <BebanPerAkunDaftar slices={data.slices} baseQuery={baseQueryStr} />
              </div>
            </>
          ) : null}
        </div>
      }
      listTitle={
        bagian === "umum" && data?.slices.length
          ? "Beban per akun (jurnal)"
          : undefined
      }
      extra={
        showBebanJurnal && data?.drilldown && data.drilldown.length > 0 ? (
          <PageSection title="Rincian catatan keuangan" badge="Read">
            <BebanDrilldownDaftar rows={data.drilldown} tutupHref={`/owner/biaya?${baseQueryStr}`} />
          </PageSection>
        ) : null
      }
    />
  );
}
