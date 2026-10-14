"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { roleHome } from "@/lib/role-home";
import { notify } from "@/lib/notify";
import { PageGuideFooter } from "@/components/page-guide-footer";
import { PageHeaderRow } from "@/components/page-header-row";

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
      const msg = "Isi email dan sandi.";
      setError(msg);
      notify.error(msg);
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
      const msg = "Email atau sandi tidak cocok.";
      setError(msg);
      notify.error(msg);
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
        <PageHeaderRow title="Masuk" />

        <Card>
          <CardContent className="pt-6">
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
        <PageGuideFooter />
      </div>
    </main>
  );
}
