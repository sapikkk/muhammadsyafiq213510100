import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowSteps } from "@/components/flow-steps";
import { PageHeaderRow } from "@/components/page-header-row";

const ALUR_HARIAN = [
  {
    label: "Stok dan pack",
    detail: "Periksa inventaris, lalu buat active pack jika diperlukan.",
  },
  {
    label: "Produksi",
    detail: "Petani menjalankan batch; Admin menyetujui laporan panen.",
  },
  {
    label: "Penjualan dan pembukuan",
    detail: "Sales order, pengiriman, jurnal otomatis, atau Smart Jurnal.",
  },
];

const QUICK = [
  { href: "/admin/inventaris", title: "Inventaris", sub: "Stok dan pergerakan barang" },
  { href: "/admin/harvest", title: "Laporan panen", sub: "HPP dan jurnal persediaan" },
  { href: "/admin/penjualan", title: "Sales order", sub: "Buat, kirim, pelunasan" },
  { href: "/admin/jurnal/baru", title: "Jurnal baru", sub: "Smart Jurnal atau manual" },
  { href: "/admin/pelanggan", title: "Pelanggan", sub: "Data master pelanggan" },
  { href: "/admin/akuntansi", title: "Akuntansi", sub: "Tutup periode dan penyusutan" },
];

export function AdminFlowDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow
        eyebrow="Admin"
        title="Dashboard"
        description="Urutan kerja: stok, produksi, penjualan, lalu pembukuan."
        guide={
          <FlowSteps
            pageKey="admin"
            steps={ALUR_HARIAN}
            title="Panduan dashboard Admin"
            toolbar
          />
        }
      />
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
