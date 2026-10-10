import Link from "next/link";
import { SiklusAbortForm } from "@/components/siklus-abort-form";
import { siklusBolehAbort } from "@/lib/siklus-abort";

type SiklusRow = {
  id: number;
  kode_batch: string;
  status: string;
  laporan_status: string | null;
};

export function AdminSiklusAbortPanel({ siklus }: { siklus: SiklusRow[] }) {
  const eligible = siklus.filter((s) => siklusBolehAbort(s.status, s.laporan_status));

  if (eligible.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada siklus aktif yang bisa di-abort. Buka detail di{" "}
        <Link href="/petani/siklus" className="text-primary underline-offset-4 hover:underline">
          daftar siklus petani
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {eligible.map((s) => (
        <SiklusAbortForm key={s.id} siklusId={s.id} kodeBatch={s.kode_batch} />
      ))}
    </div>
  );
}
