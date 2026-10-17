import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export default function PetaniSiklusDetailSheet({ params }: { params: { id: string } }) {
  // Soft nav ke /baru ikut pola [id]; jangan buka sheet detail (id invalid → 404).
  if (params.id === "baru") return null;

  return (
    <DetailSheetFrame listHref="/petani/siklus">
      <SiklusDetailScreen id={Number(params.id)} surface="sheet" />
    </DetailSheetFrame>
  );
}
