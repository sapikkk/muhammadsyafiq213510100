import { EntityChangeHistory } from "@/components/entity-change-history";
import { PageSection } from "@/components/page-section";
import { listEntityChanges } from "@/lib/entity-audit";

export async function EntityChangeHistorySection({
  entitas,
  entitasId,
  title = "Riwayat perubahan",
}: {
  entitas: string;
  entitasId: number;
  title?: string;
}) {
  const rows = await listEntityChanges(entitas, entitasId);
  return (
    <PageSection title={title} badge="Read">
      <EntityChangeHistory rows={rows} />
    </PageSection>
  );
}
