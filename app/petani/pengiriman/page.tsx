import { CrudPageLayout } from "@/components/crud-page-layout";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrdersPengiriman } from "@/lib/sales-order-delivery";
import { serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function PetaniPengirimanPage() {
  const orders = await listSalesOrdersPengiriman();

  return (
    <CrudPageLayout
      eyebrow="Penjualan"
      title="Packing & pengiriman"
      description="Pesanan yang sudah dikonfirmasi, dikirim, atau diterima. Waktu dicatat otomatis."
      flowSteps={[
        { label: "Siap kemas", detail: "Pesanan sudah dikonfirmasi; ubah ke “Sudah kirim” saat barang keluar." },
        { label: "Sudah sampai", detail: "Konfirmasi barang sampai ke pelanggan." },
      ]}
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="pengiriman" />}
      listTitle="Pesanan jual aktif"
    />
  );
}
