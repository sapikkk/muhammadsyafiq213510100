import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { InventarisDetail } from "@/components/inventaris-detail";

export default function PetaniInventarisDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/petani/inventaris">
      <InventarisDetail
        id={Number(params.id)}
        listHref="/petani/inventaris"
        writableMode="petani"
        requireAktif
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
