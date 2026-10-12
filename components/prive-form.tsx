"use client";

import { useFormState } from "react-dom";
import { submitPrive, type PriveState } from "@/app/actions/prive";
import { KasSumberSelect } from "@/components/kas-sumber-select";
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
import type { RekeningKasOption } from "@/lib/rekening-kas-types";

export function PriveForm({
  defaultTanggal,
  rekeningOptions = [],
}: {
  defaultTanggal: string;
  rekeningOptions?: RekeningKasOption[];
}) {
  const [state, formAction] = useFormState(submitPrive, {} as PriveState);
  useActionToast({
    error: state.error,
    message:
      state.ok && state.jurnalId
        ? "Catatan ambil pribadi menunggu persetujuan Admin."
        : undefined,
  });

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
              Catatan menunggu persetujuan Admin: ambil pribadi dari kas tunai atau bank.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Tanggal</TableCell>
            <TableCell>
              <Input name="tanggal" type="date" defaultValue={defaultTanggal} className="h-11 max-w-md" required />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Nominal (Rp)</TableCell>
            <TableCell>
              <Input name="nominal" inputMode="decimal" className="h-11 max-w-md" required placeholder="500000" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sumber kas</TableCell>
            <TableCell>
              <KasSumberSelect
                rekeningOptions={rekeningOptions}
                className="flex h-11 max-w-md rounded-md border border-input bg-background px-3 text-sm"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Catatan (opsional)</TableCell>
            <TableCell>
              <Input name="catatan" className="h-11 max-w-md" maxLength={200} placeholder="Keperluan pribadi" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              <SubmitButton pendingLabel="Menyimpan…">Kirim jurnal prive</SubmitButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
