import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export default function PetaniSiklusDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <SiklusDetailScreen id={Number(params.id)} surface="sheet" />
    </DetailSheetFrame>
  );
}
