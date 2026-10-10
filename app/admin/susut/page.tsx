import { CrudPageLayout } from "@/components/crud-page-layout";
import { SusutKlasifikasiPanel } from "@/components/susut-klasifikasi-panel";
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
    <CrudPageLayout
      eyebrow="Produksi & stok"
      title="Klasifikasi susut"
      description="US2.5 — tentukan susut normal (masuk HPP) vs abnormal (kerugian operasional)."
      flowSteps={[
        { label: "Antrian", detail: "Log kegagalan dari petani menunggu klasifikasi." },
        { label: "Klasifikasi", detail: "Pilih normal/abnormal per baris — mempengaruhi HPP." },
      ]}
      list={<SusutKlasifikasiPanel rows={rows} />}
      listTitle="Menunggu klasifikasi"
    />
  );
}
