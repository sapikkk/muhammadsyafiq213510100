import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { Button } from "@/components/ui/button";
import { listSalesOrders, serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanPage() {
  const orders = await listSalesOrders();

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      title="Pesanan jual"
      actions={
        <>
          <Button type="button" className="h-11" asChild>
            <Link href="/admin/penjualan/baru">Buat pesanan</Link>
          </Button>
          <Button type="button" variant="outline" className="h-11" asChild>
            <Link href="/admin/penjualan/piutang">Piutang</Link>
          </Button>
        </>
      }
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="admin" />}
      listTitle="Semua pesanan jual"
    />
  );
}
