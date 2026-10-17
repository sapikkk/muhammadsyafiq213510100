import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { ActivePackDetail } from "@/components/active-pack-detail";

export default function AdminActivePackDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame listHref="/admin/active-pack">
      <ActivePackDetail
        id={Number(params.id)}
        listHref="/admin/active-pack"
        writableMode="admin"
        surface="sheet"
      />
    </DetailSheetFrame>
  );
}
