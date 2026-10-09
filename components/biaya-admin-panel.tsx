"use client";

import { useFormState } from "react-dom";
import { simpanBiayaLangsung, simpanOverhead } from "@/app/actions/biaya";
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

type SiklusOpt = { id: number; kode_batch: string };
type OverheadRow = {
  id: number;
  periode: string;
  subtotal: string;
};

export function BiayaAdminPanel({
  siklusOptions,
  overheadRows,
}: {
  siklusOptions: SiklusOpt[];
  overheadRows: OverheadRow[];
}) {
  const [siklusId, setSiklusId] = useState(String(siklusOptions[0]?.id ?? ""));
  const [langState, langAction] = useFormState(simpanBiayaLangsung, {} as { error?: string; ok?: boolean });
  const [ohState, ohAction] = useFormState(simpanOverhead, {} as { error?: string; ok?: boolean });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={langAction} className="flex flex-col gap-4 rounded-lg border p-4">
        <h3 className="font-medium">Biaya langsung per siklus (US2.4)</h3>
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
        <div className="space-y-2">
          <label htmlFor="biayaListrikPompa" className="text-sm font-medium">
            Biaya listrik / pompa (Rp)
          </label>
          <Input id="biayaListrikPompa" name="biayaListrikPompa" inputMode="decimal" defaultValue="0" />
        </div>
        <p className="text-xs text-muted-foreground">
          Benih dan rockwool tetap dari mulai siklus; subtotal dihitung ulang.
        </p>
        {langState.error ? <p className="text-sm text-destructive">{langState.error}</p> : null}
        {langState.ok ? <p className="text-sm text-primary">Biaya langsung diperbarui.</p> : null}
        <Button type="submit">Simpan biaya langsung</Button>
      </form>

      <div className="flex flex-col gap-4">
        <form action={ohAction} className="flex flex-col gap-4 rounded-lg border p-4">
          <h3 className="font-medium">Overhead periode (US2.4)</h3>
          <div className="space-y-2">
            <label htmlFor="periode" className="text-sm font-medium">
              Periode
            </label>
            <Input id="periode" name="periode" type="date" required />
          </div>
          <Input name="depresiasiGreenhouse" placeholder="Depresiasi greenhouse" inputMode="decimal" />
          <Input name="depresiasiListrik" placeholder="Depresiasi listrik" inputMode="decimal" />
          <Input name="sewaLahan" placeholder="Sewa lahan" inputMode="decimal" />
          <Input name="gajiKaryawan" placeholder="Gaji karyawan" inputMode="decimal" />
          {ohState.error ? <p className="text-sm text-destructive">{ohState.error}</p> : null}
          {ohState.ok ? <p className="text-sm text-primary">Overhead tersimpan.</p> : null}
          <Button type="submit">Simpan overhead</Button>
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
