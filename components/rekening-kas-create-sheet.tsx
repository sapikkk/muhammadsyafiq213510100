"use client";

import { useFormState } from "react-dom";
import { FormSheet } from "@/components/form-sheet";
import { RekeningKasFormFields } from "@/components/rekening-kas-form";
import { Button } from "@/components/ui/button";
import {
  createRekeningKasAction,
  type RekeningKasFormState,
} from "@/app/actions/rekening-kas";
import { useActionToast } from "@/lib/hooks/use-action-toast";

export function RekeningKasCreateSheet() {
  const [state, action] = useFormState(createRekeningKasAction, {} as RekeningKasFormState);
  useActionToast({ error: state.error, ok: state.ok });

  return (
    <FormSheet
      title="Tambah rekening"
      description="Kas tunai, bank, atau e-wallet untuk pencatatan arus kas."
      isSuccess={Boolean(state.ok)}
      trigger={
        <Button type="button" className="h-11">
          Tambah rekening
        </Button>
      }
    >
      <form action={action} className="space-y-4">
        <RekeningKasFormFields idPrefix="sheet-" />
      </form>
    </FormSheet>
  );
}
