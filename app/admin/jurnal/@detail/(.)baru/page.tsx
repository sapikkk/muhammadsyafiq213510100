import { CatatUangFormBlock } from "@/components/catat-uang-form-block";
import { DetailSheetBackLink } from "@/components/detail-sheet-back-link";
import { DetailSheetFrame } from "@/components/detail-sheet-frame";

export default function AdminJurnalBaruSheet() {
  return (
    <DetailSheetFrame listHref="/admin/jurnal">
      <DetailSheetBackLink href="/admin/jurnal" label="Kembali ke daftar" className="mb-2" />
      <div className="space-y-4 pr-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Akuntansi</p>
          <h2 className="text-lg font-semibold">Catat uang masuk / keluar</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pilih jenis transaksi. Penjualan dan panen otomatis di tempat lain.
          </p>
        </div>
        <CatatUangFormBlock />
      </div>
    </DetailSheetFrame>
  );
}
