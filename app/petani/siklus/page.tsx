import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { SiklusDaftarPetani } from "@/components/siklus-daftar-petani";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/page-section";
import { ProduksiRingkasanPanel } from "@/components/produksi-ringkasan-panel";
import { loadProduksiRingkasan } from "@/lib/produksi-kapasitas";
import {
  LIST_SIKLUS_DEFAULT_LIMIT,
  listSiklusProduksi,
  serializeSiklus,
} from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusPage() {
  const [siklusRows, ringkasan] = await Promise.all([
    listSiklusProduksi(),
    loadProduksiRingkasan(),
  ]);

  return (
    <CrudPageLayout
      title="Siklus produksi"
      actions={
        <div className="flex flex-wrap gap-2">
          <EksporDaftarTombol unduhPath="/api/export/siklus-daftar" jenisPratinjau="siklus-daftar" />
          <Button type="button" className="h-11" asChild>
            <Link href="/petani/siklus/baru" prefetch scroll={false}>
              Mulai semai
            </Link>
          </Button>
        </div>
      }
      list={
        <>
          <PageSection title="Ringkasan fase">
            <ProduksiRingkasanPanel data={ringkasan} showKapasitasBar={false} />
          </PageSection>
          <SiklusDaftarPetani rows={siklusRows.map(serializeSiklus)} />
        </>
      }
      listTitle="Daftar batch"
    />
  );
}
