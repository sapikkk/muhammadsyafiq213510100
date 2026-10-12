import { CrudPageLayout } from "@/components/crud-page-layout";
import { RekeningKasDaftar } from "@/components/rekening-kas-daftar";
import { RekeningKasForm } from "@/components/rekening-kas-form";
import { ensureRekeningKasDefaults, listRekeningKasSemua } from "@/lib/rekening-kas";

export const dynamic = "force-dynamic";

export default async function OwnerRekeningPage() {
  await ensureRekeningKasDefaults();
  const rows = await listRekeningKasSemua();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Rekening kas & bank"
      listTitle="Daftar rekening"
      list={<RekeningKasDaftar rows={rows} />}
      createTitle="Tambah rekening"
      create={<RekeningKasForm />}
    />
  );
}
