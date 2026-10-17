import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SalesOrderDetailLayout } from "@/components/sales-order-detail-layout";

export default function PetaniPengirimanDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/petani/pengiriman">
      <SalesOrderDetailLayout
        id={Number(params.id)}
        listHref="/petani/pengiriman"
        mode="pengiriman"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
