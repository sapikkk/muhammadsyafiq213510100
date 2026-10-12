import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { SiklusDaftarPetani } from "@/components/siklus-daftar-petani";
import { Button } from "@/components/ui/button";
import { listSiklusProduksi, serializeSiklus } from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      eyebrow="Di lapangan"
      title="Siklus produksi"
      actions={
        <Button type="button" className="h-11" asChild>
          <Link href="/petani/siklus/baru" prefetch>
            Mulai semai
          </Link>
        </Button>
      }
      list={<SiklusDaftarPetani rows={siklusRows.map(serializeSiklus)} />}
      listTitle="Siklus aktif & selesai"
    />
  );
}
