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
      eyebrow="Penjualan"
      title="Sales order"
      description="Dari draft SO sampai kirim, jurnal pendapatan/HPP, dan pelunasan piutang."
      flowSteps={[
        { label: "Buat draft", detail: "Tombol Buat SO → pilih pelanggan + batch." },
        { label: "Detail", detail: "Klik baris — aksi sesuai status (konfirmasi, DP, kirim, …)." },
        { label: "Invoice", detail: "Dari detail SO setelah konfirmasi." },
      ]}
      actions={
        <Button type="button" className="h-11" asChild>
          <Link href="/admin/penjualan/baru">Buat SO</Link>
        </Button>
      }
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="admin" />}
      listTitle="Semua sales order"
      listDescription="Klik baris untuk detail dan aksi yang sah untuk status saat ini."
    />
  );
}
