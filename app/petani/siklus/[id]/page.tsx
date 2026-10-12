import { redirect } from "next/navigation";
import { SiklusDetailScreen } from "@/components/siklus-detail-screen";

export const dynamic = "force-dynamic";

export default function PetaniSiklusDetailPage({ params }: { params: { id: string } }) {
  if (params.id === "baru") redirect("/petani/siklus/baru");

  return <SiklusDetailScreen id={Number(params.id)} />;
}
