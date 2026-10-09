"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { changePassword } from "@/app/actions/password";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { roleHome } from "@/lib/role-home";

export default function GantiSandiPage() {
  const [state, formAction] = useFormState(changePassword, {});
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!state.ok) return;
    update().then(() => {
      const role = session?.user?.role;
      router.push(role ? roleHome[role] : "/login");
      router.refresh();
    });
  }, [state.ok, update, router, session?.user?.role]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10">
      <p className="text-sm font-medium text-primary">Kokonus Farm</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Ganti sandi
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {session?.user?.mustChangePassword
          ? "Anda masuk dengan sandi dari Admin. Buat sandi baru sebelum lanjut."
          : "Buat sandi baru untuk akun ini."}
      </p>
      <form action={formAction} noValidate className="mt-6 space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Sandi baru</span>
          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            className="h-11"
            aria-describedby="aturan-sandi"
            aria-invalid={state.error ? true : undefined}
          />
          <span
            id="aturan-sandi"
            className="block text-xs text-muted-foreground"
          >
            Minimal 8 karakter, berisi huruf dan angka.
          </span>
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Ulangi sandi baru</span>
          <Input
            name="confirm"
            type="password"
            autoComplete="new-password"
            className="h-11"
            aria-invalid={state.error ? true : undefined}
          />
        </label>
        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        {state.ok ? (
          <p role="status" className="text-sm">
            Sandi tersimpan. Membuka halaman Anda...
          </p>
        ) : null}
        <SubmitButton className="h-11 w-full" pendingLabel="Menyimpan...">
          Simpan sandi baru
        </SubmitButton>
      </form>
    </main>
  );
}
