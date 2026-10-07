"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { requestPasswordReset } from "@/app/actions/password";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";

export default function LupaSandiPage() {
  const [state, formAction] = useFormState(requestPasswordReset, {});

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10">
      <p className="text-sm font-medium text-primary">Kokonus Farm</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Lupa sandi</h1>

      {state.sent ? (
        <div role="status" className="mt-4 space-y-4">
          <p className="text-sm">
            Permintaan sudah masuk ke Admin. Jika disetujui, Admin memberi Anda
            sandi sementara secara langsung. Jika ditolak, Admin juga akan
            memberi tahu.
          </p>
          <Link
            href="/login"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Kembali ke halaman masuk
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted-foreground">
            Sandi tidak direset lewat tautan. Isi email akun Anda, lalu Admin
            yang memproses permintaannya.
          </p>
          <form action={formAction} noValidate className="mt-6 space-y-4">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Email</span>
              <Input
                name="email"
                type="email"
                autoComplete="username"
                className="h-11"
                aria-invalid={state.error ? true : undefined}
              />
            </label>
            {state.error ? (
              <p role="alert" className="text-sm text-destructive">
                {state.error}
              </p>
            ) : null}
            <SubmitButton className="h-11 w-full" pendingLabel="Mengirim...">
              Kirim permintaan ke Admin
            </SubmitButton>
          </form>
          <Link
            href="/login"
            className="mt-4 text-center text-sm text-primary underline-offset-4 hover:underline"
          >
            Kembali ke halaman masuk
          </Link>
        </>
      )}
    </main>
  );
}
