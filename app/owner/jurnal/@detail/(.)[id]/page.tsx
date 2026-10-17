import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { JurnalDetailScreen } from "@/components/jurnal-detail-screen";

export default function OwnerJurnalDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/owner/jurnal">
      <JurnalDetailScreen id={Number(params.id)} backHref="/owner/jurnal" surface="sheet" />
    </DetailSheetFrame>
  );
}
