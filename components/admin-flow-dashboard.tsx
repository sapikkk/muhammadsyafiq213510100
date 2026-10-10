import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FlowSteps } from "@/components/flow-steps";

const ALUR_HARIAN = [
  {
    label: "Stok & pack",
    detail: "Cek inventaris → buat active pack jika perlu",
  },
  {
    label: "Produksi",
    detail: "Petani semai batch → Admin approve panen",
  },
  {
    label: "Jual & catat",
    detail: "SO → kirim → jurnal otomatis / Smart Jurnal",
  },
];

const QUICK = [
  { href: "/admin/inventaris", title: "Inventaris", sub: "Lihat stok · catat keluar/masuk" },
  { href: "/admin/harvest", title: "Approve panen", sub: "HPP & jurnal WIP" },
  { href: "/admin/penjualan", title: "Sales order", sub: "Buat · kirim · pelunasan" },
  { href: "/admin/jurnal/baru", title: "Jurnal baru", sub: "Smart atau manual" },
  { href: "/admin/pelanggan", title: "Pelanggan", sub: "CRUD master pelanggan" },
  { href: "/admin/akuntansi", title: "Akuntansi", sub: "Period lock · penyusutan" },
];

export function AdminFlowDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="Ikuti alur harian: stok → produksi → penjualan → pembukuan."
      />
      <FlowSteps steps={ALUR_HARIAN} />
      <div className="grid gap-3 sm:grid-cols-2">
        {QUICK.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex min-h-[4.5rem] flex-col justify-center gap-1 rounded-md border border-border px-4 py-3 transition-colors hover:bg-muted/40"
          >
            <span className="flex items-center justify-between gap-2 text-sm font-semibold">
              {q.title}
              <ArrowRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="text-xs text-muted-foreground">{q.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
