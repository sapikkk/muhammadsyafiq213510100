import { SusutKlasifikasiPanel } from "@/components/susut-klasifikasi-panel";
import { PageHeader } from "@/components/page-header";
import { listLogKegagalanMenunggu } from "@/lib/log-kegagalan";

export const dynamic = "force-dynamic";

export default async function AdminSusutPage() {
  const pending = await listLogKegagalanMenunggu();

  const rows = pending.map((row) => ({
    id: row.id,
    tahap: row.tahap,
    jumlah_gagal: row.jumlah_gagal,
    penyebab: row.penyebab,
    siklus: {
      kode_batch: row.siklus.kode_batch,
      varietas: { nama: row.siklus.varietas.nama },
    },
  }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Klasifikasi susut"
        description="US2.5 — tentukan susut normal (masuk HPP) vs abnormal (kerugian operasional)."
      />
      <SusutKlasifikasiPanel rows={rows} />
    </div>
  );
}
