import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { JurnalDetailScreen } from "@/components/jurnal-detail-screen";

export default function OwnerJurnalDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <JurnalDetailScreen id={Number(params.id)} backHref="/owner/jurnal" surface="sheet" />
    </DetailSheetFrame>
  );
}
