"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useFormState } from "react-dom";
import { useMemo } from "react";
import {
  approvePasswordReset,
  rejectPasswordReset,
} from "@/app/actions/password";
import { DataTable } from "@/components/data-table";
import { SubmitButton } from "@/components/submit-button";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export type PendingReset = {
  id: number;
  nama: string;
  email: string;
  requestedAt: string;
};

function ResetActions({
  id,
  approveAction,
}: {
  id: number;
  approveAction: (payload: FormData) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <form action={approveAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton className="h-9" pendingLabel="Memproses...">
          Setujui
        </SubmitButton>
      </form>
      <form action={rejectPasswordReset}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton variant="outline" className="h-9" pendingLabel="Memproses...">
          Tolak
        </SubmitButton>
      </form>
    </div>
  );
}

export function ResetRequests({ requests }: { requests: PendingReset[] }) {
  const [state, approveAction] = useFormState(approvePasswordReset, {});
  useActionToast({ error: state.error });

  const columns = useMemo<ColumnDef<PendingReset>[]>(
    () => [
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "requestedAt",
        header: "Diminta",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.requestedAt}</span>
        ),
      },
      {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
          <ResetActions id={row.original.id} approveAction={approveAction} />
        ),
      },
    ],
    [approveAction],
  );

  return (
    <section aria-labelledby="reset-title" className="space-y-3">
      <h2 id="reset-title" className="text-lg font-semibold">
        Permintaan reset sandi
      </h2>

      {state.tempPassword ? (
        <div
          role="status"
          className="space-y-1 rounded-md border bg-secondary p-4 text-sm"
        >
          <p>{`Sandi sementara untuk ${state.nama} (${state.email}):`}</p>
          <p className="font-mono text-base font-semibold tracking-wide">
            {state.tempPassword}
          </p>
          <p className="text-muted-foreground">
            Berikan langsung ke orangnya. Sandi ini hanya tampil sekali, dan wajib diganti saat ia
            masuk.
          </p>
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={requests}
        pageSize={8}
        searchPlaceholder="Cari nama atau email…"
        searchColumnIds={["nama", "email"]}
        emptyMessage="Belum ada permintaan reset sandi."
      />
    </section>
  );
}
