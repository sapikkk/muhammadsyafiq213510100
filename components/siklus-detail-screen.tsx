import { notFound } from "next/navigation";
import { LogKegagalanDaftar } from "@/components/log-kegagalan-daftar";
import { LogProduksiDaftar } from "@/components/log-produksi-daftar";
import { PageSection } from "@/components/page-section";
import { MonochromeProgressBar } from "@/components/monochrome-progress-bar";
import {
  SiklusDetailActions,
  type SiklusLangkahBerikutnya,
} from "@/components/siklus-detail-actions";
import { SiklusTimeline } from "@/components/siklus-timeline";
import { DetailLayout } from "@/components/detail-layout";
import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { serializeLaporanRingkas } from "@/lib/laporan-panen";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";
import { faseBerikutnya, faseLabel, isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
import { labelSiklusStatus } from "@/lib/siklus-status-label";
import { listLogKegagalan, serializeLogKegagalan } from "@/lib/log-kegagalan";
import { getSiklusProduksi, listLogProduksi } from "@/lib/siklus-produksi";
import { siklusBolehAbort, STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { buildTimelineSiklus } from "@/lib/timeline-siklus";
import { listActivePack } from "@/lib/active-pack";
import { DetailKodeStrip } from "@/components/detail-kode-strip";
import { SiklusEksporPaket } from "@/components/siklus-ekspor-paket";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

export async function SiklusDetailScreen({
  id,
  surface = "page",
  tampilkanBiayaSemai = false,
}: {
  id: number;
  surface?: "page" | "sheet";
  /** Ringkas biaya benih/rockwool saat semai (alur petani). */
  tampilkanBiayaSemai?: boolean;
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
      title={labelBarisProduksiUtama(partsFromSiklusNested(siklus))}
      badge={
        <Badge variant={status === STATUS_GAGAL_TOTAL ? "outline" : "secondary"}>
          {badgeLabel}
        </Badge>
      }
      actions={<SiklusEksporPaket siklusId={id} />}
      primaryActions={
        <SiklusDetailActions
          siklusId={id}
          siklusLabel={labelBarisProduksiUtama(partsFromSiklusNested(siklus))}
          kodeBatch={siklus.kode_batch}
          jumlahDisemai={siklus.jumlah_disemai}
          totalSusut={siklus.total_susut}
          canTambal={Boolean(canTambal && (!laporan || laporan.status !== "APPROVED"))}
          canAbort={canAbort}
          showKegagalan={showKegagalan}
          langkahBerikutnya={langkahBerikutnya}
          packs={packsAktif}
        />
      }
    >
      <DetailKodeStrip label="Kode batch" kode={siklus.kode_batch} />

      {(() => {
        const kap = siklus.kolam.kapasitas_lubang;
        const hidup = Math.max(0, siklus.jumlah_disemai - siklus.total_susut);
        const pct = kap > 0 ? Math.round((hidup / kap) * 1000) / 10 : 0;
        return (
          <MonochromeProgressBar
            label="Isi kolam siklus ini"
            hint={`${hidup.toLocaleString("id-ID")} / ${kap.toLocaleString("id-ID")} lubang (${pct}%)`}
            value={pct}
          />
        );
      })()}

      {status === STATUS_GAGAL_TOTAL ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Siklus tanam dihentikan. Tidak bisa lanjut fase atau panen.
        </p>
      ) : null}

      <PageSection badge="Read" title="Linimasa">
        <SiklusTimeline steps={timeline} />
        {logs.length > 0 ? (
          <div className="mt-6 border-t pt-4">
            <LogProduksiDaftar
              rows={logs.map((l) => ({
                fase_dari: l.fase_dari,
                fase_ke: l.fase_ke,
                catatan: l.catatan,
                waktu: l.waktu.toISOString(),
                user: l.user,
              }))}
            />
          </div>
        ) : null}
        {kegagalanRows.length > 0 ? (
          <div className="mt-6 border-t pt-4">
            <LogKegagalanDaftar rows={kegagalanRows} />
          </div>
        ) : null}
      </PageSection>

      {laporan ? (
        <PageSection badge="Read">
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

      {tampilkanBiayaSemai && siklus.biaya_langsung ? (
        <PageSection badge="Read" title="Biaya langsung semai">
          <ul className="space-y-1 text-sm">
            <li>
              Benih:{" "}
              <strong>{formatRupiah(siklus.biaya_langsung.biaya_benih.toString())}</strong>
            </li>
            <li>
              Rockwool / media:{" "}
              <strong>{formatRupiah(siklus.biaya_langsung.biaya_rockwool.toString())}</strong>
              {siklus.biaya_langsung.biaya_rockwool.isZero() ? (
                <span className="text-muted-foreground"> — tidak dipakai saat semai</span>
              ) : null}
            </li>
          </ul>
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
