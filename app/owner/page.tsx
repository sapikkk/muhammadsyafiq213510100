import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { ChartCard } from "@/components/chart-card";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { OwnerDashboardKeuanganPanel } from "@/components/owner-dashboard-keuangan-panel";
import { loadOwnerDashboardKeuangan } from "@/lib/owner-dashboard-keuangan";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { PageHeaderRow } from "@/components/page-header-row";
import { MetricCards } from "@/components/metric-cards";
import { formatRupiah } from "@/lib/format";
import { alertBannerItems } from "@/lib/inventaris";
import { metricLubangTerisi, metricSiapJual } from "@/lib/dashboard-metric-items";
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
  const [stokRendah, summary, kpiV2, produksi, monitor, keuanganUtama] = await Promise.all([
    listAlertStokMinimumCached(),
    monthlySummaryCached(6),
    kpiHidroponikMvpCached(),
    loadProduksiRingkasan(),
    loadDashboardMonitorKolam(),
    loadOwnerDashboardKeuangan(),
  ]);

  const labaTerbaik = bestProfitMonth(summary.months);
  const kap = produksi.kapasitas;
  const alertItems = alertBannerItems(stokRendah);

  const operasionalItems = [
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
            href: "/owner/evaluasi?bagian=untung",
          },
        }
      : {
          id: "laba-terbaik",
          label: "Laba tertinggi (6 bulan)",
          value: "—",
          emptyState: {
            message: "Belum ada laba tercatat dalam 6 bulan terakhir.",
            actionLabel: "Lihat evaluasi",
            href: "/owner/evaluasi?bagian=untung",
          },
        },
    {
      id: "hpp-lubang",
      label: "HPP rata-rata per lubang",
      value:
        kpiV2.batchPanenApproved > 0 ? formatRupiah(kpiV2.avgHppPerLubang) : "—",
      ...(kpiV2.batchPanenApproved <= 0
        ? {
            emptyState: {
              message: "Belum ada batch panen disetujui.",
              actionLabel: "Lihat produksi",
              href: "/owner/produksi",
            },
          }
        : {}),
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
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(10.5rem,13.5rem)] lg:items-start">
            <BentoSection title="Operasional & HPP" className="min-w-0">
              <MetricCards columns={4} items={operasionalItems} />
            </BentoSection>
            <BentoSection title="Stok di bawah minimum" className="min-w-0">
              {alertItems.length > 0 ? (
                <InventarisAlertBanner items={alertItems} detailHref="/owner/stok-rendah" />
              ) : (
                <DashboardBentoEmpty
                  compact
                  message="Semua stok di atas minimum."
                  actionLabel="Cek stok barang"
                  href="/owner/inventaris"
                />
              )}
            </BentoSection>
          </div>
        </BentoSlot>

        <BentoSlot span={6}>
          <OwnerDashboardKeuanganPanel data={keuanganUtama} />
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
