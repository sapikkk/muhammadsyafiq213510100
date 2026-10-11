import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturTambahActions } from "@/components/infrastruktur-form";
import { InfrastrukturPohon } from "@/components/infrastruktur-pohon";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export const dynamic = "force-dynamic";

export default async function AdminInfrastrukturPage() {
  const pohon = await listInfrastrukturPohon();
  const data = serializeInfrastruktur(pohon);

  const lahanOptions = data.lahan.map((l) => ({
    id: l.id,
    label: `Lahan #${l.id} (sewa ${l.nilaiSewa})`,
  }));

  const greenhouseOptions = data.lahan.flatMap((l) =>
    l.greenhouse.map((gh) => ({
      id: gh.id,
      label: `${gh.nama} (Lahan #${l.id})`,
    })),
  );

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Infrastruktur"
      description="Master lahan, greenhouse, dan kolam untuk alokasi kapasitas produksi."
      flowSteps={[
        { label: "Lihat pohon", detail: "Lahan → GH → kolam — kapasitas lubang per kolam." },
        { label: "Tambah", detail: "Tombol lahan / GH / kolam — Sheet di kanan." },
        { label: "Status kolam", detail: "Dialog per baris kolam di pohon." },
        { label: "Siklus", detail: "Petani/Admin pilih kolam kosong saat semai." },
      ]}
      actions={
        <InfrastrukturTambahActions
          lahanOptions={lahanOptions}
          greenhouseOptions={greenhouseOptions}
        />
      }
      list={<InfrastrukturPohon data={data} mode="admin" />}
      listTitle="Pohon infrastruktur"
    />
  );
}
