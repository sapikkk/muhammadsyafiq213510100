import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { InventarisDetail } from "@/components/inventaris-detail";

export default function OwnerInventarisDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/owner/inventaris">
      <InventarisDetail
        id={Number(params.id)}
        listHref="/owner/inventaris"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
