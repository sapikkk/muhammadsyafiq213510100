"use client";

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
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Listrik per lahan</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Satu tagihan listrik/pompa per lahan. Semua greenhouse di lahan yang sama membagi biaya ini
            saat HPP dihitung (proporsional lubang kolam).
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
          <h3 className="font-medium">Biaya langsung per siklus</h3>
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
            Benih, rockwool, dan listrik dari master lahan. Listrik tidak diisi per batch.
          </p>
          <Button type="submit">Simpan biaya langsung</Button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <form action={ohAction} className="flex flex-col gap-4 rounded-lg border p-4">
          <h3 className="font-medium">Biaya umum per bulan</h3>
          <p className="text-xs text-muted-foreground">
            Gaji farm dibagi ke semua kolam. Sewa lahan, depresiasi greenhouse, dan listrik diambil dari
            master lahan/greenhouse (listrik isi di kotak kiri).
          </p>
          <div className="space-y-2">
            <label htmlFor="periode" className="text-sm font-medium">
              Periode
            </label>
            <Input id="periode" name="periode" type="date" required />
          </div>
          <Input name="depresiasiGreenhouse" type="hidden" value="0" />
          <Input name="depresiasiListrik" type="hidden" value="0" />
          <Input name="sewaLahan" type="hidden" value="0" />
          <Input name="gajiKaryawan" placeholder="Gaji karyawan (Rp)" inputMode="decimal" />
          <Button type="submit">Simpan biaya umum</Button>
        </form>
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
