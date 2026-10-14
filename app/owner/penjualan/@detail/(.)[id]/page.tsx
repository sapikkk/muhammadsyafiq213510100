import { notFound } from "next/navigation";
import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export default function OwnerPenjualanDetailSheet({ params }: { params: { id: string } }) {
  if (!/^\d+$/.test(params.id)) {
    notFound();
  }

  return (
    <DetailSheetFrame>
      <SalesOrderDetailLayout
        id={Number(params.id)}
        listHref="/owner/penjualan"
        mode="owner"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
