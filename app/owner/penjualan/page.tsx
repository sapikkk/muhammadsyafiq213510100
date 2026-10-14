import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerSectionTabsShell } from "@/components/owner-section-tabs-shell";
import { TABS_PENJUALAN } from "@/lib/owner-section-tabs";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function OwnerPenjualanPage() {
  const orders = await listSalesOrders();

  return (
    <CrudPageLayout
      title="Penjualan"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/penjualan" jenisPratinjau="penjualan" />
      }
      list={
        <div className="space-y-4">
          <OwnerSectionTabsShell tabs={TABS_PENJUALAN} />
          <SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="owner" />
        </div>
      }
      listTitle="Semua pesanan jual"
    />
  );
}
