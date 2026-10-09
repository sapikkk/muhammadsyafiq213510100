"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { simpanJurnal } from "@/app/actions/jurnal";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/format";

export type AkunPosting = { id: number; kode: string; nama: string };

type Baris = { key: number; akunId: string; debit: string; kredit: string };

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function barisKosong(key: number): Baris {
  return { key, akunId: "", debit: "", kredit: "" };
}

function jumlah(baris: Baris[], field: "debit" | "kredit") {
  return baris.reduce((sum, b) => sum + (Number(b[field].replace(",", ".")) || 0), 0);
}

export function JurnalForm({
  akun,
  tanggalAwal,
}: {
  akun: AkunPosting[];
  tanggalAwal: string;
}) {
  const [state, formAction] = useFormState(simpanJurnal, {});
  const [baris, setBaris] = useState<Baris[]>([barisKosong(1), barisKosong(2)]);
  const [nextKey, setNextKey] = useState(3);

  const totalDebit = jumlah(baris, "debit");
  const totalKredit = jumlah(baris, "kredit");
  const selisih = totalDebit - totalKredit;

  function ubah(key: number, field: keyof Omit<Baris, "key">, value: string) {
    setBaris((rows) =>
      rows.map((row) => (row.key === key ? { ...row, [field]: value } : row)),
    );
  }

  function tambah() {
    setBaris((rows) => [...rows, barisKosong(nextKey)]);
    setNextKey((k) => k + 1);
  }

  function hapus(key: number) {
    setBaris((rows) => (rows.length > 2 ? rows.filter((r) => r.key !== key) : rows));
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Tanggal</span>
          <Input name="tanggal" type="date" defaultValue={tanggalAwal} className="h-11" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Keterangan</span>
          <Input
            name="keterangan"
            maxLength={255}
            placeholder="Contoh: Beli benih selada 500 gram tunai"
            className="h-11"
          />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Baris jurnal</legend>
        <p className="text-xs text-muted-foreground">
          Isi debit saja atau kredit saja per baris. Angka tanpa titik ribuan.
        </p>
        <ul className="space-y-3">
          {baris.map((row, index) => (
            <li
              key={row.key}
              className="grid gap-2 rounded-md border p-3 sm:grid-cols-[1fr_8rem_8rem_auto] sm:items-end"
            >
              <label className="block space-y-1 text-sm">
                <span className="sr-only">{`Akun baris ${index + 1}`}</span>
                <select
                  name="akunId"
                  value={row.akunId}
                  onChange={(e) => ubah(row.key, "akunId", e.target.value)}
                  className={selectClass}
                  aria-label={`Akun baris ${index + 1}`}
                >
                  <option value="">Pilih akun</option>
                  {akun.map((a) => (
                    <option key={a.id} value={a.id}>
                      {`${a.kode} ${a.nama}`}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1 text-sm">
                <span className="text-xs text-muted-foreground">Debit</span>
                <Input
                  name="debit"
                  inputMode="decimal"
                  value={row.debit}
                  onChange={(e) => ubah(row.key, "debit", e.target.value)}
                  className="h-11"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="text-xs text-muted-foreground">Kredit</span>
                <Input
                  name="kredit"
                  inputMode="decimal"
                  value={row.kredit}
                  onChange={(e) => ubah(row.key, "kredit", e.target.value)}
                  className="h-11"
                />
              </label>
              <Button
                type="button"
                variant="ghost"
                className="h-11"
                onClick={() => hapus(row.key)}
                disabled={baris.length <= 2}
                aria-label={`Hapus baris ${index + 1}`}
              >
                Hapus
              </Button>
            </li>
          ))}
        </ul>
        <Button type="button" variant="outline" className="h-11" onClick={tambah}>
          Tambah baris
        </Button>
      </fieldset>

      <dl
        className="grid grid-cols-3 gap-2 rounded-md bg-secondary p-3 text-sm"
        aria-live="polite"
      >
        <div>
          <dt className="text-muted-foreground">Total debit</dt>
          <dd className="font-medium tabular-nums">{formatRupiah(totalDebit)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Total kredit</dt>
          <dd className="font-medium tabular-nums">{formatRupiah(totalKredit)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Selisih</dt>
          <dd
            className={`font-medium tabular-nums ${selisih === 0 ? "" : "text-destructive"}`}
          >
            {selisih === 0 ? "Seimbang" : formatRupiah(Math.abs(selisih))}
          </dd>
        </div>
      </dl>

      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton
          name="status"
          value="PENDING"
          className="h-11"
          pendingLabel="Menyimpan..."
        >
          Ajukan untuk disetujui
        </SubmitButton>
        <SubmitButton
          name="status"
          value="DRAFT"
          variant="outline"
          className="h-11"
          pendingLabel="Menyimpan..."
        >
          Simpan sebagai draf
        </SubmitButton>
        <Link
          href="/admin/jurnal"
          className="inline-flex h-11 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
