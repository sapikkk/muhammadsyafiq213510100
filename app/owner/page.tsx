import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { OwnerKpiCards } from "@/components/owner-kpi-cards";
import { OwnerPetaniAkunDaftar } from "@/components/owner-petani-akun-daftar";
import { ChartCard } from "@/components/chart-card";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { OwnerFlowDashboard } from "@/components/owner-flow-dashboard";
import { PageHeaderRow } from "@/components/page-header-row";
import { PageSection } from "@/components/page-section";
import { MetricCards } from "@/components/metric-cards";
import { formatRupiah } from "@/lib/format";
import { alertBannerItems } from "@/lib/inventaris";
import {
  kpiHidroponikMvpCached,
  listAlertStokMinimumCached,
  monthlySummaryCached,
} from "@/lib/cached-queries";
import { bestProfitMonth } from "@/lib/monthly-summary";
import Link from "next/link";
import { CuacaWidget } from "@/components/cuaca-widget";
import { RekeningSaldoWidget } from "@/components/rekening-saldo-widget";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const [petani, stokRendah, summary, kpiV2] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PEKERJA" },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, email: true },
    }),
    listAlertStokMinimumCached(),
    monthlySummaryCached(6),
    kpiHidroponikMvpCached(),
  ]);

  const labaTerbaik = bestProfitMonth(summary.months);

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow title="Beranda" />
      <div className="grid gap-3 lg:grid-cols-[1fr_minmax(240px,320px)]">
        <CuacaWidget />
      </div>
      <RekeningSaldoWidget />
      <InventarisAlertBanner
        items={alertBannerItems(stokRendah)}
        detailHref="/owner/stok-rendah"
      />
      <OwnerFlowDashboard />

      <nav
        aria-label="Laporan cepat Owner"
        className="flex flex-wrap gap-2 text-sm md:hidden"
      >
        <Link
          href="/owner/biaya"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Diagram biaya
        </Link>
        <Link
          href="/owner/evaluasi"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Untung dan titik impas
        </Link>
        <Link
          href="/owner/laporan"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Ekspor laporan
        </Link>
      </nav>

      <PageSection title="Ringkasan angka" badge="Read">
        <OwnerKpiCards
          pendapatan={summary.pendapatanBulanIni}
          pengeluaran={summary.pengeluaranBulanIni}
          labaKasar={summary.labaKasarBulanIni}
          batchPanenApproved={kpiV2.batchPanenApproved}
          avgHppPerLubang={kpiV2.avgHppPerLubang}
          avgYieldPct={kpiV2.avgYieldPct}
        />
      </PageSection>

      {labaTerbaik ? (
        <PageSection title="Sorotan 6 bulan" badge="Read">
          <MetricCards
            columns={2}
            items={[
              {
                label: "Bulan laba tertinggi",
                value: labaTerbaik.label,
                hint: `Laba kasar ${formatRupiah(labaTerbaik.laba)}`,
              },
            ]}
          />
          <p className="mt-3 text-sm">
            <Link href="/owner/evaluasi" className="text-primary hover:underline">
              Lihat untung, titik impas, dan kolam kosong →
            </Link>
          </p>
        </PageSection>
      ) : null}

      <ChartCard title="Pendapatan vs beban (6 bulan)">
        <OwnerRevenueChart months={summary.months} />
      </ChartCard>

      <PageSection title="Akun petani" badge="Read">
        <OwnerPetaniAkunDaftar rows={petani} />
      </PageSection>
    </div>
  );
}
