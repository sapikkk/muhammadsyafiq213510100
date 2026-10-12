import { redirect } from "next/navigation";
import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export const dynamic = "force-dynamic";

export default async function AdminPenjualanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (params.id === "baru") redirect("/admin/penjualan/baru");

  return (
    <SalesOrderDetailLayout
      id={Number(params.id)}
      listHref="/admin/penjualan"
      mode="admin"
    />
  );
}
