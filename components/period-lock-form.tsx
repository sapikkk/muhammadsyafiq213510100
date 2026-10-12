"use client";

import { useFormState } from "react-dom";
import {
  updatePeriodeTutupAction,
  type PeriodLockState,
} from "@/app/actions/period-lock";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function PeriodLockForm({ periodeTutup }: { periodeTutup: string | null }) {
  const [state, formAction] = useFormState(updatePeriodeTutupAction, {} as PeriodLockState);
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Kolom</TableHead>
            <TableHead>Isian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="text-sm text-muted-foreground">
              {periodeTutup
                ? `Aktif: jurnal dengan tanggal sebelum ${periodeTutup} ditolak.`
                : "Belum ada kunci periode (semua tanggal diizinkan)."}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Tanggal tutup periode</TableCell>
            <TableCell>
              <Input
                name="periodeTutup"
                type="date"
                defaultValue={periodeTutup ?? ""}
                className="h-11 max-w-md"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Hapus kunci</TableCell>
            <TableCell>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="clear" className="h-4 w-4" />
                Hapus tutup periode
              </label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              <SubmitButton className="h-11" pendingLabel="Menyimpan…">
                Simpan pengaturan
              </SubmitButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
