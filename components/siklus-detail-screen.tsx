import { notFound } from "next/navigation";
import { LogKegagalanDaftar } from "@/components/log-kegagalan-daftar";
import { LogProduksiDaftar } from "@/components/log-produksi-daftar";
import { PageSection } from "@/components/page-section";
import {
  SiklusDetailSecondary,
  type SiklusLangkahBerikutnya,
} from "@/components/siklus-detail-secondary";
import { SiklusTimeline } from "@/components/siklus-timeline";
import { DetailLayout } from "@/components/detail-layout";
import { Badge } from "@/components/ui/badge";
import { formatTanggal } from "@/lib/format";
import { serializeLaporanRingkas } from "@/lib/laporan-panen";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";
import { faseBerikutnya, faseLabel, isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
import { labelSiklusStatus } from "@/lib/siklus-status-label";
import { listLogKegagalan, serializeLogKegagalan } from "@/lib/log-kegagalan";
import { getSiklusProduksi, listLogProduksi } from "@/lib/siklus-produksi";
import { siklusBolehAbort, STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { buildTimelineSiklus } from "@/lib/timeline-siklus";
import { listActivePack } from "@/lib/active-pack";

export async function SiklusDetailScreen({
  id,
  surface = "page",
}: {
  id: number;
  surface?: "page" | "sheet";
}) {
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
  const canAbort = siklusBolehAbort(status, laporan?.status);
  const showKegagalan =
    status !== "SELESAI" && (!laporan || laporan.status !== "APPROVED");
  const showHarvest = faseAktif === "PANEN" && !laporan;

  let langkahBerikutnya: SiklusLangkahBerikutnya = null;
  if (status !== STATUS_GAGAL_TOTAL) {
    if (showHarvest) {
      langkahBerikutnya = {
        kind: "harvest",
        siklusId: id,
        jumlahDisemai: siklus.jumlah_disemai,
      };
    } else if (faseAktif && berikut) {
      langkahBerikutnya = {
        kind: "fase",
        siklusId: id,
        faseSaatIni: faseAktif,
        faseBerikutnya: berikut as FaseProduksi,
      };
    }
  }

  const badgeLabel = faseAktif ? labelSiklusStatus(faseAktif) : labelSiklusStatus(status);

  return (
    <DetailLayout
      backHref="/petani/siklus"
      surface={surface}
      eyebrow="Siklus"
      title={siklus.kode_batch}
      badge={
        <Badge variant={status === STATUS_GAGAL_TOTAL ? "outline" : "secondary"}>
          {badgeLabel}
        </Badge>
      }
      description={`${siklus.varietas.nama} · ${siklus.kolam.greenhouse.nama} / ${siklus.kolam.nama}`}
    >
      {status === STATUS_GAGAL_TOTAL ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Siklus tanam dihentikan. Tidak bisa lanjut fase atau panen.
        </p>
      ) : null}

      <SiklusDetailSecondary
        siklusId={id}
        kodeBatch={siklus.kode_batch}
        jumlahDisemai={siklus.jumlah_disemai}
        totalSusut={siklus.total_susut}
        canTambal={Boolean(canTambal && (!laporan || laporan.status !== "APPROVED"))}
        canAbort={canAbort}
        showKegagalan={showKegagalan}
        langkahBerikutnya={langkahBerikutnya}
        packs={packsAktif}
        variant="section"
      />

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
              Status: <strong>{labelLaporanPanenStatus(laporan.status)}</strong> ·{" "}
              {laporan.waktu_kirim}
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
