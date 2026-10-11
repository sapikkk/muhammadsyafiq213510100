import { InventarisDetail } from "@/components/inventaris-detail";

export const dynamic = "force-dynamic";

export default function PetaniInventarisDetailPage({ params }: { params: { id: string } }) {
  return (
    <InventarisDetail
      id={Number(params.id)}
      listHref="/petani/inventaris"
      writableMode="petani"
      requireAktif
    />
  );
}
