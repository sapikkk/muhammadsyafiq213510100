"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import type { ColumnDef } from "@tanstack/react-table";
import {
  createOwnerUser,
  resetOwnerUserPassword,
  ubahStatusOwnerUser,
  type OwnerUserState,
} from "@/app/actions/owner-users";
import { AktifToggleDialog } from "@/components/aktif-toggle-dialog";
import { DataTable } from "@/components/data-table";
import { FormSheet } from "@/components/form-sheet";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { roleLabel, type Role } from "@/types/role";

export type OwnerUserRow = {
  id: number;
  nama: string;
  email: string;
  role: Role;
  mustChangePassword: boolean;
  aktif: boolean;
};

export function OwnerUserDaftar({ users }: { users: OwnerUserRow[] }) {
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");
  const focusUserId = userParam ? Number(userParam) : null;
  const focusRowId =
    focusUserId != null && Number.isInteger(focusUserId) && focusUserId > 0
      ? focusUserId
      : null;

  const columns = useMemo<ColumnDef<OwnerUserRow>[]>(
    () => [
      {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ row }) => (
          <div>
            <p className="flex items-center gap-2 font-medium">
              {row.original.nama}
              {!row.original.aktif ? (
                <Badge variant="outline" className="text-xs font-normal">
                  Nonaktif
                </Badge>
              ) : null}
            </p>
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
        header: "",
        enableSorting: false,
        cell: ({ row }) =>
          row.original.role !== "OWNER" ? (
            <div className="flex justify-end gap-1.5">
              <ResetPasswordDialog userId={row.original.id} email={row.original.email} />
              <AktifToggleDialog
                id={row.original.id}
                aktif={row.original.aktif}
                idFieldName="userId"
                action={ubahStatusOwnerUser}
                label={row.original.email}
                offDescription="User nonaktif tidak bisa login; sesi JWT yang sudah ada tetap sampai habis."
                onDescription="User aktif kembali bisa login dengan sandi yang ada."
              />
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      pageSize={8}
      searchPlaceholder="Cari nama atau email…"
      searchColumnIds={["nama", "email"]}
      emptyMessage="Belum ada user."
      focusRowId={focusRowId}
      getRowFocusId={(row) => row.id}
      getRowDomId={(row) => `owner-user-${row.id}`}
    />
  );
}

function OwnerUserCreateForm({ onSuccess }: { onSuccess?: () => void }) {
  const [role, setRole] = useState<"PEKERJA" | "ADMIN">("PEKERJA");
  const [state, createAction] = useFormState(createOwnerUser, {} as OwnerUserState);
  useActionToast({ error: state.error, ok: state.ok ? state.message : undefined });

  useEffect(() => {
    if (state.ok) onSuccess?.();
  }, [state.ok, onSuccess]);

  return (
    <form action={createAction} className="space-y-4">
      <input type="hidden" name="role" value={role} />
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Nama</span>
        <Input name="nama" className="h-11" required />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Email</span>
        <Input name="email" type="email" className="h-11" required />
      </label>
      <div className="space-y-1 text-sm">
        <span className="font-medium">Peran</span>
        <Select value={role} onValueChange={(v) => setRole(v as "PEKERJA" | "ADMIN")}>
          <SelectTrigger className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PEKERJA">{roleLabel.PEKERJA}</SelectItem>
            <SelectItem value="ADMIN">{roleLabel.ADMIN}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Sandi awal</span>
        <Input name="password" type="password" className="h-11" required minLength={8} />
      </label>
      <SubmitButton className="h-11" pendingLabel="Menyimpan…">
        Buat akun
      </SubmitButton>
    </form>
  );
}

export function OwnerUserCreateSheet({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <FormSheet
      title="Tambah akun login"
      description="Admin atau Petani. Sandi awal; user bisa wajib ganti saat login."
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      {open ? <OwnerUserCreateForm onSuccess={() => setOpen(false)} /> : null}
    </FormSheet>
  );
}

function ResetPasswordDialog({ userId, email }: { userId: number; email: string }) {
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(resetOwnerUserPassword, {} as OwnerUserState);
  useActionToast({ error: state.error, ok: state.ok ? state.message : undefined });

  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 text-xs">
          Reset sandi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset sandi</DialogTitle>
          <DialogDescription>
            Akun {email}. User wajib ganti sandi saat login berikutnya.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 pt-2">
          <input type="hidden" name="userId" value={userId} />
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Sandi baru</span>
            <Input name="password" type="password" className="h-11" minLength={8} required />
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <SubmitButton pendingLabel="…">Reset sandi</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
