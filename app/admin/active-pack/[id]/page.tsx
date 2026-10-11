import { ActivePackDetail } from "@/components/active-pack-detail";

export const dynamic = "force-dynamic";

export default function AdminActivePackDetailPage({ params }: { params: { id: string } }) {
  return (
    <ActivePackDetail
      id={Number(params.id)}
      listHref="/admin/active-pack"
      writableMode="admin"
    />
  );
}
