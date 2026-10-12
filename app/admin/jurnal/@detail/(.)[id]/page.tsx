import { JurnalActions } from "@/components/jurnal-actions";
import { DetailSheetFrame } from "@/components/detail-sheet-frame";
import { JurnalDetailScreen } from "@/components/jurnal-detail-screen";
import { getJurnal } from "@/lib/jurnal";
import { notFound } from "next/navigation";

export default async function AdminJurnalDetailSheet({ params }: { params: { id: string } }) {
  if (params.id === "baru") return null;

  const id = Number(params.id);
  const jurnal = Number.isInteger(id) ? await getJurnal(id) : null;
  if (!jurnal) notFound();

  return (
    <DetailSheetFrame>
      <JurnalDetailScreen
        id={id}
        backHref="/admin/jurnal"
        surface="sheet"
        actions={<JurnalActions id={jurnal.id} status={jurnal.status} />}
      />
    </DetailSheetFrame>
  );
}
