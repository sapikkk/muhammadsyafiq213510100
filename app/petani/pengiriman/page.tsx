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
      description="US5.3 — SO CONFIRMED → SHIPPED → DELIVERED. Catatan dan waktu tercatat otomatis."
      flowSteps={[
        { label: "CONFIRMED", detail: "Siap pack — update status ke SHIPPED saat barang keluar." },
        { label: "DELIVERED", detail: "Konfirmasi sampai pelanggan — waktu tercatat." },
      ]}
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="pengiriman" />}
      listTitle="Sales order aktif"
    />
  );
}
