import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { VarietasDetail } from "@/components/varietas-detail";

export default function AdminVarietasDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <VarietasDetail
        id={Number(params.id)}
        listHref="/admin/varietas"
        writable
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
