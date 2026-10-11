import { notFound } from "next/navigation";
import { JurnalDetailView } from "@/components/jurnal-detail-view";
import { getJurnal } from "@/lib/jurnal";
import type { ReactNode } from "react";

export async function JurnalDetailScreen({
  id,
  backHref,
  actions,
  surface = "page",
}: {
  id: number;
  backHref: string;
  actions?: ReactNode;
  surface?: "page" | "sheet";
}) {
  const jurnal = Number.isInteger(id) ? await getJurnal(id) : null;
  if (!jurnal) notFound();

  return (
    <JurnalDetailView
      jurnal={jurnal}
      backHref={backHref}
      actions={actions}
      surface={surface}
    />
  );
}
