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
        { label: "Petani kirim", detail: "Dari detail batch — status PENDING." },
        { label: "Admin review", detail: "Buka baris → cek berat & susut." },
        { label: "Approve", detail: "HPP + jurnal Dr 1350 Cr WIP; batch siap jual." },
      ]}
      list={<HarvestAdminDaftar rows={rows.map(serializeLaporanPanen)} />}
      listTitle="Daftar laporan"
      listDescription="Update — approve/tolak per baris."
    />
  );
}
