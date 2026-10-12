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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/format";
import { useState } from "react";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type SiklusOpt = { id: number; label: string; kode_batch: string };
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Topik</TableHead>
            <TableHead>Penjelasan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="align-top font-medium">Bagi biaya ke panen (HPP)</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              Isi listrik lahan, nutrisi per siklus, gaji bulanan di tabel di bawah. Dipakai saat{" "}
              <Link href="/admin/harvest" className="text-primary underline-offset-4 hover:underline">
                setujui laporan panen
              </Link>
              .
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-medium">Uang benar-benar keluar</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              Catat di{" "}
              <Link href="/admin/jurnal/baru" className="text-primary underline-offset-4 hover:underline">
                Catat uang
              </Link>
              . Contoh bayar PLN: beban operasional + nominal + kas/bank.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Listrik per lahan (HPP)</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lahan</TableHead>
              <TableHead>Biaya listrik / bulan</TableHead>
              <TableHead className="w-[6rem]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {lahanListrik.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">
                  Belum ada lahan. Tambah di menu Lahan & kolam.
                </TableCell>
              </TableRow>
            ) : (
              lahanListrik.map((l) => <LahanListrikBaris key={l.id} row={l} />)
            )}
          </TableBody>
        </Table>
      </div>

      <form action={langAction} className="space-y-2">
        <h3 className="text-sm font-medium">Nutrisi per siklus (HPP)</h3>
        <input type="hidden" name="siklusId" value={siklusId} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kolom</TableHead>
              <TableHead>Isian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Siklus</TableCell>
              <TableCell>
                <Select value={siklusId} onValueChange={setSiklusId}>
                  <SelectTrigger className="max-w-md">
                    <SelectValue placeholder="Pilih siklus tanam" />
                  </SelectTrigger>
                  <SelectContent>
                    {siklusOptions.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Biaya nutrisi (Rp)</TableCell>
              <TableCell>
                <Input id="biayaNutrisi" name="biayaNutrisi" inputMode="decimal" defaultValue="0" className="max-w-md" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>
                <Button type="submit">Simpan nutrisi siklus</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>

      <form action={ohAction} className="space-y-2">
        <h3 className="text-sm font-medium">Gaji bulan ini (HPP)</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kolom</TableHead>
              <TableHead>Isian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Bulan gaji</TableCell>
              <TableCell>
                <Input id="periode" name="periode" type="date" required className="max-w-md" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total gaji (Rp)</TableCell>
              <TableCell>
                <Input name="gajiKaryawan" placeholder="Total gaji" inputMode="decimal" className="max-w-md" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>
                <Input name="depresiasiGreenhouse" type="hidden" value="0" />
                <Input name="depresiasiListrik" type="hidden" value="0" />
                <Input name="sewaLahan" type="hidden" value="0" />
                <Button type="submit">Simpan gaji untuk HPP</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>

      {overheadRows.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Riwayat gaji / overhead tersimpan</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Periode</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overheadRows.slice(0, 10).map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.periode}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatRupiah(r.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}

function LahanListrikBaris({ row }: { row: LahanListrikRow }) {
  const [state, action] = useFormState(simpanListrikLahan, {} as { error?: string; ok?: boolean });
  useActionToast({
    error: state.error,
    ok: state.ok ? `Listrik ${row.label} tersimpan.` : undefined,
  });

  return (
    <TableRow>
      <TableCell className="font-medium">{row.label}</TableCell>
      <TableCell>
        <form action={action} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="lahanId" value={row.id} />
          <Input
            name="biayaListrikBulan"
            className="h-9 max-w-[12rem]"
            inputMode="decimal"
            defaultValue={row.biayaListrikBulan}
            placeholder="Rp/bulan"
            aria-label={`Listrik lahan ${row.id}`}
          />
          <Button type="submit" size="sm" variant="secondary">
            Simpan
          </Button>
        </form>
      </TableCell>
      <TableCell />
    </TableRow>
  );
}
