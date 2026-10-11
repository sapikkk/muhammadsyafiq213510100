import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export const dynamic = "force-dynamic";

export default async function PetaniPengirimanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <SalesOrderDetailLayout
      id={Number(params.id)}
      listHref="/petani/pengiriman"
      mode="pengiriman"
    />
  );
}
