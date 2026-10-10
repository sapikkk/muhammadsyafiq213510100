import { AdminSiklusAbortPanel } from "@/components/admin-siklus-abort-panel";
import { BiayaAdminPanel } from "@/components/biaya-admin-panel";
import { PageHeader } from "@/components/page-header";
import { listOverhead, serializeOverhead } from "@/lib/biaya";
import { listSiklusProduksi } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function AdminBiayaPage() {
  const [siklus, overhead] = await Promise.all([listSiklusProduksi(), listOverhead()]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Biaya langsung & overhead"
        description="Input US2.4. Overhead terbaru dialokasikan ke kolam saat approve panen (HPP)."
      />
      <BiayaAdminPanel
        siklusOptions={siklus.map((s) => ({ id: s.id, kode_batch: s.kode_batch }))}
        overheadRows={overhead.map(serializeOverhead)}
      />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Abort siklus gagal total (v2-B.1)</h2>
        <AdminSiklusAbortPanel
          siklus={siklus.map((s) => ({
            id: s.id,
            kode_batch: s.kode_batch,
            status: s.status,
            laporan_status: s.laporanPanen?.status ?? null,
          }))}
        />
      </section>
    </div>
  );
}
