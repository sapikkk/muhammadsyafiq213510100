import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { PelangganDetailScreen } from "@/components/pelanggan-detail-screen";

export default function AdminPelangganDetailSheet({ params }: { params: { id: string } }) {
  return (
    <DetailSheetFrame>
      <PelangganDetailScreen id={Number(params.id)} surface="sheet" />
    </DetailSheetFrame>
  );
}
