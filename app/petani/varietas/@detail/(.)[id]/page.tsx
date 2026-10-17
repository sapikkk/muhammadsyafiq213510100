import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { VarietasDetail } from "@/components/varietas-detail";

export default function PetaniVarietasDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/petani/varietas">
      <VarietasDetail
        id={Number(params.id)}
        listHref="/petani/varietas"
        requireAktif
        roleView="petani"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
