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
      description="Dari pesanan sementara sampai kirim, catat pendapatan dan biaya pokok, lalu terima sisa bayaran."
      flowSteps={[
        { label: "Pesanan sementara", detail: "Tombol Buat pesanan: pilih pelanggan dan batch." },
        { label: "Detail", detail: "Klik baris; aksi mengikuti status (konfirmasi, DP, kirim, dan seterusnya)." },
        { label: "Faktur", detail: "Dari detail pesanan setelah dikonfirmasi." },
      ]}
      actions={
        <Button type="button" className="h-11" asChild>
          <Link href="/admin/penjualan/baru">Buat SO</Link>
        </Button>
      }
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="admin" />}
      listTitle="Semua pesanan jual"
      listDescription="Klik baris untuk detail dan aksi yang sah untuk status saat ini."
    />
  );
}
