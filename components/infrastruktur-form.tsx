"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import {
  simpanGreenhouse,
  simpanKolam,
  simpanLahan,
} from "@/app/actions/infrastruktur";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kolamStatusLabel, kolamStatusList, type KolamStatus } from "@/lib/infrastruktur-kolam-status";
import { useActionToast } from "@/lib/hooks/use-action-toast";

type Option = { id: number; label: string };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

function LahanForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction] = useFormState(simpanLahan, {});
  useActionToast({ error: state.error, ok: state.ok });
  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Nilai sewa (Rp)">
        <Input name="nilaiSewa" className="h-11" inputMode="decimal" required />
      </Field>
      <Field label="Masa sewa (bulan)">
        <Input name="masaSewa" className="h-11" inputMode="numeric" required />
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan lahan
      </SubmitButton>
    </form>
  );
}

function GreenhouseForm({
  lahanOptions,
  onSuccess,
}: {
  lahanOptions: Option[];
  onSuccess?: () => void;
}) {
  const [lahanId, setLahanId] = useState(
    lahanOptions[0] ? String(lahanOptions[0].id) : "",
  );
  const [state, formAction] = useFormState(simpanGreenhouse, {});
  useActionToast({ error: state.error, ok: state.ok });
  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="lahanId" value={lahanId} />
      <Field label="Lahan induk">
        <Select value={lahanId} onValueChange={setLahanId} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Pilih lahan" />
          </SelectTrigger>
          <SelectContent>
            {lahanOptions.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan greenhouse
      </SubmitButton>
    </form>
  );
}

function KolamForm({
  greenhouseOptions,
  onSuccess,
}: {
  greenhouseOptions: Option[];
  onSuccess?: () => void;
}) {
  const [greenhouseId, setGreenhouseId] = useState(
    greenhouseOptions[0] ? String(greenhouseOptions[0].id) : "",
  );
  const [status, setStatus] = useState<KolamStatus>("MENGANGGUR");
  const [state, formAction] = useFormState(simpanKolam, {});
  useActionToast({ error: state.error, ok: state.ok });
  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="greenhouseId" value={greenhouseId} />
      <input type="hidden" name="status" value={status} />
      <Field label="Greenhouse induk">
        <Select value={greenhouseId} onValueChange={setGreenhouseId} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Pilih greenhouse" />
          </SelectTrigger>
          <SelectContent>
            {greenhouseOptions.map((o) => (
              <SelectItem key={o.id} value={String(o.id)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Nama kolam">
        <Input name="nama" className="h-11" required />
      </Field>
      <Field label="Kapasitas lubang">
        <Input name="kapasitasLubang" className="h-11" inputMode="numeric" required />
      </Field>
      <Field label="Status awal">
        <Select value={status} onValueChange={(v) => setStatus(v as KolamStatus)}>
          <SelectTrigger className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {kolamStatusList.map((s) => (
              <SelectItem key={s} value={s}>
                {kolamStatusLabel[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        Simpan kolam
      </SubmitButton>
    </form>
  );
}

function FormSheetWrap({
  title,
  description,
  trigger,
  form,
}: {
  title: string;
  description: string;
  trigger: ReactNode;
  form: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <FormSheet
      title={title}
      description={description}
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? form(close) : null}
    </FormSheet>
  );
}

export function InfrastrukturTambahActions({
  lahanOptions,
  greenhouseOptions,
}: {
  lahanOptions: Option[];
  greenhouseOptions: Option[];
  kolamOptions?: Option[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <FormSheetWrap
        title="Tambah lahan"
        description="Sewa lahan — amortisasi dihitung otomatis per bulan."
        trigger={
          <Button type="button" variant="outline" className="h-11">
            Tambah lahan
          </Button>
        }
        form={(close) => <LahanForm onSuccess={close} />}
      />
      {lahanOptions.length > 0 ? (
        <FormSheetWrap
          title="Tambah greenhouse"
          description="Di bawah lahan — depresiasi investasi per bulan."
          trigger={
            <Button type="button" variant="outline" className="h-11">
              Tambah GH
            </Button>
          }
          form={(close) => (
            <GreenhouseForm lahanOptions={lahanOptions} onSuccess={close} />
          )}
        />
      ) : null}
      {greenhouseOptions.length > 0 ? (
        <FormSheetWrap
          title="Tambah kolam"
          description="Kapasitas lubang — status awal menganggur atau terpakai."
          trigger={
            <Button type="button" className="h-11">
              Tambah kolam
            </Button>
          }
          form={(close) => (
            <KolamForm greenhouseOptions={greenhouseOptions} onSuccess={close} />
          )}
        />
      ) : null}
    </div>
  );
}
