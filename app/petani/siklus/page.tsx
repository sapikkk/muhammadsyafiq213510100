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
      description="Satu batch = satu baris di daftar. Detail batch untuk langkah fase & panen."
      flowSteps={[
        { label: "Buat semai", detail: "Tombol Mulai semai — varietas, kolam, pack." },
        { label: "Monitor harian", detail: "Filter greenhouse & kolam → Monitor kolam hari ini (PPM, pH, suhu)." },
        { label: "Buka batch", detail: "Klik baris → langkah fase & aksi batch." },
        { label: "Panen", detail: "Kirim laporan panen → Admin approve & HPP." },
      ]}
      actions={
        <Button type="button" className="h-11" asChild>
          <Link href="/petani/siklus/baru" prefetch>
            Mulai semai
          </Link>
        </Button>
      }
      list={<SiklusDaftarPetani rows={siklusRows.map(serializeSiklus)} />}
      listTitle="Batch aktif & selesai"
    />
  );
}
