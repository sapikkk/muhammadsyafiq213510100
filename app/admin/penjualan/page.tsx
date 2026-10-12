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
      title="Pesanan jual"
      description="Dari draft order sampai kirim, jurnal pendapatan dan HPP, serta pelunasan piutang."
      flowSteps={[
        { label: "Draft", detail: "Tombol Buat SO: pilih pelanggan dan batch." },
        { label: "Detail", detail: "Klik baris; aksi mengikuti status (konfirmasi, DP, kirim, dan seterusnya)." },
        { label: "Invoice", detail: "Dari detail order setelah dikonfirmasi." },
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
