import { AdminSiklusAbortPanel } from "@/components/admin-siklus-abort-panel";
import { BiayaAdminPanel } from "@/components/biaya-admin-panel";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { PageSection } from "@/components/page-section";
import { listSiklusProduksiCached } from "@/lib/cached-queries";
import { listOverhead, serializeOverhead } from "@/lib/biaya";

export const dynamic = "force-dynamic";

export default async function AdminBiayaPage() {
  const [siklus, overhead] = await Promise.all([listSiklusProduksiCached(), listOverhead()]);

  return (
    <CrudPageLayout
      eyebrow="Akuntansi"
      title="Biaya langsung & overhead"
      description="Input overhead. Overhead terbaru dialokasikan ke kolam saat panen disetujui (HPP)."
      flowSteps={[
        { label: "Overhead", detail: "Catat beban tidak langsung per periode." },
        { label: "Biaya langsung", detail: "Tautkan ke batch siklus jika perlu." },
        { label: "Panen", detail: "HPP final saat Admin approve laporan panen." },
      ]}
      list={
        <BiayaAdminPanel
          siklusOptions={siklus.map((s) => ({ id: s.id, kode_batch: s.kode_batch }))}
          overheadRows={overhead.map(serializeOverhead)}
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
