"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { toggleAkun } from "@/app/actions/akun";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { tipeAkunLabel, type TipeAkunKey } from "@/lib/akun-tipe";

export type AkunRow = {
  id: number;
  kode: string;
  nama: string;
  tipe: TipeAkunKey;
  aktif: boolean;
  anak: AkunRow[];
};

type ToggleAction = (formData: FormData) => void;

function Node({
  akun,
  depth,
  toggleAction,
}: {
  akun: AkunRow;
  depth: number;
  toggleAction: ToggleAction;
}) {
  return (
    <li>
      <div
        className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ paddingLeft: depth * 20 }}
      >
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-mono font-medium">{akun.kode}</span>
          <span
            className={akun.aktif ? "" : "text-muted-foreground line-through"}
          >
            {akun.nama}
          </span>
          {depth === 0 ? (
            <Badge variant="secondary">{tipeAkunLabel[akun.tipe]}</Badge>
          ) : null}
          {akun.aktif ? null : <Badge variant="outline">Nonaktif</Badge>}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/akun?edit=${akun.id}`}
            className="inline-flex h-9 items-center rounded-md border border-input px-3 text-sm hover:bg-accent"
          >
            Ubah
          </Link>
          <form action={toggleAction}>
            <input type="hidden" name="id" value={akun.id} />
            <input type="hidden" name="aktif" value={String(!akun.aktif)} />
            <SubmitButton
              variant="outline"
              size="sm"
              className="h-9"
              pendingLabel="Memproses..."
            >
              {akun.aktif ? "Nonaktifkan" : "Aktifkan"}
            </SubmitButton>
          </form>
        </div>
      </div>
      {akun.anak.length > 0 ? (
        <ul className="divide-y border-t">
          {akun.anak.map((anak) => (
            <Node
              key={anak.id}
              akun={anak}
              depth={depth + 1}
              toggleAction={toggleAction}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function AkunTree({ tree }: { tree: AkunRow[] }) {
  const [state, toggleAction] = useFormState(toggleAkun, {});

  return (
    <section aria-labelledby="akun-tree-title" className="space-y-3">
      <h2 id="akun-tree-title" className="text-lg font-semibold">
        Daftar akun
      </h2>
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
      {tree.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Belum ada akun. Tambahkan akun utama dulu, misalnya 1000 Aset.
        </p>
      ) : (
        <ul className="divide-y rounded-md border px-4">
          {tree.map((akun) => (
            <Node
              key={akun.id}
              akun={akun}
              depth={0}
              toggleAction={toggleAction}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
