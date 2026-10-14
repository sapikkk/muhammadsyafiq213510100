import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporLembar } from "@/components/ekspor-lembar";
import { MonthRangeFilter } from "@/components/month-range-filter";
import { OwnerBagianSubnav } from "@/components/owner-bagian-subnav";
import {
  OwnerLaporanKeuanganPanel,
  type OwnerLaporanJenis,
} from "@/components/owner-laporan-keuangan-panel";

export const dynamic = "force-dynamic";

type Search = { dari?: string; sampai?: string; laporan?: string };

function defaultMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function parseJenis(raw: string | undefined): OwnerLaporanJenis {
  return raw === "neraca" ? "neraca" : "laba-rugi";
}

const LAPORAN_LINKS = [
  { id: "laba-rugi", label: "Laba rugi", epic: "7.2", param: "laporan", value: "laba-rugi" },
  { id: "neraca", label: "Neraca", epic: "7.3", param: "laporan", value: "neraca" },
];

export default function OwnerLaporanPage({ searchParams }: { searchParams: Search }) {
  if (!searchParams.laporan) {
    redirect(`/owner/laporan?laporan=laba-rugi&dari=${defaultMonth()}&sampai=${defaultMonth()}`);
  }

  const dari =
    searchParams.dari && /^\d{4}-\d{2}$/.test(searchParams.dari) ? searchParams.dari : defaultMonth();
  const sampai =
    searchParams.sampai && /^\d{4}-\d{2}$/.test(searchParams.sampai)
      ? searchParams.sampai
      : defaultMonth();
  const jenis = parseJenis(searchParams.laporan);

  const unduhPath =
    jenis === "neraca" ? "/api/export/balance-sheet" : "/api/export/income-statement";
  const jenisPratinjau = jenis === "neraca" ? "neraca" : "laba-rugi";

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
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
          <MonthRangeFilter dari={dari} sampai={sampai} />
          <OwnerLaporanKeuanganPanel jenis={jenis} dari={dari} sampai={sampai} />
        </div>
      }
      listTitle="Angka laporan"
    />
  );
}
