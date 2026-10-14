import { CrudPageLayout } from "@/components/crud-page-layout";
import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import { RekeningKasDaftar } from "@/components/rekening-kas-daftar";
import { RekeningKasForm } from "@/components/rekening-kas-form";
import { ensureRekeningKasDefaults, listRekeningKasSemua } from "@/lib/rekening-kas";

export const dynamic = "force-dynamic";

export default async function OwnerRekeningPage() {
  await ensureRekeningKasDefaults();
  const rows = await listRekeningKasSemua();

  return (
    <OwnerKeuanganChrome>
    <CrudPageLayout
      title="Kas & bank"
      listTitle="Daftar rekening"
      list={<RekeningKasDaftar rows={rows} />}
      createTitle="Tambah rekening"
      create={<RekeningKasForm />}
    />
    </OwnerKeuanganChrome>
  );
}
