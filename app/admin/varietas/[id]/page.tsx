import { VarietasDetail } from "@/components/varietas-detail";

export const dynamic = "force-dynamic";

export default function AdminVarietasDetailPage({ params }: { params: { id: string } }) {
  return (
    <VarietasDetail id={Number(params.id)} listHref="/admin/varietas" writable />
  );
}
