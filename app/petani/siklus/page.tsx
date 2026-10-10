import { CrudPageLayout } from "@/components/crud-page-layout";
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
    <CrudPageLayout
      eyebrow="Di lapangan"
      title="Siklus produksi"
      description="Satu batch = satu baris di daftar. Detail batch untuk pindah fase & panen."
      flowSteps={[
        { label: "Buat semai", detail: "Form bawah — pilih varietas, kolam, pack benih/media." },
        { label: "Buka batch", detail: "Klik kode batch → timeline fase." },
        { label: "Panen", detail: "Kirim laporan panen → Admin approve & HPP." },
      ]}
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} />}
      listTitle="Batch aktif & selesai"
      create={
        <>
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
        </>
      }
      createTitle="Mulai semai baru"
      createDescription="Create — pack benih/media otomatis berkurang."
    />
  );
}
