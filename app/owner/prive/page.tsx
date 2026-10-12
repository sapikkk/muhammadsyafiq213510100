import { CrudPageLayout } from "@/components/crud-page-layout";
import { PriveForm } from "@/components/prive-form";
import { keTanggalIso } from "@/lib/format";
import { ensureRekeningKasDefaults, listRekeningKasAktif } from "@/lib/rekening-kas";

export const dynamic = "force-dynamic";

export default async function OwnerPrivePage() {
  await ensureRekeningKasDefaults();
  const rekeningOptions = await listRekeningKasAktif();

  return (
    <CrudPageLayout
      financeNavRole="OWNER"
      title="Ambil pribadi"
      list={<PriveForm defaultTanggal={keTanggalIso(new Date())} rekeningOptions={rekeningOptions} />}
      listTitle="Form ambil pribadi"
    />
  );
}
