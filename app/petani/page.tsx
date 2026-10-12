import { InventarisAlertBanner } from "@/components/inventaris-alert-banner";
import { PageHeaderRow } from "@/components/page-header-row";
import { PageSection } from "@/components/page-section";
import { PetaniMonitorChartLazy } from "@/components/petani-monitor-chart.lazy";
import { PetaniTugasPanel } from "@/components/petani-tugas-panel";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { listMonitorGrafikPetani } from "@/lib/monitor-kolam";
import type { MonitorGrafikTitik } from "@/lib/monitor-kolam-types";
import { daftarTugasPetani, historiAktivitasPetani } from "@/lib/tugas-petani";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import type { ItemInventaris } from "@prisma/client";
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
  const [stokRendah, tugas, histori, monitorGrafik] = await Promise.all([
    muatAman(listAlertStokMinimum, [] as ItemInventaris[]),
    muatAman(daftarTugasPetani, [] as TugasPetani[]),
    muatAman(historiAktivitasPetani, [] as HistoriPetaniBaris[]),
    muatAman(listMonitorGrafikPetani, [] as MonitorGrafikTitik[]),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow eyebrow="Petani" title="Beranda" />
      <CuacaWidget />
      <InventarisAlertBanner items={stokRendah} detailHref="/petani/stok-rendah" />
      <PageSection title="Monitor kolam" badge="Read">
        <PetaniMonitorChartLazy points={monitorGrafik} />
      </PageSection>
      <PetaniTugasPanel
        tugas={tugas}
        histori={histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }))}
      />
    </div>
  );
}
