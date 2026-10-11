import { HarvestDetailScreen } from "@/components/harvest-detail-screen";

export const dynamic = "force-dynamic";

export default function HarvestDetailAdminPage({ params }: { params: { id: string } }) {
  return <HarvestDetailScreen id={Number(params.id)} />;
}
