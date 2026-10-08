import { HarvestAdminDaftar } from "@/components/harvest-admin-daftar";
import { PageHeader } from "@/components/page-header";
import { listLaporanPanen, serializeLaporanPanen } from "@/lib/laporan-panen";

export const dynamic = "force-dynamic";

export default async function AdminHarvestPage() {
  const rows = await listLaporanPanen();
  const pending = rows.filter((r) => r.status === "PENDING").length;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Laporan panen"
        description={
          pending > 0
            ? `${pending} laporan menunggu review (approval penuh di US berikutnya).`
            : "Daftar laporan panen dari petani."
        }
      />
      <HarvestAdminDaftar rows={rows.map(serializeLaporanPanen)} />
    </div>
  );
}
