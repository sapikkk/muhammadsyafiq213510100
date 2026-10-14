import Link from "next/link";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { PiutangPenjualanDaftar, PiutangRingkasanUmur } from "@/components/piutang-penjualan-daftar";
import { Button } from "@/components/ui/button";
import { listPiutangPenjualan, ringkasanPiutang } from "@/lib/piutang-penjualan";

export const dynamic = "force-dynamic";

export default async function AdminPiutangPage() {
  const rows = await listPiutangPenjualan();
  const ringkasan = ringkasanPiutang(rows);

  return (
    <CrudPageLayout
      financeNavRole="ADMIN"
      title="Piutang penjualan"
      actions={
        <Button asChild variant="outline" className="h-11">
          <Link href="/admin/penjualan">Semua pesanan</Link>
        </Button>
      }
      list={
        <div className="space-y-8">
          <PiutangRingkasanUmur byUmur={ringkasan.byUmur} totalPiutang={ringkasan.totalPiutang} />
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Daftar ({ringkasan.jumlahPesanan})</h3>
            <PiutangPenjualanDaftar rows={rows} />
          </div>
        </div>
      }
      listTitle="Piutang penjualan"
    />
  );
}
