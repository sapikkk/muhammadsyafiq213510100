import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export default function AdminPenjualanDetailSheet({ params }: { params: { id: string } }) {
  if (params.id === "baru") return null;

  return (
    <DetailSheetFrame>
      <SalesOrderDetailLayout
        id={Number(params.id)}
        listHref="/admin/penjualan"
        mode="admin"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
