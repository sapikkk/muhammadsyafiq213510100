import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeaderRow } from "@/components/page-header-row";

const QUICK = [
  { href: "/admin/inventaris", title: "Stok barang" },
  { href: "/admin/harvest", title: "Setujui panen" },
  { href: "/admin/penjualan", title: "Pesanan jual" },
  { href: "/admin/jurnal/baru", title: "Catat uang" },
  { href: "/admin/pelanggan", title: "Pelanggan" },
  { href: "/admin/akuntansi", title: "Tutup buku" },
];

export function AdminFlowDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow title="Beranda" />
      <div className="grid gap-3 sm:grid-cols-2">
        {QUICK.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex min-h-11 items-center justify-between gap-2 rounded-md border border-border px-4 py-3 transition-colors hover:bg-muted/40"
          >
            <span className="text-sm font-semibold">{q.title}</span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
