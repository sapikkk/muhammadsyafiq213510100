import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { EksporDaftarTombol } from "@/components/ekspor-daftar-tombol";
import { SiklusDaftarPetani } from "@/components/siklus-daftar-petani";
import { Button } from "@/components/ui/button";
import {
  LIST_SIKLUS_DEFAULT_LIMIT,
  listSiklusProduksi,
  serializeSiklus,
} from "@/lib/siklus-produksi";

export const dynamic = "force-dynamic";

export default async function PetaniSiklusPage() {
  const siklusRows = await listSiklusProduksi();

  return (
    <CrudPageLayout
      title="Siklus produksi"
      actions={
        <div className="flex flex-wrap gap-2">
          <EksporDaftarTombol unduhPath="/api/export/siklus-daftar" jenisPratinjau="siklus-daftar" />
          <Button type="button" className="h-11" asChild>
            <Link href="/petani/siklus/baru" prefetch>
              Mulai semai
            </Link>
          </Button>
        </div>
      }
      list={<SiklusDaftarPetani rows={siklusRows.map(serializeSiklus)} />}
      listTitle="Siklus aktif & selesai"
      listDescription={`Menampilkan ${LIST_SIKLUS_DEFAULT_LIMIT} batch terbaru. Gunakan pencarian untuk kode batch di daftar ini.`}
    />
  );
}
