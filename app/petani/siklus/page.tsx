import { PageHeader } from "@/components/page-header";
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
    <div className="flex flex-col gap-8">
      <PageHeader title="Siklus produksi" description="Mulai semai dan pantau batch aktif." />

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
    </div>
  );
}
