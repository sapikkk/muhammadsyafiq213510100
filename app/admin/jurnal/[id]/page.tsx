import { notFound } from "next/navigation";
import { JurnalActions } from "@/components/jurnal-actions";
import { JurnalDetailScreen } from "@/components/jurnal-detail-screen";
import { getJurnal } from "@/lib/jurnal";

export const dynamic = "force-dynamic";

export default async function AdminJurnalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const jurnal = Number.isInteger(id) ? await getJurnal(id) : null;
  if (!jurnal) notFound();

  return (
    <JurnalDetailScreen
      id={id}
      backHref="/admin/jurnal"
      actions={<JurnalActions id={jurnal.id} status={jurnal.status} />}
    />
  );
}
