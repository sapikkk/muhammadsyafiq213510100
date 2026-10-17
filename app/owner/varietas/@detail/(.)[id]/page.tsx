import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { VarietasDetail } from "@/components/varietas-detail";

export default function OwnerVarietasDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame dismissHref="/owner/varietas">
      <VarietasDetail
        id={Number(params.id)}
        listHref="/owner/varietas"
        writable
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
