"use client";

import { useEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import type { ColumnDef } from "@tanstack/react-table";
import {
  createOwnerUser,
  resetOwnerUserPassword,
  type OwnerUserState,
} from "@/app/actions/owner-users";
import { DataTable } from "@/components/data-table";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { notify } from "@/lib/notify";
import { roleLabel, type Role } from "@/types/role";

type UserRow = {
  id: number;
  nama: string;
  email: string;
  role: Role;
  mustChangePassword: boolean;
};

export function OwnerUserPanel({ users }: { users: UserRow[] }) {
  const [createState, createAction] = useFormState(createOwnerUser, {} as OwnerUserState);

  useEffect(() => {
    if (createState.error) notify.error(createState.error);
    if (createState.ok && createState.message) notify.success(createState.message);
  }, [createState.error, createState.ok, createState.message]);

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.nama}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Peran",
        cell: ({ row }) => (
          <span className="text-sm">
            {roleLabel[row.original.role]}
            {row.original.mustChangePassword ? " · wajib ganti sandi" : ""}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) =>
          row.original.role !== "OWNER" ? (
            <ResetPasswordForm userId={row.original.id} />
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tambah akun login</h2>
        <form action={createAction} className="grid max-w-lg gap-3 border p-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm sm:col-span-2">
            <span className="font-medium">Nama</span>
            <Input name="nama" className="h-11" required />
          </label>
          <label className="space-y-1 text-sm sm:col-span-2">
            <span className="font-medium">Email</span>
            <Input name="email" type="email" className="h-11" required />
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Peran</span>
            <select
              name="role"
              className="flex h-11 w-full border border-input bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
              defaultValue="PEKERJA"
            >
              <option value="PEKERJA">{roleLabel.PEKERJA}</option>
              <option value="ADMIN">{roleLabel.ADMIN}</option>
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="font-medium">Sandi awal</span>
            <Input name="password" type="password" className="h-11" required minLength={8} />
          </label>
          <div className="sm:col-span-2">
            <SubmitButton pendingLabel="Menyimpan…">Buat akun</SubmitButton>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Daftar user</h2>
        <DataTable columns={columns} data={users} pageSize={8} emptyMessage="Belum ada user." />
      </section>
    </div>
  );
}

function ResetPasswordForm({ userId }: { userId: number }) {
  const [state, action] = useFormState(resetOwnerUserPassword, {} as OwnerUserState);

  useEffect(() => {
    if (state.error) notify.error(state.error);
    if (state.ok && state.message) notify.success(state.message);
  }, [state.error, state.ok, state.message]);

  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="userId" value={userId} />
      <label className="space-y-1 text-xs">
        <span className="text-muted-foreground">Sandi baru</span>
        <Input name="password" type="password" className="h-9 w-36" minLength={8} required />
      </label>
      <SubmitButton pendingLabel="…" className="h-9">
        Reset
      </SubmitButton>
    </form>
  );
}
