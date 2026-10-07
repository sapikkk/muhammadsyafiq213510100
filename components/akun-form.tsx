"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { saveAkun } from "@/app/actions/akun";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { tipeAkunLabel, tipeAkunList } from "@/lib/akun-tipe";

export type AkunOption = { id: number; kode: string; nama: string; tipe: string };

export type AkunEdit = {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  parentId: number | null;
};

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function AkunForm({
  parents,
  edit,
}: {
  parents: AkunOption[];
  edit?: AkunEdit;
}) {
  const [state, formAction] = useFormState(saveAkun, {});

  return (
    <section aria-labelledby="akun-form-title" className="space-y-3">
      <h2 id="akun-form-title" className="text-lg font-semibold">
        {edit ? `Ubah akun ${edit.kode}` : "Tambah akun"}
      </h2>
      {/* key berubah setelah simpan berhasil supaya field kosong lagi */}
      <form
        key={edit?.id ?? state.saved ?? "baru"}
        action={formAction}
        noValidate
        className="space-y-4"
      >
        {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Kode</span>
            <Input
              name="kode"
              inputMode="numeric"
              defaultValue={edit?.kode}
              className="h-11"
              aria-describedby="aturan-kode"
            />
            <span id="aturan-kode" className="block text-xs text-muted-foreground">
              Angka saja, unik. Digit pertama mengikuti tipe, contoh 1xxx Aset.
            </span>
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Nama</span>
            <Input name="nama" defaultValue={edit?.nama} className="h-11" />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Tipe</span>
            <select
              name="tipe"
              defaultValue={edit?.tipe ?? ""}
              className={selectClass}
            >
              <option value="">Pilih tipe</option>
              {tipeAkunList.map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipeAkunLabel[tipe]}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Akun induk</span>
            <select
              name="parentId"
              defaultValue={edit?.parentId ?? ""}
              className={selectClass}
            >
              <option value="">Tanpa induk (akun utama)</option>
              {parents
                .filter((parent) => parent.id !== edit?.id)
                .map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {`${parent.kode} ${parent.nama}`}
                  </option>
                ))}
            </select>
          </label>
        </div>
        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        {state.saved ? (
          <p role="status" className="text-sm">
            {state.saved}
          </p>
        ) : null}
        <div className="flex items-center gap-3">
          <SubmitButton className="h-11" pendingLabel="Menyimpan...">
            {edit ? "Simpan perubahan" : "Simpan akun"}
          </SubmitButton>
          {edit ? (
            <Link
              href="/admin/akun"
              className="inline-flex h-11 items-center rounded-md px-4 text-sm font-medium hover:bg-accent"
            >
              Batal
            </Link>
          ) : null}
        </div>
      </form>
    </section>
  );
}
