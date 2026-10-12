import { AdminSiklusAbortPanel } from "@/components/admin-siklus-abort-panel";
import { BiayaAdminPanel } from "@/components/biaya-admin-panel";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { PageSection } from "@/components/page-section";
import { listSiklusProduksiCached } from "@/lib/cached-queries";
import { listOverhead, serializeOverhead } from "@/lib/biaya";
import { listInfrastrukturPohon } from "@/lib/infrastruktur";

export const dynamic = "force-dynamic";

export default async function AdminBiayaPage() {
  const [siklus, overhead, pohon] = await Promise.all([
    listSiklusProduksiCached(),
    listOverhead(),
    listInfrastrukturPohon(),
  ]);
  const lahanListrik = pohon.map((l) => ({
    id: l.id,
    label: `Lahan #${l.id}`,
    biayaListrikBulan: l.biaya_listrik_bulan.toString(),
  }));

  return (
    <CrudPageLayout
      eyebrow="Akuntansi"
      title="Biaya untuk hitung HPP"
      description="Halaman ini untuk membagi biaya ke batch panen — bukan untuk catat uang keluar kas. Bayar listrik/gaji lewat menu Catatan keuangan baru; panduan ada di kotak biru di bawah."
      flowSteps={[
        { label: "Listrik lahan", detail: "Angka per lahan → masuk HPP saat panen disetujui." },
        { label: "Nutrisi batch", detail: "Per siklus, kalau perlu koreksi manual." },
        { label: "Gaji bulan", detail: "Total gaji farm untuk bagi HPP." },
        { label: "Setujui panen", detail: "HPP final di menu Setujui panen." },
      ]}
      list={
        <BiayaAdminPanel
          siklusOptions={siklus.map((s) => ({ id: s.id, kode_batch: s.kode_batch }))}
          overheadRows={overhead.map(serializeOverhead)}
          lahanListrik={lahanListrik}
        />
      }
      listTitle="Isian biaya produksi"
      extra={
        <PageSection
          title="Batalkan siklus gagal total"
          description="Tutup batch dan jurnal WIP jika produksi gagal total."
          badge="Update"
        >
          <AdminSiklusAbortPanel
            siklus={siklus.map((s) => ({
              id: s.id,
              kode_batch: s.kode_batch,
              status: s.status,
              laporan_status: s.laporanPanen?.status ?? null,
            }))}
          />
        </PageSection>
      }
    />
  );
}
