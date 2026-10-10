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
import { SiklusAbortForm } from "@/components/siklus-abort-form";
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
import { siklusBolehAbort, STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";

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
  const canAbort = siklusBolehAbort(status, laporan?.status);

  const pindahFaseBlock =
    faseAktif && berikut ? (
      <section
        id="pindah-fase"
        aria-labelledby="pindah-fase-title"
        className="scroll-mt-4 space-y-3"
      >
        <h2 id="pindah-fase-title" className="text-lg font-semibold">
          Lanjut fase
        </h2>
        <p className="text-sm text-muted-foreground">
          Aksi utama di kolam — centang konfirmasi lalu tap tombol di bawah (uji T5.1).
        </p>
        <PindahFaseForm
          siklusId={id}
          faseSaatIni={faseAktif}
          faseBerikutnya={berikut as FaseProduksi}
        />
      </section>
    ) : (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        {berikut === null && faseAktif
          ? "Siklus sudah selesai, tidak ada fase berikutnya."
          : "Fase tidak dikenali."}
      </p>
    );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={siklus.kode_batch}
        description={`${siklus.varietas.nama} · ${siklus.kolam.greenhouse.nama} / ${siklus.kolam.nama}`}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={status === STATUS_GAGAL_TOTAL ? "outline" : "secondary"}>
          {status === STATUS_GAGAL_TOTAL
            ? "Gagal total (abort)"
            : faseAktif
              ? faseLabel[faseAktif]
              : status}
        </Badge>
        <Link
          href="/petani/siklus"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Daftar siklus
        </Link>
      </div>

      {status === STATUS_GAGAL_TOTAL ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Siklus dihentikan (abort). Tidak ada lanjut fase atau panen.
        </p>
      ) : (
        pindahFaseBlock
      )}

      {canAbort ? (
        <SiklusAbortForm siklusId={id} kodeBatch={siklus.kode_batch} />
      ) : null}

      {faseAktif === "PANEN" && !laporan ? (
        <HarvestForm siklusId={id} jumlahDisemai={siklus.jumlah_disemai} />
      ) : null}

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

      <section className="space-y-3 rounded-md border p-4">
        <h2 className="text-lg font-semibold">Timeline produksi</h2>
        <SiklusTimeline steps={timeline} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Log fase</h2>
        <LogProduksiDaftar
          rows={logs.map((l) => ({
            fase_dari: l.fase_dari,
            fase_ke: l.fase_ke,
            catatan: l.catatan,
            waktu: l.waktu.toISOString(),
            user: l.user,
          }))}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Log kegagalan</h2>
        <LogKegagalanDaftar rows={kegagalanRows} />
      </section>

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
