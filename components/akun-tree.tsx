"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useMemo, useState } from "react";
import { toggleAkun } from "@/app/actions/akun";
import { SubmitButton } from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { tipeAkunLabel, type TipeAkunKey } from "@/lib/akun-tipe";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export type AkunRow = {
  id: number;
  kode: string;
  nama: string;
  tipe: TipeAkunKey;
  aktif: boolean;
  anak: AkunRow[];
};

type ToggleAction = (formData: FormData) => void;

function filterAkunTree(nodes: AkunRow[], query: string): AkunRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return nodes;

  function walk(node: AkunRow): AkunRow | null {
    const selfMatch =
      node.kode.toLowerCase().includes(q) || node.nama.toLowerCase().includes(q);
    const anak = node.anak.map(walk).filter((n): n is AkunRow => n !== null);
    if (selfMatch || anak.length > 0) {
      return { ...node, anak: selfMatch ? node.anak : anak };
    }
    return null;
  }

  return nodes.map(walk).filter((n): n is AkunRow => n !== null);
}

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
          <span className={akun.aktif ? "" : "text-muted-foreground line-through"}>
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
  const [filter, setFilter] = useState("");
  useActionToast({ error: state.error, saved: state.saved });

  const visible = useMemo(() => filterAkunTree(tree, filter), [tree, filter]);

  return (
    <section aria-labelledby="akun-tree-title" className="space-y-3">
      <h2 id="akun-tree-title" className="text-lg font-semibold">
        Daftar akun
      </h2>
      {tree.length > 0 ? (
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cari kode atau nama akun…"
          className="h-9 max-w-sm"
          aria-label="Cari akun"
        />
      ) : null}
      {tree.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Belum ada akun. Tambahkan akun utama dulu, misalnya 1000 Aset.
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Tidak ada akun yang cocok dengan pencarian.
        </p>
      ) : (
        <ul className="divide-y rounded-md border px-4">
          {visible.map((akun) => (
            <Node key={akun.id} akun={akun} depth={0} toggleAction={toggleAction} />
          ))}
        </ul>
      )}
    </section>
  );
}
