import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { OwnerKpiCards } from "@/components/owner-kpi-cards";
import { ChartCard } from "@/components/chart-card";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { OwnerFlowDashboard } from "@/components/owner-flow-dashboard";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { PageHeaderRow } from "@/components/page-header-row";
import { MetricCards } from "@/components/metric-cards";
import { formatRupiah } from "@/lib/format";
import { alertBannerItems } from "@/lib/inventaris";
import {
  metricLubangTerisi,
  metricSiapJual,
  metricStokRendah,
} from "@/lib/dashboard-metric-items";
import {
  kpiHidroponikMvpCached,
  listAlertStokMinimumCached,
  monthlySummaryCached,
} from "@/lib/cached-queries";
import { bestProfitMonth } from "@/lib/monthly-summary";
import { CuacaWidget } from "@/components/cuaca-widget";
import { RekeningSaldoBentoSection } from "@/components/rekening-saldo-widget";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import { DashboardMonitorKolamSection } from "@/components/dashboard-monitor-kolam-section";
import { DashboardProduksiFaseChart } from "@/components/dashboard-produksi-fase-chart";
import { DashboardMonitorChartsPanel } from "@/components/dashboard-monitor-charts-panel";
import { loadDashboardMonitorKolam } from "@/lib/monitor-kolam-dashboard";

export const dynamic = "force-dynamic";

const MONITOR_KOSONG_OWNER = {
  message: "Belum ada log monitor kolam untuk dibandingkan antar greenhouse.",
  actionLabel: "Lihat lahan dan kolam",
  href: "/owner/infrastruktur",
};

export default async function OwnerPage() {
  const [stokRendah, summary, kpiV2, produksi, monitor] = await Promise.all([
    listAlertStokMinimumCached(),
    monthlySummaryCached(6),
    kpiHidroponikMvpCached(),
    loadProduksiRingkasan(),
    loadDashboardMonitorKolam(),
  ]);

  const labaTerbaik = bestProfitMonth(summary.months);
  const stokCount = stokRendah.length;
  const kap = produksi.kapasitas;
  const alertItems = alertBannerItems(stokRendah);

  const operasionalItems = [
    metricStokRendah(stokCount, "/owner"),
    metricLubangTerisi(kap, "/owner"),
    metricSiapJual(produksi.siapJualLubang, kap, "/owner"),
    labaTerbaik
      ? {
          id: "laba-terbaik",
          label: "Laba tertinggi (6 bulan)",
          value: labaTerbaik.label,
          hint: `Laba kasar ${formatRupiah(labaTerbaik.laba)}`,
          followUp: {
            actionLabel: "Lihat evaluasi",
            href: "/owner/evaluasi",
          },
        }
      : {
          id: "laba-terbaik",
          label: "Laba tertinggi (6 bulan)",
          value: "—",
          emptyState: {
            message: "Belum ada laba tercatat dalam 6 bulan terakhir.",
            actionLabel: "Lihat evaluasi",
            href: "/owner/evaluasi",
          },
        },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderRow title="Beranda" />
      <DashboardBento>
        <BentoSlot span={6}>
          <CuacaWidget />
        </BentoSlot>

        <BentoSlot span={6}>
          <RekeningSaldoBentoSection />
        </BentoSlot>

        <BentoSlot span={6}>
          {alertItems.length > 0 ? (
            <InventarisAlertBanner items={alertItems} detailHref="/owner/stok-rendah" />
          ) : (
            <DashboardBentoEmpty
              message="Tidak ada stok di bawah minimum."
              actionLabel="Cek stok barang"
              href="/owner/inventaris"
            />
          )}
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Bulan ini">
            <OwnerKpiCards
              pendapatan={summary.pendapatanBulanIni}
              pengeluaran={summary.pengeluaranBulanIni}
              labaKasar={summary.labaKasarBulanIni}
              batchPanenApproved={kpiV2.batchPanenApproved}
              avgHppPerLubang={kpiV2.avgHppPerLubang}
              avgYieldPct={kpiV2.avgYieldPct}
            />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Operasional">
            <MetricCards columns={4} items={operasionalItems} />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <OwnerFlowDashboard stokRendahCount={stokCount} />
        </BentoSlot>

        <BentoSlot span={3}>
          <ChartCard title="Pendapatan vs beban (6 bulan)" className="h-full">
            <OwnerRevenueChart months={summary.months} />
          </ChartCard>
        </BentoSlot>

        <BentoSlot span={3}>
          <DashboardProduksiFaseChart
            fase={produksi.fase}
            siapJual={produksi.siapJualLubang}
            kolamSetupHref="/owner/infrastruktur"
          />
        </BentoSlot>

        <BentoSlot span={6}>
          <DashboardMonitorChartsPanel
            tglAwal={monitor.defaultTglAwal}
            tglAkhir={monitor.defaultTglAkhir}
            emptyHref="/owner/infrastruktur"
          />
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Tanam dan kolam">
            <ProduksiRingkasanPanel
              data={produksi}
              kolamSetupHref="/owner/infrastruktur"
            />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <DashboardMonitorKolamSection
            totalLogs={monitor.totalLogs}
            lahan={monitor.lahan}
            greenhouse={monitor.greenhouse}
            kolam={monitor.kolam}
            siklus={monitor.siklus}
            defaultTglAwal={monitor.defaultTglAwal}
            defaultTglAkhir={monitor.defaultTglAkhir}
            emptyAction={MONITOR_KOSONG_OWNER}
          />
        </BentoSlot>
      </DashboardBento>
    </div>
  );
}
