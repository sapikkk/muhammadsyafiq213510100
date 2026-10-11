import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export const dynamic = "force-dynamic";

export default function OwnerPenjualanDetailPage({ params }: { params: { id: string } }) {
  return (
    <SalesOrderDetailLayout
      id={Number(params.id)}
      listHref="/owner/penjualan"
      mode="owner"
    />
  );
}
