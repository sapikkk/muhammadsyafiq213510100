import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { InventarisDetail } from "@/components/inventaris-detail";

export default function AdminInventarisDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <InventarisDetail
        id={Number(params.id)}
        listHref="/admin/inventaris"
        writableMode="admin"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
