import { EntityChangeHistory } from "@/components/entity-change-history";
import { EntityChangeHistoryDisclosure } from "@/components/entity-change-history-disclosure";
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
      <EntityChangeHistoryDisclosure count={rows.length}>
        <EntityChangeHistory rows={rows} />
      </EntityChangeHistoryDisclosure>
    </PageSection>
  );
}
