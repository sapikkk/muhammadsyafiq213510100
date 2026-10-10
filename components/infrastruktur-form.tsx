"use client";

import { useFormState } from "react-dom";
import {
  simpanGreenhouse,
  simpanKolam,
  simpanLahan,
  ubahStatusKolam,
} from "@/app/actions/infrastruktur";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { kolamStatusLabel, kolamStatusList } from "@/lib/infrastruktur-kolam-status";
import { useActionToast } from "@/lib/hooks/use-action-toast";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type Option = { id: number; label: string };

export function InfrastrukturForm({
  lahanOptions,
  greenhouseOptions,
  kolamOptions,
}: {
  lahanOptions: Option[];
  greenhouseOptions: Option[];
  kolamOptions: Option[];
}) {
  const [lahanState, lahanAction] = useFormState(simpanLahan, {});
  const [ghState, ghAction] = useFormState(simpanGreenhouse, {});
  const [kolamState, kolamAction] = useFormState(simpanKolam, {});
  const [statusState, statusAction] = useFormState(ubahStatusKolam, {});

  return (
    <div className="space-y-6">
      <FormShell title="Tambah lahan" state={lahanState} action={lahanAction}>
        <Field label="Nilai sewa (Rp)">
          <Input name="nilaiSewa" className="h-11" inputMode="decimal" required />
        </Field>
        <Field label="Masa sewa (bulan)">
          <Input name="masaSewa" className="h-11" inputMode="numeric" required />
        </Field>
      </FormShell>

      <FormShell title="Tambah greenhouse" state={ghState} action={ghAction}>
        <Field label="Lahan induk">
          <select name="lahanId" className={selectClass} required defaultValue="">
            <option value="" disabled>
              Pilih lahan
            </option>
            {lahanOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Nama greenhouse">
          <Input name="nama" className="h-11" required />
        </Field>
        <Field label="Nilai investasi (Rp)">
          <Input name="nilaiInvestasi" className="h-11" inputMode="decimal" required />
        </Field>
        <Field label="Umur ekonomis (bulan)">
          <Input name="umurEkonomis" className="h-11" inputMode="numeric" required />
        </Field>
      </FormShell>

      <FormShell title="Tambah kolam" state={kolamState} action={kolamAction}>
        <Field label="Greenhouse induk">
          <select name="greenhouseId" className={selectClass} required defaultValue="">
            <option value="" disabled>
              Pilih greenhouse
            </option>
            {greenhouseOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Nama kolam">
          <Input name="nama" className="h-11" required />
        </Field>
        <Field label="Kapasitas lubang">
          <Input name="kapasitasLubang" className="h-11" inputMode="numeric" required />
        </Field>
        <Field label="Status awal">
          <select name="status" className={selectClass} defaultValue="MENGANGGUR">
            {kolamStatusList.map((s) => (
              <option key={s} value={s}>
                {kolamStatusLabel[s]}
              </option>
            ))}
          </select>
        </Field>
      </FormShell>

      {kolamOptions.length > 0 ? (
        <FormShell title="Ubah status kolam" state={statusState} action={statusAction}>
          <Field label="Kolam">
            <select name="kolamId" className={selectClass} required defaultValue="">
              <option value="" disabled>
                Pilih kolam
              </option>
              {kolamOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" className={selectClass} defaultValue="MENGANGGUR">
              {kolamStatusList.map((s) => (
                <option key={s} value={s}>
                  {kolamStatusLabel[s]}
                </option>
              ))}
            </select>
          </Field>
        </FormShell>
      ) : null}
    </div>
  );
}

function FormShell({
  title,
  state,
  action,
  children,
}: {
  title: string;
  state: { error?: string; ok?: string };
  action: (payload: FormData) => void;
  children: React.ReactNode;
}) {
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={action} className="space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan
      </SubmitButton>
    </form>
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
