import { PelangganDetailScreen } from "@/components/pelanggan-detail-screen";

export const dynamic = "force-dynamic";

export default function AdminPelangganDetailPage({ params }: { params: { id: string } }) {
  return <PelangganDetailScreen id={Number(params.id)} />;
}
