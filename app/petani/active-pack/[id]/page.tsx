import { ActivePackDetail } from "@/components/active-pack-detail";

export const dynamic = "force-dynamic";

export default function PetaniActivePackDetailPage({ params }: { params: { id: string } }) {
  return (
    <ActivePackDetail
      id={Number(params.id)}
      listHref="/petani/active-pack"
      writableMode="petani"
    />
  );
}
