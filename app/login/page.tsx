"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roleHome } from "@/lib/role-home";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setError("Isi email dan sandi.");
      return;
    }

    setPending(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setPending(false);

    if (!result?.ok) {
      setError("Email atau sandi tidak cocok.");
      return;
    }

    const session = await getSession();
    const role = session?.user?.role;
    if (session?.user?.mustChangePassword) router.push("/ganti-sandi");
    else router.push(role ? roleHome[role] : "/login");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10">
      <p className="text-sm font-medium text-primary">Kokonus Farm</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Masuk</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Email dan sandi untuk Owner, Admin, atau Petani.
      </p>
      <form className="mt-6 space-y-4" noValidate onSubmit={onSubmit}>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Email</span>
          <Input
            name="email"
            type="email"
            autoComplete="username"
            className="h-11"
            aria-invalid={error ? true : undefined}
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Sandi</span>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            className="h-11"
            aria-invalid={error ? true : undefined}
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="h-11 w-full" disabled={pending}>
          {pending ? "Memeriksa..." : "Masuk"}
        </Button>
      </form>
      <Link
        href="/lupa-sandi"
        className="mt-4 text-center text-sm text-primary underline-offset-4 hover:underline"
      >
        Lupa sandi?
      </Link>
    </main>
  );
}
