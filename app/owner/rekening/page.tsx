import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import { RekeningKasDaftar } from "@/components/rekening-kas-daftar";
import { RekeningKasKartuStack } from "@/components/rekening-kas-kartu-stack";
import { RekeningKasCreateSheet } from "@/components/rekening-kas-create-sheet";
import { ensureRekeningKasDefaults, listRekeningKasSemua } from "@/lib/rekening-kas";

export const dynamic = "force-dynamic";

export default async function OwnerRekeningPage() {
  await ensureRekeningKasDefaults();
  const rows = await listRekeningKasSemua();

  return (
    <OwnerKeuanganChrome>
    <CrudPageLayout
      title="Kas & bank"
      actions={<RekeningKasCreateSheet />}
      leading={<RekeningKasKartuStack rows={rows} />}
      listTitle="Daftar rekening"
      list={<RekeningKasDaftar rows={rows} />}
    />
    </OwnerKeuanganChrome>
  );
}
