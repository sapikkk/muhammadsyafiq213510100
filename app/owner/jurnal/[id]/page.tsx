import { notFound } from "next/navigation";
import { JurnalDetailView } from "@/components/jurnal-detail-view";
import { getJurnal } from "@/lib/jurnal";

export const dynamic = "force-dynamic";

export default async function OwnerJurnalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const jurnal = Number.isInteger(id) ? await getJurnal(id) : null;
  if (!jurnal) notFound();

  return <JurnalDetailView jurnal={jurnal} backHref="/owner/jurnal" />;
}
