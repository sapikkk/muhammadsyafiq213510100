import Link from "next/link";
import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { DashboardMonitorKolamSection } from "@/components/dashboard-monitor-kolam-section";
import { MetricCards } from "@/components/metric-cards";
import { PageHeaderRow } from "@/components/page-header-row";
import { PetaniAlurPanel } from "@/components/petani-alur-panel";
import { PetaniTugasPanel } from "@/components/petani-tugas-panel";
import { Button } from "@/components/ui/button";
import { alertBannerItems, listAlertStokMinimum } from "@/lib/inventaris";
import {
  metricLubangTerisi,
  metricSiapJual,
  metricStokRendah,
  metricTugasPetani,
} from "@/lib/dashboard-metric-items";
import { loadDashboardMonitorKolam } from "@/lib/monitor-kolam-dashboard";
import { daftarTugasPetani, historiAktivitasPetani } from "@/lib/tugas-petani";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import type { HistoriPetaniBaris } from "@/lib/tugas-petani";
import { CuacaWidget } from "@/components/cuaca-widget";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";

export const dynamic = "force-dynamic";

async function muatAman<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const MONITOR_KOSONG_PETANI = {
  message: "Belum ada log monitor kolam. Catat pH, PPM, dan suhu dari siklus aktif.",
  actionLabel: "Buka siklus tanam",
  href: "/petani/siklus",
};

export default async function PetaniPage() {
  const [stokRendahRaw, tugas, histori, monitor, produksi] = await Promise.all([
    muatAman(listAlertStokMinimum, []),
    muatAman(daftarTugasPetani, [] as TugasPetani[]),
    muatAman(historiAktivitasPetani, [] as HistoriPetaniBaris[]),
    muatAman(loadDashboardMonitorKolam, {
      totalLogs: 0,
      lahan: [],
      greenhouse: [],
      kolam: [],
      siklus: [],
      defaultTglAwal: "",
      defaultTglAkhir: "",
    }),
    muatAman(loadProduksiRingkasan, {
      kapasitas: {
        totalLubang: 0,
        lubangTerisi: 0,
        lubangKosong: 0,
        pctTerisi: 0,
        pctKosong: 0,
        kolamProduksi: 0,
        kolamKosong: 0,
      },
      fase: [],
      siapJualLubang: 0,
      kolamIsi: [],
    }),
  ]);

  const stokRendah = alertBannerItems(stokRendahRaw);
  const stokCount = stokRendahRaw.length;
  const kap = produksi.kapasitas;
  const tugasUtama = tugas[0];
  const headerHref = tugasUtama?.href ?? "/petani/siklus/baru";
  const headerLabel = tugasUtama ? "Kerjakan tugas" : "Mulai semai";

  const metricTugas = {
    ...metricTugasPetani(tugas.length),
    ...(tugas.length > 0
      ? {
          followUp: {
            actionLabel: "Lihat daftar tugas",
            href: "/petani#tugas-hari-ini",
          },
        }
      : {}),
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderRow
        title="Beranda"
        actions={
          <Button type="button" className="h-11" asChild>
            <Link href={headerHref} scroll={false}>
              {headerLabel}
            </Link>
          </Button>
        }
      />
      <DashboardBento>
        <BentoSlot span={6}>
          <PetaniAlurPanel tugasUtama={tugasUtama} />
        </BentoSlot>

        <BentoSlot span={6}>
          {stokRendah.length > 0 ? (
            <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
          ) : (
            <DashboardBentoEmpty
              message="Tidak ada stok di bawah minimum."
              actionLabel="Cek stok barang"
              href="/petani/inventaris"
            />
          )}
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Ringkasan singkat">
            <MetricCards
              columns={2}
              items={[
                metricTugas,
                metricStokRendah(stokCount, "/petani"),
                metricLubangTerisi(kap, "/petani"),
                metricSiapJual(produksi.siapJualLubang, kap, "/petani"),
              ]}
            />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <CuacaWidget />
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Tugas dan histori" id="tugas-hari-ini">
            {tugas.length === 0 && histori.length === 0 ? (
              <DashboardBentoEmpty
                message="Belum ada tugas. Ikuti urutan kerja di atas."
                actionLabel="Buka siklus tanam"
                href="/petani/siklus"
              />
            ) : (
              <PetaniTugasPanel
                tugas={tugas}
                histori={histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }))}
              />
            )}
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <BentoSection title="Tanam dan kolam">
            <ProduksiRingkasanPanel
              data={produksi}
              kolamSetupHref="/petani/siklus"
              kolamSetupLabel="Buka siklus tanam"
            />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6}>
          <DashboardMonitorKolamSection
            hidePermissionBadge
            totalLogs={monitor.totalLogs}
            lahan={monitor.lahan}
            greenhouse={monitor.greenhouse}
            kolam={monitor.kolam}
            siklus={monitor.siklus}
            defaultTglAwal={monitor.defaultTglAwal}
            defaultTglAkhir={monitor.defaultTglAkhir}
            emptyAction={MONITOR_KOSONG_PETANI}
          />
        </BentoSlot>
      </DashboardBento>
    </div>
  );
}
