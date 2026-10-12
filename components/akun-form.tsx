"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { saveAkun } from "@/app/actions/akun";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { labelAkunDropdown } from "@/lib/akun-ui-labels";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tipeAkunLabel, tipeAkunList } from "@/lib/akun-tipe";

export type AkunOption = { id: number; kode: string; nama: string; tipe: string };

export type AkunEdit = {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  parentId: number | null;
  isSystem?: boolean;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function AkunForm({
  parents,
  edit,
  onSuccess,
}: {
  parents: AkunOption[];
  edit?: AkunEdit;
  onSuccess?: () => void;
}) {
  const locked = Boolean(edit?.isSystem);
  const [tipe, setTipe] = useState(edit?.tipe ?? "");
  const [parentId, setParentId] = useState(
    edit?.parentId ? String(edit.parentId) : "none",
  );
  const [state, formAction] = useFormState(saveAkun, {});

  useActionToast({ error: state.error, saved: state.saved });

  useEffect(() => {
    if (state.saved) onSuccess?.();
  }, [state.saved, onSuccess]);

  return (
    <form key={edit?.id ?? "baru"} action={formAction} noValidate className="space-y-4">
      {edit ? <input type="hidden" name="id" value={edit.id} /> : null}
      {locked && edit ? (
        <>
          <input type="hidden" name="kode" value={edit.kode} />
          <input type="hidden" name="tipe" value={edit.tipe} />
          <input type="hidden" name="parentId" value={edit.parentId ?? ""} />
        </>
      ) : (
        <>
          <input type="hidden" name="tipe" value={tipe} />
          <input type="hidden" name="parentId" value={parentId === "none" ? "" : parentId} />
        </>
      )}
      {locked ? (
        <p className="text-sm text-muted-foreground">
          Akun sistem: hanya nama yang boleh diubah. Kode, tipe, dan induk terkunci.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Kode">
          {locked ? (
            <p className="flex h-11 items-center font-mono text-sm">{edit?.kode}</p>
          ) : (
            <>
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
            </>
          )}
        </Field>
        <Field label="Nama">
          <Input name="nama" defaultValue={edit?.nama} className="h-11" />
        </Field>
        <Field label="Tipe">
          {locked ? (
            <p className="flex h-11 items-center text-sm">
              {tipeAkunLabel[edit!.tipe as keyof typeof tipeAkunLabel]}
            </p>
          ) : (
            <Select value={tipe} onValueChange={setTipe} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                {tipeAkunList.map((t) => (
                  <SelectItem key={t} value={t}>
                    {tipeAkunLabel[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>
        <Field label="Akun induk">
          {locked ? (
            <p className="flex h-11 items-center text-sm text-muted-foreground">
              {edit?.parentId
                ? parents.find((p) => p.id === edit.parentId)?.kode ?? "—"
                : "Tanpa induk"}
            </p>
          ) : (
            <Select value={parentId} onValueChange={setParentId}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Tanpa induk (akun utama)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Tanpa induk (akun utama)</SelectItem>
                {parents
                  .filter((parent) => parent.id !== edit?.id)
                  .map((parent) => (
                    <SelectItem key={parent.id} value={String(parent.id)}>
                      {labelAkunDropdown(parent)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </Field>
      </div>
      <SubmitButton className="h-11" pendingLabel="Menyimpan...">
        {edit ? "Simpan perubahan" : "Simpan akun"}
      </SubmitButton>
    </form>
  );
}

export function AkunFormSheet({
  trigger,
  parents,
  edit,
}: {
  trigger: ReactNode;
  parents: AkunOption[];
  edit?: AkunEdit;
}) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title={edit ? `Ubah akun ${edit.kode}` : "Tambah akun"}
      description={
        edit
          ? "Perubahan kode/induk memengaruhi struktur COA — jurnal lama tetap terhubung."
          : "Pilih induk dan tipe — kode unik di seluruh bagan."
      }
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? (
        <AkunForm
          key={edit?.id ?? "baru"}
          parents={parents}
          edit={edit}
          onSuccess={() => setOpen(false)}
        />
      ) : null}
    </FormSheet>
  );
}
