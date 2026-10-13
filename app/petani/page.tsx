import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { PageHeaderRow } from "@/components/page-header-row";
import { PageSection } from "@/components/page-section";
import { PetaniMonitorSection } from "@/components/petani-monitor-section";
import { PetaniTugasPanel } from "@/components/petani-tugas-panel";
import { alertBannerItems, listAlertStokMinimum } from "@/lib/inventaris";
import type { InventarisAlertBannerItem } from "@/lib/inventaris-types";
import { listMonitorGrafikPetani } from "@/lib/monitor-kolam";
import { listMonitorFilterOptions } from "@/lib/monitor-kolam-export";
import type { MonitorGrafikTitik } from "@/lib/monitor-kolam-types";
import { daftarTugasPetani, historiAktivitasPetani } from "@/lib/tugas-petani";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import type { HistoriPetaniBaris } from "@/lib/tugas-petani";
import { CuacaWidget } from "@/components/cuaca-widget";

export const dynamic = "force-dynamic";

async function muatAman<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function PetaniPage() {
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const defaultTglAwal = monthAgo.toISOString().slice(0, 10);
  const defaultTglAkhir = new Date().toISOString().slice(0, 10);

  const [stokRendah, tugas, histori, monitorGrafik, monitorFilter] = await Promise.all([
    muatAman(
      async () => alertBannerItems(await listAlertStokMinimum()),
      [] as InventarisAlertBannerItem[],
    ),
    muatAman(daftarTugasPetani, [] as TugasPetani[]),
    muatAman(historiAktivitasPetani, [] as HistoriPetaniBaris[]),
    muatAman(listMonitorGrafikPetani, [] as MonitorGrafikTitik[]),
    muatAman(listMonitorFilterOptions, {
      lahan: [],
      greenhouse: [],
      kolam: [],
      siklus: [],
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow title="Beranda" />
      <CuacaWidget />
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
      <PageSection title="Monitor kolam" badge="Read">
        <PetaniMonitorSection
          points={monitorGrafik}
          lahan={monitorFilter.lahan}
          greenhouse={monitorFilter.greenhouse}
          kolam={monitorFilter.kolam}
          siklus={monitorFilter.siklus}
          defaultTglAwal={defaultTglAwal}
          defaultTglAkhir={defaultTglAkhir}
        />
      </PageSection>
      <PetaniTugasPanel
        tugas={tugas}
        histori={histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }))}
      />
    </div>
  );
}
