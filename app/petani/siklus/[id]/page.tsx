import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export const dynamic = "force-dynamic";

export default function PetaniSiklusDetailPage({ params }: { params: { id: string } }) {
  return <SiklusDetailScreen id={Number(params.id)} />;
}
