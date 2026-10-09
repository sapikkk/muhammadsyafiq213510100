"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand */}
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Kokonus Farm
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Masuk</h1>
          <p className="text-sm text-muted-foreground">
            Gunakan akun Owner, Admin, atau Petani.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Login</CardTitle>
            <CardDescription>Masuk dengan email dan sandi Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" noValidate onSubmit={onSubmit}>
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium">Email</span>
                <Input
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="contoh@email.com"
                  aria-invalid={error ? true : undefined}
                />
              </label>
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium">Sandi</span>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={error ? true : undefined}
                />
              </label>
              {error ? (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Memeriksa..." : "Masuk"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/lupa-sandi"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Lupa sandi?
          </Link>
        </p>
      </div>
    </main>
  );
}
