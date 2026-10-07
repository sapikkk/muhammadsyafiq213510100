"use client";

import { useFormState } from "react-dom";
import { simpanVarietas, ubahStatusVarietas } from "@/app/actions/varietas";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { varietasStatusLabel, varietasStatusList } from "@/lib/varietas-status";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type Option = { id: number; label: string };

export function VarietasForm({ varietasOptions }: { varietasOptions: Option[] }) {
  const [createState, createAction] = useFormState(simpanVarietas, {});
  const [statusState, statusAction] = useFormState(ubahStatusVarietas, {});

  return (
    <div className="space-y-6">
      <form action={createAction} className="space-y-4 rounded-md border p-4">
        <h2 className="text-lg font-semibold">Tambah varietas</h2>
        <FormMessages state={createState} />
        <Field label="Nama">
          <Input name="nama" className="h-11" required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Harga benih per gram (Rp)">
            <Input name="hargaBenihPerGram" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Biji per gram">
            <Input name="bijiPerGram" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Daya kecambah (%)">
            <Input name="dayaKecambah" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Lama semai (hari)">
            <Input name="lamaSemai" className="h-11" inputMode="numeric" required />
          </Field>
          <Field label="Lama di kolam (hari)">
            <Input name="lamaDiKolam" className="h-11" inputMode="numeric" required />
          </Field>
          <Field label="Berat rata panen (gram)">
            <Input name="beratRataRataPanen" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Berat per pack (gram)">
            <Input name="beratPerPack" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Harga jual curah (Rp)">
            <Input name="hargaJualCurah" className="h-11" inputMode="decimal" required />
          </Field>
          <Field label="Harga jual pack (Rp)">
            <Input name="hargaJualPack" className="h-11" inputMode="decimal" required />
          </Field>
        </div>
        <Field label="Status awal">
          <select name="status" className={selectClass} defaultValue="AKTIF">
            {varietasStatusList.map((s) => (
              <option key={s} value={s}>
                {varietasStatusLabel[s]}
              </option>
            ))}
          </select>
        </Field>
        <SubmitButton className="h-11" pendingLabel="Menyimpan...">
          Simpan varietas
        </SubmitButton>
      </form>

      {varietasOptions.length > 0 ? (
        <form action={statusAction} className="space-y-4 rounded-md border p-4">
          <h2 className="text-lg font-semibold">Aktifkan / nonaktifkan</h2>
          <FormMessages state={statusState} />
          <Field label="Varietas">
            <select name="varietasId" className={selectClass} required defaultValue="">
              <option value="" disabled>
                Pilih varietas
              </option>
              {varietasOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Status baru">
            <select name="status" className={selectClass} defaultValue="NONAKTIF">
              {varietasStatusList.map((s) => (
                <option key={s} value={s}>
                  {varietasStatusLabel[s]}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="konfirmasi" value="ya" className="mt-1" />
            Saya yakin menonaktifkan varietas ini (tidak bisa dipilih di siklus baru).
          </label>
          <SubmitButton className="h-11" pendingLabel="Memperbarui...">
            Perbarui status
          </SubmitButton>
        </form>
      ) : null}
    </div>
  );
}

function FormMessages({ state }: { state: { error?: string; ok?: string } }) {
  return (
    <>
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          {state.ok}
        </p>
      ) : null}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}
