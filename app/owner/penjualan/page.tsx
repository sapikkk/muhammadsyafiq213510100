import { CrudPageLayout } from "@/components/crud-page-layout";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function OwnerPenjualanPage() {
  const orders = await listSalesOrders();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Pesanan jual"
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="owner" />}
      listTitle="Semua pesanan jual"
    />
  );
}
