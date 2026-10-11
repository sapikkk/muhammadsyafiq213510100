import { OwnerFlowDashboard } from "@/components/owner-flow-dashboard";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { OwnerKpiCards } from "@/components/owner-kpi-cards";
import { OwnerPetaniAkunDaftar } from "@/components/owner-petani-akun-daftar";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { PageHeader } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { MetricRowsTable } from "@/components/metric-rows-table";
import { formatRupiah } from "@/lib/format";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { kpiHidroponikMvpCached, monthlySummaryCached } from "@/lib/cached-queries";
import { bestProfitMonth } from "@/lib/monthly-summary";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const [petani, stokRendah, summary, kpiV2] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PEKERJA" },
      orderBy: { nama: "asc" },
      select: { id: true, nama: true, email: true },
    }),
    listAlertStokMinimum(),
    monthlySummaryCached(6),
    kpiHidroponikMvpCached(),
  ]);

  const labaTerbaik = bestProfitMonth(summary.months);

  return (
    <>
      <PageHeader
        eyebrow="Owner"
        title="Dashboard"
        description="KPI keuangan, alur approve jurnal, dan ekspor laporan sidang."
      />
      <InventarisAlertBanner items={stokRendah} detailHref="/owner/stok-rendah" />
      <OwnerFlowDashboard />

      <nav
        aria-label="Laporan cepat Owner"
        className="flex flex-wrap gap-2 text-sm md:hidden"
      >
        <Link
          href="/owner/biaya"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Pie biaya
        </Link>
        <Link
          href="/owner/evaluasi"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Margin & BEP
        </Link>
        <Link
          href="/owner/laporan"
          className="inline-flex min-h-11 items-center border px-3 font-medium hover:bg-accent"
        >
          Ekspor laporan
        </Link>
      </nav>

      <PageSection title="KPI ringkas" badge="Read">
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
          <MetricRowsTable
            rows={[
              {
                label: "Bulan laba tertinggi",
                value: labaTerbaik.label,
                hint: `Laba kasar ${formatRupiah(labaTerbaik.laba)}`,
              },
            ]}
          />
          <p className="mt-3 text-sm">
            <Link href="/owner/evaluasi" className="text-primary hover:underline">
              Lihat evaluasi margin, BEP, dan kapasitas →
            </Link>
          </p>
        </PageSection>
      ) : null}

      <PageSection
        title="Pendapatan vs beban"
        description="6 bulan terakhir · akun pendapatan (4xxx) dan beban (5xxx)"
        badge="Read"
      >
        <OwnerRevenueChart months={summary.months} />
      </PageSection>

      <PageSection title="Akun petani" description="Login HP / pekerja lapangan." badge="Read">
        <OwnerPetaniAkunDaftar rows={petani} />
      </PageSection>
    </>
  );
}
