import { CrudPageLayout } from "@/components/crud-page-layout";
import { PetaniModulIntro } from "@/components/petani-modul-intro";
import { SalesOrderDaftar } from "@/components/sales-order-daftar";
import { listSalesOrdersPengiriman } from "@/lib/sales-order-delivery";
import { serializeSalesOrder } from "@/lib/sales-order";

export const dynamic = "force-dynamic";

export default async function PetaniPengirimanPage() {
  const orders = await listSalesOrdersPengiriman();

  return (
    <CrudPageLayout
      title="Pengiriman"
      intro={<PetaniModulIntro modul="pengiriman" />}
      list={<SalesOrderDaftar rows={orders.map(serializeSalesOrder)} mode="pengiriman" />}
      listTitle="Pesanan jual aktif"
    />
  );
}
