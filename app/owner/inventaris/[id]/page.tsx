import { InventarisDetail } from "@/components/inventaris-detail";

export const dynamic = "force-dynamic";

export default function OwnerInventarisDetailPage({ params }: { params: { id: string } }) {
  return <InventarisDetail id={Number(params.id)} listHref="/owner/inventaris" />;
}
