import { AdminFlowDashboard } from "@/components/admin-flow-dashboard";
import { ResetRequests } from "@/components/reset-requests";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { MetricCards } from "@/components/metric-cards";
import { PageHeaderRow } from "@/components/page-header-row";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import { alertBannerItems } from "@/lib/inventaris";
import {
  metricLubangTerisi,
  metricSiapJual,
  metricStokRendah,
} from "@/lib/dashboard-metric-items";
import { listAlertStokMinimumCached, monthlySummaryCached } from "@/lib/cached-queries";
import { ChartCard } from "@/components/chart-card";
import { OwnerRevenueChart } from "@/components/owner-revenue-chart";
import { DashboardProduksiFaseChart } from "@/components/dashboard-produksi-fase-chart";
import { DashboardMonitorChartsPanel } from "@/components/dashboard-monitor-charts-panel";
import { CuacaWidget } from "@/components/cuaca-widget";
import { DashboardMonitorKolamSection } from "@/components/dashboard-monitor-kolam-section";
import { loadDashboardMonitorKolam } from "@/lib/monitor-kolam-dashboard";
import { prisma } from "@/lib/prisma";

const MONITOR_KOSONG_ADMIN = {
  message: "Belum ada log monitor kolam. Pastikan petani mencatat dari siklus aktif.",
  actionLabel: "Lihat lahan dan kolam",
  href: "/admin/infrastruktur",
};

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminPage() {
  const [pending, stokRendah, produksi, monitor, summary] = await Promise.all([
    prisma.passwordResetRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { requestedAt: "asc" },
      include: { user: { select: { nama: true, email: true } } },
    }),
    listAlertStokMinimumCached(),
    loadProduksiRingkasan(),
    loadDashboardMonitorKolam(),
    monthlySummaryCached(6),
  ]);

  const stokCount = stokRendah.length;
  const kap = produksi.kapasitas;
  const alertItems = alertBannerItems(stokRendah);

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderRow title="Beranda" />
      <DashboardBento>
        <BentoSlot span={6}>
          <BentoSection title="Cuaca" className="max-sm:p-3">
            <CuacaWidget />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          {alertItems.length > 0 ? (
            <InventarisAlertBanner items={alertItems} detailHref="/admin/stok-rendah" />
          ) : (
            <DashboardBentoEmpty
              message="Tidak ada stok di bawah minimum."
              actionLabel="Cek stok barang"
              href="/admin/inventaris"
            />
          )}
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Ringkasan">
            <MetricCards
              columns={4}
              items={[
                metricStokRendah(stokCount, "/admin"),
                metricLubangTerisi(kap, "/admin"),
                metricSiapJual(produksi.siapJualLubang, kap, "/admin"),
                pending.length > 0
                  ? {
                      id: "reset-sandi",
                      label: "Reset sandi menunggu",
                      value: pending.length,
                      hint: "Lihat di bawah",
                      followUp: {
                        actionLabel: "Proses permintaan",
                        href: "/admin#reset-sandi",
                      },
                    }
                  : {
                      id: "reset-sandi",
                      label: "Reset sandi menunggu",
                      value: 0,
                      emptyState: {
                        message: "Belum ada permintaan reset sandi.",
                        actionLabel: "Lihat halaman lupa sandi",
                        href: "/lupa-sandi",
                      },
                    },
              ]}
            />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <AdminFlowDashboard stokRendahCount={stokCount} />
        </BentoSlot>

        <BentoSlot span={3}>
          <ChartCard title="Pendapatan vs beban (6 bulan)">
            <OwnerRevenueChart months={summary.months} />
          </ChartCard>
        </BentoSlot>

        <BentoSlot span={3}>
          <DashboardProduksiFaseChart
            fase={produksi.fase}
            siapJual={produksi.siapJualLubang}
            kolamSetupHref="/admin/infrastruktur"
          />
        </BentoSlot>

        <BentoSlot span={6}>
          <DashboardMonitorChartsPanel
            tglAwal={monitor.defaultTglAwal}
            tglAkhir={monitor.defaultTglAkhir}
            emptyHref="/admin/infrastruktur"
          />
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Tanam dan kolam">
            <ProduksiRingkasanPanel
              data={produksi}
              kolamSetupHref="/admin/infrastruktur"
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
            emptyAction={MONITOR_KOSONG_ADMIN}
          />
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection
            id="reset-sandi"
            title={
              pending.length > 0
                ? `Permintaan reset sandi (${pending.length})`
                : "Permintaan reset sandi"
            }
            badge={pending.length > 0 ? "Update" : "Read"}
          >
            {pending.length > 0 ? (
              <ResetRequests
                requests={pending.map((request) => ({
                  id: request.id,
                  nama: request.user.nama,
                  email: request.user.email,
                  requestedAt: formatter.format(request.requestedAt),
                }))}
              />
            ) : (
              <DashboardBentoEmpty message="Belum ada permintaan reset sandi menunggu diproses." />
            )}
          </BentoSection>
        </BentoSlot>
      </DashboardBento>
    </div>
  );
}
