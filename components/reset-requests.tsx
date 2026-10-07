"use client";

import { useFormState } from "react-dom";
import {
  approvePasswordReset,
  rejectPasswordReset,
} from "@/app/actions/password";
import { SubmitButton } from "@/components/submit-button";

export type PendingReset = {
  id: number;
  nama: string;
  email: string;
  requestedAt: string;
};

export function ResetRequests({ requests }: { requests: PendingReset[] }) {
  const [state, approveAction] = useFormState(approvePasswordReset, {});

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
            Berikan langsung ke orangnya. Sandi ini hanya tampil sekali, dan
            wajib diganti saat ia masuk.
          </p>
        </div>
      ) : null}

      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      {requests.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Belum ada permintaan reset sandi.
        </p>
      ) : (
        <ul className="divide-y rounded-md border">
          {requests.map((request) => (
            <li
              key={request.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-sm">
                <p className="font-medium">{request.nama}</p>
                <p className="text-muted-foreground">{request.email}</p>
                <p className="text-xs text-muted-foreground">
                  Diminta {request.requestedAt}
                </p>
              </div>
              <div className="flex gap-2">
                <form action={approveAction}>
                  <input type="hidden" name="id" value={request.id} />
                  <SubmitButton className="h-11" pendingLabel="Memproses...">
                    Setujui
                  </SubmitButton>
                </form>
                <form action={rejectPasswordReset}>
                  <input type="hidden" name="id" value={request.id} />
                  <SubmitButton
                    variant="outline"
                    className="h-11"
                    pendingLabel="Memproses..."
                  >
                    Tolak
                  </SubmitButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
