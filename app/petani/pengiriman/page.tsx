import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { PageHeader } from "@/components/page-header";
import { listSalesOrdersPengiriman } from "@/lib/sales-order-delivery";
import { serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function PetaniPengirimanPage() {
  const orders = await listSalesOrdersPengiriman();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Packing & pengiriman"
        description="US5.3 — SO CONFIRMED → SHIPPED → DELIVERED. Catatan dan waktu tercatat otomatis."
      />
      <SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="pengiriman" />
    </div>
  );
}
