"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { simpanBiayaLangsung, simpanListrikLahan, simpanOverhead } from "@/app/actions/biaya";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRupiah } from "@/lib/format";
import { useState } from "react";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type SiklusOpt = { id: number; kode_batch: string };
type OverheadRow = {
  id: number;
  periode: string;
  subtotal: string;
};
type LahanListrikRow = { id: number; label: string; biayaListrikBulan: string };

export function BiayaAdminPanel({
  siklusOptions,
  overheadRows,
  lahanListrik,
}: {
  siklusOptions: SiklusOpt[];
  overheadRows: OverheadRow[];
  lahanListrik: LahanListrikRow[];
}) {
  const [siklusId, setSiklusId] = useState(String(siklusOptions[0]?.id ?? ""));
  const [langState, langAction] = useFormState(simpanBiayaLangsung, {} as { error?: string; ok?: boolean });
  const [ohState, ohAction] = useFormState(simpanOverhead, {} as { error?: string; ok?: boolean });
  useActionToast({
    error: langState.error,
    ok: langState.ok ? "Biaya langsung diperbarui." : undefined,
  });
  useActionToast({
    error: ohState.error,
    ok: ohState.ok ? "Biaya umum tersimpan." : undefined,
  });

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-primary/20 bg-muted/30 p-4 text-sm">
        <p className="font-medium">Dua hal berbeda — jangan dicampur</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>
            <span className="text-foreground">Bagi biaya ke panen (HPP)</span> — isi di halaman ini: listrik
            lahan, nutrisi per batch, gaji bulanan. Dipakai saat Anda{" "}
            <Link href="/admin/harvest" className="text-primary underline-offset-4 hover:underline">
              setujui laporan panen
            </Link>
            .
          </li>
          <li>
            <span className="text-foreground">Uang benar-benar keluar</span> — catat di{" "}
            <Link href="/admin/jurnal/baru" className="text-primary underline-offset-4 hover:underline">
              Catatan keuangan baru
            </Link>
            . Contoh: bayar tagihan PLN → pilih beban operasional, nominal tagihan, kas/bank. Saldo dan
            laporan keuangan mengikuti catatan itu.
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Praktik sederhana: setiap bulan isi listrik lahan di bawah dengan angka yang sama (atai rata-rata)
          dengan tagihan PLN (atau rata-rata bulan), lalu saat bayar buat catatan keuangan dengan nominal bayar.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Langkah 1 · HPP</p>
          <h3 className="mt-1 font-medium">Listrik per lahan</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Satu angka per lahan (bukan per greenhouse). Saat panen disetujui, angka ini dibagi ke kolam
            menurut jumlah lubang di lahan itu.
          </p>
          <ul className="mt-4 space-y-3">
            {lahanListrik.map((l) => (
              <LahanListrikBaris key={l.id} row={l} />
            ))}
          </ul>
          {lahanListrik.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Belum ada lahan. Tambah di menu Lahan & kolam.</p>
          ) : null}
        </div>

        <form action={langAction} className="flex flex-col gap-4 rounded-lg border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Langkah 2 · HPP</p>
          <h3 className="font-medium">Nutrisi per batch tanam</h3>
          <input type="hidden" name="siklusId" value={siklusId} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Siklus</label>
            <Select value={siklusId} onValueChange={setSiklusId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih batch" />
              </SelectTrigger>
              <SelectContent>
                {siklusOptions.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.kode_batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="biayaNutrisi" className="text-sm font-medium">
              Biaya nutrisi (Rp)
            </label>
            <Input id="biayaNutrisi" name="biayaNutrisi" inputMode="decimal" defaultValue="0" />
          </div>
          <p className="text-xs text-muted-foreground">
            Benih dan rockwool sudah tercatat saat batch dibuat. Listrik hanya di langkah 1 (per lahan).
          </p>
          <Button type="submit">Simpan nutrisi batch</Button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <form action={ohAction} className="flex flex-col gap-4 rounded-lg border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Langkah 3 · HPP</p>
          <h3 className="font-medium">Gaji bulan ini</h3>
          <p className="text-xs text-muted-foreground">
            Untuk hitung HPP: gaji dibagi ke semua kolam. Sewa lahan dan bangunan greenhouse sudah di data
            Lahan & kolam.
          </p>
          <div className="space-y-2">
            <label htmlFor="periode" className="text-sm font-medium">
              Bulan gaji
            </label>
            <Input id="periode" name="periode" type="date" required />
          </div>
          <Input name="depresiasiGreenhouse" type="hidden" value="0" />
          <Input name="depresiasiListrik" type="hidden" value="0" />
          <Input name="sewaLahan" type="hidden" value="0" />
          <Input name="gajiKaryawan" placeholder="Total gaji (Rp)" inputMode="decimal" />
          <Button type="submit">Simpan gaji untuk HPP</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Sudah transfer gaji ke rekening petani? Buat juga catatan di{" "}
          <Link href="/admin/jurnal/baru" className="text-primary underline-offset-4 hover:underline">
            Catatan keuangan baru
          </Link>{" "}
          (langkah 2 di kotak atas).
        </p>
        {overheadRows.length > 0 ? (
          <ul className="text-sm text-muted-foreground">
            {overheadRows.slice(0, 5).map((r) => (
              <li key={r.id}>
                {r.periode}: {formatRupiah(r.subtotal)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      </div>
    </div>
  );
}

function LahanListrikBaris({ row }: { row: LahanListrikRow }) {
  const [state, action] = useFormState(simpanListrikLahan, {} as { error?: string; ok?: boolean });
  useActionToast({
    error: state.error,
    ok: state.ok ? `Listrik lahan #${row.id} tersimpan.` : undefined,
  });

  return (
    <li>
      <form action={action} className="flex flex-wrap items-end gap-2">
        <input type="hidden" name="lahanId" value={row.id} />
        <span className="min-w-[5rem] text-sm font-medium">Lahan #{row.id}</span>
        <Input
          name="biayaListrikBulan"
          className="h-9 max-w-[10rem]"
          inputMode="decimal"
          defaultValue={row.biayaListrikBulan}
          placeholder="Rp/bulan"
          aria-label={`Listrik lahan ${row.id}`}
        />
        <Button type="submit" size="sm" variant="secondary">
          Simpan
        </Button>
      </form>
    </li>
  );
}
