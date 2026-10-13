import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function OwnerPenjualanPage() {
  const orders = await listSalesOrders();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Pesanan jual"
      actions={
        <EksporDaftarTombol unduhPath="/api/export/penjualan" jenisPratinjau="penjualan" />
      }
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="owner" />}
      listTitle="Semua pesanan jual"
    />
  );
}
