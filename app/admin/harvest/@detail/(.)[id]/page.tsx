import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { HarvestDetailScreen } from "@/components/harvest-detail-screen";

export default function AdminHarvestDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <HarvestDetailScreen id={Number(params.id)} surface="sheet" />
    </DetailSheetFrame>
  );
}
