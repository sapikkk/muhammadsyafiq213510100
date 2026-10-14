import { notFound, redirect } from "next/navigation";
import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export const dynamic = "force-dynamic";

const RESERVED = new Set(["piutang", "baru"]);

export default function OwnerPenjualanDetailPage({ params }: { params: { id: string } }) {
  if (params.id === "piutang") {
    redirect("/owner/penjualan/piutang");
  }
  if (RESERVED.has(params.id) || !/^\d+$/.test(params.id)) {
    notFound();
  }

  return (
    <SalesOrderDetailLayout
      id={Number(params.id)}
      listHref="/owner/penjualan"
      mode="owner"
    />
  );
}
