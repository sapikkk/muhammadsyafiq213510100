import { VarietasDetail } from "@/components/varietas-detail";

export const dynamic = "force-dynamic";

export default function PetaniVarietasDetailPage({ params }: { params: { id: string } }) {
  return (
    <VarietasDetail
      id={Number(params.id)}
      listHref="/petani/varietas"
      writable={false}
      requireAktif
    />
  );
}
