"use client";

import { useFormState } from "react-dom";
import { registerPetani } from "@/app/actions/register";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";

export function RegisterPetani() {
  const [state, formAction] = useFormState(registerPetani, {});

  return (
    <section aria-labelledby="daftar-title" className="space-y-3">
      <h2 id="daftar-title" className="text-lg font-semibold">
        Daftarkan petani
      </h2>
      <p className="text-sm text-muted-foreground">
        Tidak ada pendaftaran publik. Isi nama, email, dan sandi awal, lalu
        berikan langsung ke petani.
      </p>
      <form action={formAction} noValidate className="space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Nama</span>
          <Input name="nama" autoComplete="name" className="h-11" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Email</span>
          <Input
            name="email"
            type="email"
            autoComplete="off"
            className="h-11"
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Sandi awal</span>
          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            className="h-11"
            aria-describedby="aturan-sandi-awal"
          />
          <span
            id="aturan-sandi-awal"
            className="block text-xs text-muted-foreground"
          >
            Minimal 8 karakter, berisi huruf dan angka. Saat masuk, petani
            wajib menggantinya.
          </span>
        </label>
        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        {state.nama && state.email ? (
          <p role="status" className="text-sm">
            {`Akun ${state.nama} (${state.email}) tersimpan sebagai petani.`}
          </p>
        ) : null}
        <SubmitButton className="h-11" pendingLabel="Menyimpan...">
          Simpan akun
        </SubmitButton>
      </form>
    </section>
  );
}
