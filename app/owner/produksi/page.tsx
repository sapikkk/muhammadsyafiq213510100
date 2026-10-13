import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
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
      actions={
        <EksporDaftarTombol unduhPath="/api/export/siklus-daftar" jenisPratinjau="siklus-daftar" />
      }
      list={<SiklusDaftar rows={siklusRows.map(serializeSiklus)} readOnly />}
      listTitle="Siklus produksi"
      listDescription={`Menampilkan ${LIST_SIKLUS_DEFAULT_LIMIT} batch terbaru. Detail batch lama tetap bisa dibuka lewat tautan langsung.`}
    />
  );
}
