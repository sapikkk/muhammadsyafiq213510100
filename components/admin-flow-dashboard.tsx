import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlowSteps } from "@/components/flow-steps";
import { PageHeaderRow } from "@/components/page-header-row";

const ALUR_HARIAN = [
  {
    label: "Stok dan paket",
    detail: "Periksa stok barang, buat paket siap pakai jika perlu.",
  },
  {
    label: "Produksi",
    detail: "Petani jalankan batch tanam; Admin setujui laporan panen.",
  },
  {
    label: "Jual dan catat keuangan",
    detail: "Pesanan jual, pengiriman, catatan keuangan otomatis atau isi manual.",
  },
];

const QUICK = [
  { href: "/admin/inventaris", title: "Stok barang", sub: "Jumlah dan masuk keluar barang" },
  { href: "/admin/harvest", title: "Setujui panen", sub: "Biaya produksi dan catatan stok" },
  { href: "/admin/penjualan", title: "Pesanan jual", sub: "Buat, kirim, terima bayaran" },
  { href: "/admin/jurnal/baru", title: "Catatan keuangan baru", sub: "Otomatis atau isi sendiri" },
  { href: "/admin/pelanggan", title: "Pelanggan", sub: "Data pembeli" },
  { href: "/admin/akuntansi", title: "Akuntansi", sub: "Tutup periode dan penyusutan" },
];

export function AdminFlowDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderRow
        eyebrow="Admin"
        title="Beranda"
        description="Urutan kerja: stok, produksi, penjualan, lalu pencatatan keuangan."
        guide={
          <FlowSteps
            pageKey="admin"
            steps={ALUR_HARIAN}
            title="Panduan beranda Admin"
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
