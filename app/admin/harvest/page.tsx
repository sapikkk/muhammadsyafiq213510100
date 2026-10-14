import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { HarvestAdminDaftar } from "@/components/harvest-admin-daftar";
import { listLaporanPanen, serializeLaporanPanen } from "@/lib/laporan-panen";

export const dynamic = "force-dynamic";

export default async function AdminHarvestPage() {
  const rows = await listLaporanPanen();
  const pending = rows.filter((r) => r.status === "PENDING").length;

  return (
    <CrudPageLayout
      title="Laporan panen"
      actions={<EksporDaftarTombol unduhPath="/api/export/panen" jenisPratinjau="panen" />}
      list={<HarvestAdminDaftar rows={rows.map(serializeLaporanPanen)} />}
      listTitle="Daftar laporan"
    />
  );
}
