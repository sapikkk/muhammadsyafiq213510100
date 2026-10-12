"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import type { CatatUangPihakBundle } from "@/lib/catat-uang-pihak-types";
import { pihakModeForSmartJurnalClient } from "@/lib/catat-uang-pihak-types";
import type { SmartJurnalTipe } from "@/lib/smart-jurnal-catalog";

const selectClass =
  "flex h-11 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm";

function PihakFieldsBody({
  mode,
  options,
  defaultKey,
  placeholder,
}: {
  mode: NonNullable<ReturnType<typeof pihakModeForSmartJurnalClient>>;
  options: { key: string; label: string; group: string }[];
  defaultKey: string;
  placeholder: string;
}) {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">Pihak transaksi</TableCell>
        <TableCell>
          <select
            name="pihakKey"
            className={selectClass}
            defaultValue={defaultKey}
            required={mode !== "umum"}
          >
            {mode === "umum" ? <option value="__none__">— Opsional —</option> : null}
            {options.map((o) => (
              <option key={o.key} value={o.key}>
                {o.group}: {o.label}
              </option>
            ))}
          </select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Nama pihak baru</TableCell>
        <TableCell>
          <Input name="namaPihakBaru" className="h-11 max-w-md" maxLength={100} placeholder={placeholder} />
        </TableCell>
      </TableRow>
    </>
  );
}

export function CatatUangPihakFields({
  tipe,
  pihak,
  layout = "stack",
}: {
  tipe: SmartJurnalTipe;
  pihak: CatatUangPihakBundle;
  layout?: "stack" | "table";
}) {
  const mode = pihakModeForSmartJurnalClient(tipe);

  const options = useMemo(() => {
    if (!mode) return [];
    const rows: { key: string; label: string; group: string }[] = [];
    const push = (list: CatatUangPihakBundle["petani"], group: string) => {
      for (const o of list) rows.push({ ...o, group });
    };
    if (mode === "karyawan") {
      push(pihak.petani, "Karyawan");
      rows.push({ key: "__baru_karyawan__", label: "Tambah karyawan baru…", group: "Baru" });
      return rows;
    }
    if (mode === "pemilik") {
      push(pihak.pemilik, "Pemilik");
      return rows;
    }
    if (mode === "pelanggan") {
      push(pihak.pelanggan, "Pelanggan");
      rows.push({ key: "__lain__", label: "Vendor / lain (ketik nama)…", group: "Baru" });
      return rows;
    }
    push(pihak.petani, "Karyawan");
    push(pihak.pelanggan, "Pelanggan");
    push(pihak.pemilik, "Pemilik");
    rows.push({ key: "__baru_karyawan__", label: "Tambah karyawan baru…", group: "Baru" });
    rows.push({ key: "__lain__", label: "Vendor / PT / lain…", group: "Baru" });
    return rows;
  }, [mode, pihak]);

  if (!mode) return layout === "table" ? null : null;

  const defaultKey =
    mode === "karyawan"
      ? (pihak.petani[0]?.key ?? "__baru_karyawan__")
      : mode === "pemilik"
        ? (pihak.pemilik[0]?.key ?? "")
        : mode === "pelanggan"
          ? (pihak.pelanggan[0]?.key ?? "__lain__")
          : "__none__";

  const placeholder =
    mode === "karyawan"
      ? "Nama karyawan baru"
      : mode === "pemilik"
        ? "Nama pemilik"
        : "Nama vendor, PT, atau pihak";

  if (layout === "table") {
    return (
      <PihakFieldsBody
        mode={mode}
        options={options}
        defaultKey={defaultKey}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Pihak transaksi</p>
      <label className="block space-y-1.5 text-sm">
        <span className="text-muted-foreground">Pilih dari daftar</span>
        <select
          name="pihakKey"
          className={selectClass}
          defaultValue={defaultKey}
          required={mode !== "umum"}
        >
          {mode === "umum" ? <option value="__none__">— Opsional —</option> : null}
          {options.map((o) => (
            <option key={o.key} value={o.key}>
              {o.group}: {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="text-muted-foreground">Nama baru (jika perlu)</span>
        <Input name="namaPihakBaru" className="h-11 max-w-md" maxLength={100} placeholder={placeholder} />
      </label>
    </div>
  );
}
