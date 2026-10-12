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
      title="Biaya langsung dan biaya umum"
      description="Listrik per lahan (bukan per greenhouse). Gaji bulanan di sini; sewa dan depresiasi greenhouse dari master infrastruktur."
      flowSteps={[
        { label: "Listrik lahan", detail: "Satu nominal per lahan — dibagi ke kolam saat HPP." },
        { label: "Gaji", detail: "Biaya umum bulanan, dibagi ke seluruh kolam." },
        { label: "Biaya langsung", detail: "Tautkan ke batch siklus jika perlu." },
        { label: "Panen", detail: "HPP final saat Admin setujui laporan panen." },
      ]}
      list={
        <BiayaAdminPanel
          siklusOptions={siklus.map((s) => ({ id: s.id, kode_batch: s.kode_batch }))}
          overheadRows={overhead.map(serializeOverhead)}
          lahanListrik={lahanListrik}
        />
      }
      listTitle="Panel biaya"
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
