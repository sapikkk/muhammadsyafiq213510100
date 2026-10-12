import { CrudPageLayout } from "@/components/crud-page-layout";
import { SiklusDaftar } from "@/components/siklus-daftar";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function OwnerProduksiPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      eyebrow="Produksi"
      title="Monitoring siklus produksi"
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />}
      listTitle="Siklus produksi"
    />
  );
}
