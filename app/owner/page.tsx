import { OwnerFlowDashboard } from "@/components/owner-flow-dashboard";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { OwnerKpiCards } from "@/components/owner-kpi-cards";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/format";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { kpiHidroponikMvpCached, monthlySummaryCached } from "@/lib/cached-queries";
import { bestProfitMonth } from "@/lib/monthly-summary";
import { OwnerHidroponikKpi } from "@/components/owner-hidroponik-kpi";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

      <OwnerKpiCards
        pendapatan={summary.pendapatanBulanIni}
        pengeluaran={summary.pengeluaranBulanIni}
        labaKasar={summary.labaKasarBulanIni}
      />

      <OwnerHidroponikKpi
        batchPanenApproved={kpiV2.batchPanenApproved}
        avgHppPerLubang={kpiV2.avgHppPerLubang}
        avgYieldPct={kpiV2.avgYieldPct}
      />

      {labaTerbaik ? (
        <Card className="border-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bulan laba tertinggi (6 bulan)</CardTitle>
            <CardDescription>
              {labaTerbaik.label} · laba kasar {formatRupiah(labaTerbaik.laba)} — US6.4 / uji T5.3
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/owner/evaluasi" className="text-sm text-primary hover:underline">
              Lihat evaluasi margin, BEP, dan kapasitas →
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Pendapatan vs beban</CardTitle>
          <CardDescription>6 bulan terakhir · akun pendapatan (4xxx) dan beban (5xxx)</CardDescription>
        </CardHeader>
        <CardContent>
          <OwnerRevenueChart months={summary.months} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Akun petani</CardTitle>
          <CardDescription>
            Daftar petani yang terdaftar di sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {petani.length === 0 ? (
            <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              Belum ada akun petani.
            </p>
          ) : (
            <ul className="divide-y rounded-md border">
              {petani.map((akun) => (
                <li key={akun.id} className="px-4 py-3">
                  <p className="text-sm font-medium">{akun.nama}</p>
                  <p className="text-xs text-muted-foreground">{akun.email}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
