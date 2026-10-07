import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@/components/logout-button";
import { authOptions } from "@/lib/auth";
import { roleLabel, type Role } from "@/types/role";

export async function RoleHome({
  role,
  children,
}: {
  role: Role;
  children?: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || roleLabel[role];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">{roleLabel[role]}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-muted-foreground">
          {`Anda masuk sebagai ${roleLabel[role]}.`}
        </p>
      </header>
      {children}
      <div className="flex items-center gap-3">
        <Link
          href="/pengaturan"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Pengaturan
        </Link>
        <LogoutButton />
      </div>
    </main>
  );
}
