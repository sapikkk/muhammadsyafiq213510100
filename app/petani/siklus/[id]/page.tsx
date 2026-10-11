import { notFound } from "next/navigation";
import { HarvestForm } from "@/components/harvest-form";
import { LogKegagalanDaftar } from "@/components/log-kegagalan-daftar";
import { LogProduksiDaftar } from "@/components/log-produksi-daftar";
import { PageSection } from "@/components/page-section";
import { PindahFaseForm } from "@/components/pindah-fase-form";
import { SiklusDetailSecondary } from "@/components/siklus-detail-secondary";
import { SiklusTimeline } from "@/components/siklus-timeline";
import { DetailLayout } from "@/components/detail-layout";
import { Badge } from "@/components/ui/badge";
import { formatTanggal } from "@/lib/format";
import { serializeLaporanRingkas } from "@/lib/laporan-panen";
import {
  faseBerikutnya,
  faseLabel,
  isFaseProduksi,
  type FaseProduksi,
} from "@/lib/siklus-fase";
import { listLogKegagalan, serializeLogKegagalan } from "@/lib/log-kegagalan";
import { getSiklusProduksi, listLogProduksi } from "@/lib/siklus-produksi";
import { siklusBolehAbort, STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { buildTimelineSiklus } from "@/lib/timeline-siklus";
import { listActivePack } from "@/lib/active-pack";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const siklus = await getSiklusProduksi(id);
  if (!siklus) notFound();

  const [logs, kegagalan, packs] = await Promise.all([
    listLogProduksi(id),
    listLogKegagalan(id),
    listActivePack(true),
  ]);
  const kegagalanRows = kegagalan.map(serializeLogKegagalan);
  const status = siklus.status;
  const faseAktif = isFaseProduksi(status) ? status : null;
  const berikut = faseAktif ? faseBerikutnya(faseAktif) : null;
  const laporan = siklus.laporanPanen
    ? serializeLaporanRingkas(siklus.laporanPanen)
    : null;
  const timeline = buildTimelineSiklus(
    siklus,
    logs.map((l) => ({ fase_ke: l.fase_ke, waktu: l.waktu })),
  );
  const packsAktif = packs
    .filter((p) => p.status === "AKTIF")
    .map((p) => ({
      id: p.id,
      kode: p.kode,
      itemNama: p.item.nama,
      satuan: p.item.satuan,
      sisaUnit: p.sisaUnit.toString(),
    }));
  const canTambal =
    faseAktif &&
    (["SEMAI", "SPROUT_DAUN", "TAMBAL", "PINDAH_KOLAM", "PENDEWASAAN"] as string[]).includes(
      faseAktif,
    ) &&
    status !== "SELESAI";
  const canMonitor =
    faseAktif &&
    (["SPROUT_DAUN", "TAMBAL", "PINDAH_KOLAM", "PENDEWASAAN"] as string[]).includes(faseAktif);
  const canAbort = siklusBolehAbort(status, laporan?.status);
  const showKegagalan =
    status !== "SELESAI" && (!laporan || laporan.status !== "APPROVED");
  const showHarvest = faseAktif === "PANEN" && !laporan;

  const badgeLabel =
    status === STATUS_GAGAL_TOTAL
      ? "Gagal total (abort)"
      : faseAktif
        ? faseLabel[faseAktif]
        : status;

  return (
    <DetailLayout
      backHref="/petani/siklus"
      eyebrow="Siklus"
      title={siklus.kode_batch}
      badge={
        <Badge variant={status === STATUS_GAGAL_TOTAL ? "outline" : "secondary"}>
          {badgeLabel}
        </Badge>
      }
      description={`${siklus.varietas.nama} · ${siklus.kolam.greenhouse.nama} / ${siklus.kolam.nama}`}
      actions={
        <SiklusDetailSecondary
          siklusId={id}
          kodeBatch={siklus.kode_batch}
          jumlahDisemai={siklus.jumlah_disemai}
          totalSusut={siklus.total_susut}
          canMonitor={Boolean(canMonitor)}
          canTambal={Boolean(canTambal && (!laporan || laporan.status !== "APPROVED"))}
          canAbort={canAbort}
          showKegagalan={showKegagalan}
          packs={packsAktif}
        />
      }
    >
      {status === STATUS_GAGAL_TOTAL ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Siklus dihentikan (abort). Tidak ada lanjut fase atau panen.
        </p>
      ) : (
        <PageSection title="Langkah berikutnya" badge="Update">
          {showHarvest ? (
            <HarvestForm siklusId={id} jumlahDisemai={siklus.jumlah_disemai} />
          ) : faseAktif && berikut ? (
            <PindahFaseForm
              siklusId={id}
              faseSaatIni={faseAktif}
              faseBerikutnya={berikut as FaseProduksi}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {berikut === null && faseAktif
                ? "Siklus sudah selesai, tidak ada fase berikutnya."
                : "Tidak ada langkah fase saat ini — gunakan tombol di atas jika perlu."}
            </p>
          )}
        </PageSection>
      )}

      <PageSection title="Timeline produksi" badge="Read">
        <SiklusTimeline steps={timeline} />
      </PageSection>

      <PageSection title="Log fase" badge="Read">
        <LogProduksiDaftar
          rows={logs.map((l) => ({
            fase_dari: l.fase_dari,
            fase_ke: l.fase_ke,
            catatan: l.catatan,
            waktu: l.waktu.toISOString(),
            user: l.user,
          }))}
        />
      </PageSection>

      <PageSection title="Log kegagalan" badge="Read">
        <LogKegagalanDaftar rows={kegagalanRows} />
      </PageSection>

      {laporan ? (
        <PageSection title="Laporan panen" badge="Read">
          <div className="space-y-2 text-sm">
            <p>
              Status: <strong>{laporan.status}</strong> · {laporan.waktu_kirim}
            </p>
            <p>
              Layak {laporan.jumlah_layak} pohon ({laporan.berat_layak_gram} g) · Tidak layak{" "}
              {laporan.jumlah_tidak_layak} pohon ({laporan.berat_tidak_layak_gram} g)
            </p>
          </div>
        </PageSection>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Semai{" "}
        {formatTanggal(
          new Date(`${siklus.tanggal_semai.toISOString().slice(0, 10)}T12:00:00.000Z`),
        )}
      </p>
    </DetailLayout>
  );
}
