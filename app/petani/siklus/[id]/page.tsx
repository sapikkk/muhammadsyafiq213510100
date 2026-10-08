import Link from "next/link";
import { notFound } from "next/navigation";
import { HarvestForm } from "@/components/harvest-form";
import { LogProduksiDaftar } from "@/components/log-produksi-daftar";
import { PindahFaseForm } from "@/components/pindah-fase-form";
import { Badge } from "@/components/ui/badge";
import { formatTanggal } from "@/lib/format";
import { serializeLaporanRingkas } from "@/lib/laporan-panen";
import {
  faseBerikutnya,
  faseLabel,
  isFaseProduksi,
  type FaseProduksi,
} from "@/lib/siklus-fase";
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

  const logs = await listLogProduksi(id);
  const status = siklus.status;
  const faseAktif = isFaseProduksi(status) ? status : null;
  const berikut = faseAktif ? faseBerikutnya(faseAktif) : null;
  const laporan = siklus.laporanPanen
    ? serializeLaporanRingkas(siklus.laporanPanen)
    : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">{siklus.kode_batch}</h1>
        <Badge variant="secondary">
          {faseAktif ? faseLabel[faseAktif] : status}
        </Badge>
        <p className="text-muted-foreground">
          {siklus.varietas.nama} · {siklus.kolam.greenhouse.nama} / {siklus.kolam.nama}
        </p>
        <Link
          href="/petani/siklus"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke daftar siklus
        </Link>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Log fase</h2>
        <LogProduksiDaftar rows={logs} />
      </section>

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
    </main>
  );
}
