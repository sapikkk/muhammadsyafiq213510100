import { JurnalDetailScreen } from "@/components/jurnal-detail-screen";

export const dynamic = "force-dynamic";

export default async function OwnerJurnalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <JurnalDetailScreen id={Number(params.id)} backHref="/owner/jurnal" />;
}
