"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { changeOwnPassword, updateProfile } from "@/app/actions/profile";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";

export function AccountSettings({ nama }: { nama: string }) {
  const [profile, profileAction] = useFormState(updateProfile, {});
  const [password, passwordAction] = useFormState(changeOwnPassword, {});
  const { update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (profile.ok) update().then(() => router.refresh());
  }, [profile.ok, update, router]);

  return (
    <div className="space-y-8">
      <section aria-labelledby="profil-title" className="space-y-3">
        <h2 id="profil-title" className="text-lg font-semibold">
          Profil
        </h2>
        <form action={profileAction} noValidate className="space-y-4">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Nama</span>
            <Input
              name="nama"
              defaultValue={nama}
              autoComplete="name"
              className="h-11"
            />
          </label>
          {profile.error ? (
            <p role="alert" className="text-sm text-destructive">
              {profile.error}
            </p>
          ) : null}
          {profile.ok ? (
            <p role="status" className="text-sm">
              Nama tersimpan.
            </p>
          ) : null}
          <SubmitButton className="h-11" pendingLabel="Menyimpan...">
            Simpan nama
          </SubmitButton>
        </form>
      </section>

      <section aria-labelledby="sandi-title" className="space-y-3">
        <h2 id="sandi-title" className="text-lg font-semibold">
          Ubah sandi
        </h2>
        <form action={passwordAction} noValidate className="space-y-4">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Sandi lama</span>
            <Input
              name="current"
              type="password"
              autoComplete="current-password"
              className="h-11"
            />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Sandi baru</span>
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              className="h-11"
              aria-describedby="aturan-sandi-baru"
            />
            <span
              id="aturan-sandi-baru"
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
            />
          </label>
          {password.error ? (
            <p role="alert" className="text-sm text-destructive">
              {password.error}
            </p>
          ) : null}
          {password.ok ? (
            <p role="status" className="text-sm">
              Sandi tersimpan.
            </p>
          ) : null}
          <SubmitButton className="h-11" pendingLabel="Menyimpan...">
            Simpan sandi
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
