import Link from "next/link";
import { ArrowRight } from "lucide-react";
export const OWNER_DASHBOARD_ALUR = [
  { label: "Lihat ringkasan", detail: "Beranda: pendapatan dan beban bulan ini." },
  { label: "Tinjau catatan keuangan", detail: "Setujui atau tolak entri dari Admin." },
  { label: "Unduh laporan", detail: "Laba rugi dan neraca PDF per bulan." },
];

const QUICK = [
  { href: "/owner/jurnal", title: "Catatan keuangan", sub: "Lihat dan setujui" },
  { href: "/owner/laporan", title: "Unduh laporan", sub: "PDF per bulan" },
  { href: "/owner/evaluasi", title: "Untung & titik impas", sub: "Keputusan harga" },
  { href: "/owner/pengguna", title: "Kelola akun", sub: "Owner, Admin, Petani" },
];

export function OwnerFlowDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {QUICK.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex min-h-[4rem] flex-col justify-center gap-1 rounded-md border border-border px-4 py-3 hover:bg-muted/40"
          >
            <span className="flex items-center justify-between text-sm font-semibold">
              {q.title}
              <ArrowRight className="h-4 w-4 opacity-40 group-hover:translate-x-0.5" />
            </span>
            <span className="text-xs text-muted-foreground">{q.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
