"use client";

import { useFormState } from "react-dom";
import {
  createOwnerUser,
  resetOwnerUserPassword,
  type OwnerUserState,
} from "@/app/actions/owner-users";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
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

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tambah akun login</h2>
        <form action={createAction} className="grid max-w-lg gap-3 rounded-md border p-4 sm:grid-cols-2">
          {createState.error ? (
            <p className="sm:col-span-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
              {createState.error}
            </p>
          ) : null}
          {createState.ok ? (
            <p className="sm:col-span-2 rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">
              {createState.message}
            </p>
          ) : null}
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
            <select name="role" className="flex h-11 w-full rounded-md border bg-background px-3 text-sm" defaultValue="PEKERJA">
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
        <ul className="divide-y rounded-md border">
          {users.map((u) => (
            <li key={u.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium">{u.nama}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
                <p className="text-xs text-muted-foreground">
                  {roleLabel[u.role]}
                  {u.mustChangePassword ? " · wajib ganti sandi" : ""}
                </p>
              </div>
              {u.role !== "OWNER" ? <ResetPasswordForm userId={u.id} /> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ResetPasswordForm({ userId }: { userId: number }) {
  const [state, action] = useFormState(resetOwnerUserPassword, {} as OwnerUserState);

  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="userId" value={userId} />
      <label className="space-y-1 text-xs">
        <span className="text-muted-foreground">Sandi baru</span>
        <Input name="password" type="password" className="h-9 w-40" minLength={8} required />
      </label>
      <SubmitButton pendingLabel="…" className="h-9">
        Reset
      </SubmitButton>
      {state.error ? <p className="w-full text-xs text-destructive">{state.error}</p> : null}
      {state.ok ? <p className="w-full text-xs text-primary">{state.message}</p> : null}
    </form>
  );
}
