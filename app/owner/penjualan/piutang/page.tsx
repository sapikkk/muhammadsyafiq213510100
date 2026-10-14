import { CrudPageLayout } from "@/components/crud-page-layout";
import { PiutangPenjualanDaftar, PiutangRingkasanUmur } from "@/components/piutang-penjualan-daftar";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_PENJUALAN } from "@/lib/owner-section-tabs";
import { listPiutangPenjualan, ringkasanPiutang } from "@/lib/piutang-penjualan";

export const dynamic = "force-dynamic";

export default async function OwnerPiutangPage() {
  const rows = await listPiutangPenjualan();
  const ringkasan = ringkasanPiutang(rows);

  return (
    <CrudPageLayout
      title="Penjualan"
      list={
        <div className="space-y-4">
          <OwnerSectionTabsShell tabs={TABS_PENJUALAN} />
          <PiutangRingkasanUmur byUmur={ringkasan.byUmur} totalPiutang={ringkasan.totalPiutang} />
          <PiutangPenjualanDaftar rows={rows} />
        </div>
      }
      listTitle="Piutang belum lunas"
    />
  );
}
