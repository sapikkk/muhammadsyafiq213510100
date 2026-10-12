import { CrudPageLayout } from "@/components/crud-page-layout";
import { HarvestAdminDaftar } from "@/components/harvest-admin-daftar";
import { listLaporanPanen, serializeLaporanPanen } from "@/lib/laporan-panen";

export const dynamic = "force-dynamic";

export default async function AdminHarvestPage() {
  const rows = await listLaporanPanen();
  const pending = rows.filter((r) => r.status === "PENDING").length;

  return (
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Laporan panen"
      description={
        pending > 0
          ? `${pending} laporan menunggu review Admin.`
          : "Semua laporan sudah diproses atau belum ada pengajuan."
      }
      flowSteps={[
        { label: "Pengajuan", detail: "Petani mengirim dari detail batch dengan status menunggu." },
        { label: "Review", detail: "Buka baris, periksa berat dan susut." },
        { label: "Setujui", detail: "HPP dan jurnal persediaan tercatat; batch siap dijual." },
      ]}
      list={<HarvestAdminDaftar rows={rows.map(serializeLaporanPanen)} />}
      listTitle="Daftar laporan"
      listDescription="Setujui atau tolak per baris."
    />
  );
}
