import { InventarisDetail } from "@/components/inventaris-detail";

export const dynamic = "force-dynamic";

export default function AdminInventarisDetailPage({ params }: { params: { id: string } }) {
  return (
    <InventarisDetail id={Number(params.id)} listHref="/admin/inventaris" writableMode="admin" />
  );
}
