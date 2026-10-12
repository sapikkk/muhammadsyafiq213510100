import { AdminSiklusAbortPanel } from "@/components/admin-siklus-abort-panel";
import { BiayaAdminPanel } from "@/components/biaya-admin-panel";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { PageSection } from "@/components/page-section";
import { listSiklusProduksiCached } from "@/lib/cached-queries";
import { listOverhead, serializeOverhead } from "@/lib/biaya";
import { listInfrastrukturPohon } from "@/lib/infrastruktur";
import {
  labelLahanUntukLayar,
  labelSiklusPilihBaris,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";

export const dynamic = "force-dynamic";

export default async function AdminBiayaPage() {
  const [siklus, overhead, pohon] = await Promise.all([
    listSiklusProduksiCached(),
    listOverhead(),
    listInfrastrukturPohon(),
  ]);
  const lahanListrik = pohon.map((l) => {
    const gh = l.greenhouse.map((g) => g.nama).join(", ");
    return {
      id: l.id,
      label: labelLahanUntukLayar(l.id, gh || null),
      biayaListrikBulan: l.biaya_listrik_bulan.toString(),
    };
  });

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      eyebrow="Keuangan"
      title="Biaya untuk hitung HPP"
      list={
        <BiayaAdminPanel
          siklusOptions={siklus.map((s) => {
            const parts = partsFromSiklusNested(s);
            return {
              id: s.id,
              kode_batch: s.kode_batch,
              label: labelSiklusPilihBaris(parts),
            };
          })}
          overheadRows={overhead.map(serializeOverhead)}
          lahanListrik={lahanListrik}
        />
      }
      listTitle="Isian biaya produksi"
      extra={
        <PageSection title="Batalkan siklus gagal total" badge="Update">
          <AdminSiklusAbortPanel
            siklus={siklus.map((s) => {
              const parts = partsFromSiklusNested(s);
              return {
                id: s.id,
                kode_batch: s.kode_batch,
                label: labelSiklusPilihBaris(parts),
                status: s.status,
                laporan_status: s.laporanPanen?.status ?? null,
              };
            })}
          />
        </PageSection>
      }
    />
  );
}
