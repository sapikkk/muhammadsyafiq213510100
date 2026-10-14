import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import { EksporLembar } from "@/components/ekspor-lembar";
import { OwnerPeriodFilter } from "@/components/owner-period-filter";
import { monthlySummaryCached } from "@/lib/cached-queries";
import { defaultYearMonth, isYearMonth, parsePeriodeMode } from "@/lib/period-nav";
import { OwnerBagianSubnav } from "@/components/owner-bagian-subnav";
import {
  OwnerLaporanKeuanganPanel,
  type OwnerLaporanJenis,
} from "@/components/owner-laporan-keuangan-panel";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string; laporan?: string; periode?: string };

function parseJenis(raw: string | undefined): OwnerLaporanJenis {
  return raw === "neraca" ? "neraca" : "laba-rugi";
}

const LAPORAN_LINKS = [
  { id: "laba-rugi", label: "Laba rugi", epic: "7.2", param: "laporan", value: "laba-rugi" },
  { id: "neraca", label: "Neraca", epic: "7.3", param: "laporan", value: "neraca" },
];

export default async function OwnerLaporanPage({ searchParams }: { searchParams: Search }) {
  if (!searchParams.laporan) {
    const m = defaultYearMonth();
    redirect(`/owner/laporan?laporan=laba-rugi&dari=${m}&sampai=${m}`);
  }

  const periode = parsePeriodeMode(searchParams.periode);
  const def = defaultYearMonth();
  let dari =
    searchParams.dari && isYearMonth(searchParams.dari) ? searchParams.dari : def;
  let sampai =
    searchParams.sampai && isYearMonth(searchParams.sampai) ? searchParams.sampai : def;
  if (periode === "bulan") {
    dari = dari || def;
    sampai = dari;
  }
  const jenis = parseJenis(searchParams.laporan);

  const unduhPath =
    jenis === "neraca" ? "/api/export/balance-sheet" : "/api/export/income-statement";
  const jenisPratinjau = jenis === "neraca" ? "neraca" : "laba-rugi";
  const trend = jenis === "laba-rugi" ? await monthlySummaryCached(6) : null;

  return (
    <OwnerKeuanganChrome>
    <CrudPageLayout
      title={jenis === "neraca" ? "Neraca" : "Laba rugi"}
      actions={
        <EksporLembar
          unduhPath={unduhPath}
          pratinjauPath={`/api/export/preview?jenis=${encodeURIComponent(jenisPratinjau)}`}
          rentang="bulan"
          defaultDari={dari}
          defaultSampai={sampai}
        />
      }
      list={
        <div className="space-y-6">
          <Suspense fallback={null}>
            <OwnerBagianSubnav
              basePath="/owner/laporan"
              paramName="laporan"
              defaultValue="laba-rugi"
              links={LAPORAN_LINKS}
            />
          </Suspense>
          <Suspense fallback={null}>
            <OwnerPeriodFilter
              dari={dari}
              sampai={sampai}
              periode={periode}
              preserveKeys={["laporan"]}
              rentangField="month"
              rentangOptionLabel="Rentang bulan"
            />
          </Suspense>
          <OwnerLaporanKeuanganPanel
            jenis={jenis}
            dari={dari}
            sampai={sampai}
            monthTrend={trend?.months}
          />
        </div>
      }
      listTitle="Angka laporan"
    />
    </OwnerKeuanganChrome>
  );
}
