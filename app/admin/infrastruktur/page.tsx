import { CrudPageLayout } from "@/components/crud-page-layout";
import { InfrastrukturForm } from "@/components/infrastruktur-form";
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

  const kolamOptions = data.lahan.flatMap((l) =>
    l.greenhouse.flatMap((gh) =>
      gh.kolam.map((k) => ({
        id: k.id,
        label: `${k.nama} · ${gh.nama}`,
      })),
    ),
  );

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Infrastruktur"
      description="Master lahan, greenhouse, dan kolam untuk alokasi kapasitas produksi."
      flowSteps={[
        { label: "Lihat pohon", detail: "Lahan → GH → kolam — kapasitas lubang per kolam." },
        { label: "Tambah entitas", detail: "Form di bawah — pilih induk yang sesuai." },
        { label: "Siklus", detail: "Petani/Admin pilih kolam kosong saat semai." },
      ]}
      list={<InfrastrukturPohon data={data} />}
      listTitle="Pohon infrastruktur"
      create={
        <InfrastrukturForm
          lahanOptions={lahanOptions}
          greenhouseOptions={greenhouseOptions}
          kolamOptions={kolamOptions}
        />
      }
      createTitle="Form lahan / GH / kolam"
    />
  );
}
