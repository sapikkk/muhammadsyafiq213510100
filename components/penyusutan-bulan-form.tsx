"use client";

import { useFormState } from "react-dom";
import { catatPenyusutanBulanAction } from "@/app/actions/penyusutan";
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

export function PenyusutanBulanForm({ defaultBulan }: { defaultBulan: string }) {
  const [state, formAction] = useFormState(catatPenyusutanBulanAction, {});
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <form action={formAction}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Field</TableHead>
            <TableHead>Isian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="text-sm text-muted-foreground">
              Penyusutan greenhouse dan instalasi — biasanya sekali per bulan; jurnal otomatis disetujui.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bulan</TableCell>
            <TableCell>
              <Input name="bulan" type="month" defaultValue={defaultBulan} className="h-11 max-w-md" required />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              <SubmitButton className="h-11" pendingLabel="Mencatat…">
                Catat penyusutan bulan ini
              </SubmitButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
