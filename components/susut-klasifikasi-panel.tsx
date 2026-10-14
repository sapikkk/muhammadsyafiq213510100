"use client";

import { useFormState } from "react-dom";
import { klasifikasiSusut } from "@/app/actions/susut";
import { SubmitButton } from "@/components/submit-button";
import { labelTahap } from "@/lib/kegagalan-labels";
import {
  labelBarisProduksiUtama,
  partsFromSiklusNested,
} from "@/lib/produksi-ui-labels";
import { kategoriSusutOptions } from "@/lib/susut-labels";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export type LogMenunggu = {
  id: number;
  tahap: string;
  jumlah_gagal: number;
  penyebab: string;
  siklus: {
    kode_batch: string;
    varietas: { nama: string };
    kolam: { nama: string; greenhouse: { nama: string } };
  };
};

function KlasifikasiBaris({ row }: { row: LogMenunggu }) {
  const [state, formAction] = useFormState(klasifikasiSusut, {});
  useActionToast({ error: state.error, ok: state.ok });

  const parts = partsFromSiklusNested({
    kode_batch: row.siklus.kode_batch,
    varietas: row.siklus.varietas,
    kolam: row.siklus.kolam,
  });

  return (
    <li id={`log-kegagalan-${row.id}`} className="scroll-mt-24 space-y-3 rounded-md border p-4 text-sm">
      <div>
        <p className="font-medium">{labelBarisProduksiUtama(parts)}</p>
        <p>
          {labelTahap(row.tahap)} · {row.jumlah_gagal} gagal
        </p>
        <p className="text-muted-foreground">{row.penyebab}</p>
      </div>
      <form action={formAction} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="logId" value={row.id} />
        <label className="block space-y-1 text-xs">
          <span className="font-medium">Kategori susut</span>
          <select
            name="kategoriSusut"
            required
            className="flex h-10 w-full min-w-0 max-w-md rounded-md border border-input bg-background px-2 text-sm"
          >
            {kategoriSusutOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <SubmitButton className="h-10" pendingLabel="Menyimpan...">
          Klasifikasi
        </SubmitButton>
      </form>
    </li>
  );
}

export function SusutKlasifikasiPanel({ rows }: { rows: LogMenunggu[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        Tidak ada log menunggu klasifikasi susut.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {rows.map((row) => (
        <KlasifikasiBaris key={row.id} row={row} />
      ))}
    </ul>
  );
}
