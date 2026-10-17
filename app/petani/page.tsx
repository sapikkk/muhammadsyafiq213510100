import Link from "next/link";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { PageHeaderRow } from "@/components/page-header-row";
import { PetaniBerandaAlurTanam } from "@/components/petani-beranda-alur-tanam";
import { MonitorKolamBeranda } from "@/components/monitor-kolam-beranda";
import { PetaniRingkasanSingkat } from "@/components/petani-ringkasan-singkat";
import { PetaniTugasBerandaRingkas } from "@/components/petani-tugas-beranda-ringkas";
import { Button } from "@/components/ui/button";
import { listAlertStokMinimum } from "@/lib/inventaris";
import { loadDashboardMonitorKolam } from "@/lib/monitor-kolam-dashboard";
import { daftarTugasPetani, historiAktivitasPetani } from "@/lib/tugas-petani";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import type { HistoriPetaniBaris } from "@/lib/tugas-petani";
import { CuacaWidget } from "@/components/cuaca-widget";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import type { MonitorLogBaris } from "@/lib/monitor-kolam-types";

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

const MONITOR_KOSONG = {
  totalLogs: 0,
  logTerbaru: [] as MonitorLogBaris[],
  lahan: [],
  greenhouse: [],
  kolam: [],
  siklus: [],
  defaultTglAwal: "",
  defaultTglAkhir: "",
};

export default async function PetaniPage() {
  const [stokRendahRaw, tugas, histori, monitor, produksi] = await Promise.all([
    muatAman(listAlertStokMinimum, []),
    muatAman(daftarTugasPetani, [] as TugasPetani[]),
    muatAman(() => historiAktivitasPetani(6), [] as HistoriPetaniBaris[]),
    muatAman(loadDashboardMonitorKolam, MONITOR_KOSONG),
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

  const stokCount = stokRendahRaw.length;
  const kap = produksi.kapasitas;
  const tugasUtama = tugas[0];
  const headerHref = tugasUtama?.href ?? "/petani/siklus/baru";
  const headerLabel = tugasUtama ? "Kerjakan tugas" : "Mulai semai";

  const historiClient = histori.map((h) => ({ ...h, waktu: h.waktu.toISOString() }));

  return (
    <div className="flex flex-col gap-2 max-sm:gap-1.5 lg:gap-3">
      <PageHeaderRow
        title="Beranda"
        actions={
          <Button type="button" className="h-10 w-full text-sm min-[480px]:w-auto sm:h-11" asChild>
            <Link href={headerHref} scroll={false}>
              {headerLabel}
            </Link>
          </Button>
        }
      />
      <DashboardBento className="max-sm:gap-1.5 lg:gap-2">
        <BentoSlot span={4} className="order-1">
          <PetaniRingkasanSingkat
            tugasCount={tugas.length}
            stokRendahCount={stokCount}
            kap={kap}
            siapJualLubang={produksi.siapJualLubang}
          />
        </BentoSlot>

        <BentoSlot span={2} className="order-2">
          <BentoSection title="Cuaca">
            <CuacaWidget variant="beranda" />
          </BentoSection>
        </BentoSlot>

        <BentoSlot span={6} className="order-3">
          <PetaniBerandaAlurTanam tugasUtama={tugasUtama} produksi={produksi} />
        </BentoSlot>

        <BentoSlot span={4} className="order-4">
          <MonitorKolamBeranda
            totalLogs={monitor.totalLogs}
            logTerbaru={monitor.logTerbaru}
            lahan={monitor.lahan}
            greenhouse={monitor.greenhouse}
            kolam={monitor.kolam}
            siklus={monitor.siklus}
            defaultTglAwal={monitor.defaultTglAwal}
            defaultTglAkhir={monitor.defaultTglAkhir}
            emptyAction={MONITOR_KOSONG_PETANI}
            hidePermissionBadge
            className="max-sm:p-3"
          />
        </BentoSlot>

        <BentoSlot span={2} className="order-5 max-lg:col-span-full">
          <BentoSection title="Tugas dan histori" id="tugas-hari-ini">
            {tugas.length === 0 && histori.length === 0 ? (
              <DashboardBentoEmpty
                message="Belum ada tugas. Ikuti urutan kerja di atas."
                actionLabel="Buka siklus tanam"
                href="/petani/siklus"
              />
            ) : (
              <PetaniTugasBerandaRingkas tugas={tugas} histori={historiClient} />
            )}
          </BentoSection>
        </BentoSlot>
      </DashboardBento>
    </div>
  );
}
