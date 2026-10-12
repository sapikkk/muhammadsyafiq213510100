import { CrudPageLayout } from "@/components/crud-page-layout";
import { SiklusDaftar } from "@/components/siklus-daftar";
import {
  LIST_SIKLUS_DEFAULT_LIMIT,
  listSiklusProduksi,
  serializeSiklus,
} from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function OwnerProduksiPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      title="Monitoring siklus produksi"
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />}
      listTitle="Siklus produksi"
      listDescription={`Menampilkan ${LIST_SIKLUS_DEFAULT_LIMIT} batch terbaru. Detail batch lama tetap bisa dibuka lewat tautan langsung.`}
    />
  );
}
