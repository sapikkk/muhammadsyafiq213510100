import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowSteps } from "@/components/flow-steps";

const ALUR = [
  { label: "Pantau KPI", detail: "Dashboard — pendapatan vs beban bulan ini." },
  { label: "Review jurnal", detail: "Setujui/tolak entri dari Admin & otomatis." },
  { label: "Ekspor", detail: "Laba rugi & neraca PDF untuk sidang." },
];

const QUICK = [
  { href: "/owner/jurnal", title: "Jurnal", sub: "Approve · lihat saldo" },
  { href: "/owner/laporan", title: "Ekspor laporan", sub: "PDF periode" },
  { href: "/owner/evaluasi", title: "Margin & BEP", sub: "Keputusan harga" },
  { href: "/owner/pengguna", title: "Kelola user", sub: "Peran Owner/Admin/Petani" },
];

export function OwnerFlowDashboard() {
  return (
    <div className="space-y-6">
      <FlowSteps steps={ALUR} />
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
