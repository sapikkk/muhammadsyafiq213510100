import Link from "next/link";
import { SiklusAsumsiPanel } from "@/components/siklus-asumsi-panel";
import { SiklusDaftar } from "@/components/siklus-daftar";
import { SiklusForm } from "@/components/siklus-form";
import { listActivePack } from "@/lib/active-pack";
import { keTanggalIso } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";
import { listVarietas } from "@/lib/varietas";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusPage() {
  const [varietasRows, kolamRows, packs, siklusRows] = await Promise.all([
    listVarietas(true),
    prisma.kolam.findMany({
      orderBy: { id: "asc" },
      include: { greenhouse: { select: { nama: true } } },
    }),
    listActivePack(true),
    listSiklusProduksi(),
  ]);

  const packsAktif = packs.filter((p) => p.status === "AKTIF");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">Siklus produksi</h1>
        <Link
          href="/petani"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Petani
        </Link>
      </header>

      <SiklusDaftar rows={siklusRows.map(serializeSiklus)} />

      <SiklusAsumsiPanel
        varietas={varietasRows
          .filter((v) => v.status === "AKTIF")
          .map((v) => ({
            id: v.id,
            nama: v.nama,
            bijiPerGram: Number(v.biji_per_gram),
          }))}
      />

      <SiklusForm
        varietas={varietasRows
          .filter((v) => v.status === "AKTIF")
          .map((v) => ({
            id: v.id,
            nama: v.nama,
            bijiPerGram: Number(v.biji_per_gram),
          }))}
        kolam={kolamRows.map((k) => ({
          id: k.id,
          label: `${k.greenhouse.nama} / ${k.nama}`,
          kapasitas: k.kapasitas_lubang,
        }))}
        packs={packsAktif.map((p) => ({
          id: p.id,
          kode: p.kode,
          itemKode: p.item.kode,
          itemNama: p.item.nama,
          satuan: p.item.satuan,
          sisaUnit: p.sisaUnit.toString(),
        }))}
        tanggalAwal={keTanggalIso(new Date())}
      />
    </main>
  );
}
