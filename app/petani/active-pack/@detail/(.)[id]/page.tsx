import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { ActivePackDetail } from "@/components/active-pack-detail";

export default function PetaniActivePackDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/petani/active-pack">
      <ActivePackDetail
        id={Number(params.id)}
        listHref="/petani/active-pack"
        writableMode="petani"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
