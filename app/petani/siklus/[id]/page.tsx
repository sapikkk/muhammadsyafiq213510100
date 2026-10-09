import Link from "next/link";
import { notFound } from "next/navigation";
import { HarvestForm } from "@/components/harvest-form";
import { KegagalanForm } from "@/components/kegagalan-form";
import { LogKegagalanDaftar } from "@/components/log-kegagalan-daftar";
import { LogProduksiDaftar } from "@/components/log-produksi-daftar";
import { MonitorPertumbuhanForm } from "@/components/monitor-pertumbuhan-form";
import { PageHeader } from "@/components/page-header";
import { PindahFaseForm } from "@/components/pindah-fase-form";
import { SiklusTimeline } from "@/components/siklus-timeline";
import { TambalSusulanForm } from "@/components/tambal-susulan-form";
import { listActivePack } from "@/lib/active-pack";
import { buildTimelineSiklus } from "@/lib/timeline-siklus";
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
import {
  getSiklusProduksi,
  listLogProduksi,
} from "@/lib/siklus-produksi";

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
  const timeline = buildTimelineSiklus(siklus, logs.map((l) => ({ fase_ke: l.fase_ke, waktu: l.waktu })));
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

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={siklus.kode_batch}
        description={`${siklus.varietas.nama} · ${siklus.kolam.greenhouse.nama} / ${siklus.kolam.nama}`}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {faseAktif ? faseLabel[faseAktif] : status}
        </Badge>
        <Link
          href="/petani/siklus"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Daftar siklus
        </Link>
      </div>

      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-lg font-semibold">Timeline produksi</h2>
        <SiklusTimeline steps={timeline} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Log fase</h2>
        <LogProduksiDaftar rows={logs} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Log kegagalan</h2>
        <LogKegagalanDaftar rows={kegagalanRows} />
      </section>

      {canMonitor ? <MonitorPertumbuhanForm siklusId={id} /> : null}

      {canTambal && (!laporan || laporan.status !== "APPROVED") ? (
        <TambalSusulanForm siklusId={id} packs={packsAktif} />
      ) : null}

      {status !== "SELESAI" && (!laporan || laporan.status !== "APPROVED") ? (
        <KegagalanForm
          siklusId={id}
          jumlahDisemai={siklus.jumlah_disemai}
          totalSusut={siklus.total_susut}
        />
      ) : null}

      {faseAktif && berikut ? (
        <PindahFaseForm
          siklusId={id}
          faseSaatIni={faseAktif}
          faseBerikutnya={berikut as FaseProduksi}
        />
      ) : (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          {berikut === null && faseAktif
            ? "Siklus sudah selesai, tidak ada fase berikutnya."
            : "Fase tidak dikenali."}
        </p>
      )}

      {faseAktif === "PANEN" && !laporan ? (
        <HarvestForm siklusId={id} jumlahDisemai={siklus.jumlah_disemai} />
      ) : null}

      {laporan ? (
        <section className="space-y-2 rounded-md border bg-muted/20 p-4 text-sm">
          <h2 className="text-lg font-semibold">Laporan panen</h2>
          <p>
            Status: <strong>{laporan.status}</strong> · {laporan.waktu_kirim}
          </p>
          <p>
            Layak {laporan.jumlah_layak} pohon ({laporan.berat_layak_gram} g) · Tidak layak{" "}
            {laporan.jumlah_tidak_layak} pohon ({laporan.berat_tidak_layak_gram} g)
          </p>
        </section>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Semai{" "}
        {formatTanggal(
          new Date(`${siklus.tanggal_semai.toISOString().slice(0, 10)}T12:00:00.000Z`),
        )}
      </p>
    </div>
  );
}
