import { getServerSession } from "next-auth";
import { LogoutButton } from "@/components/logout-button";
import { authOptions } from "@/lib/auth";
import { roleLabel, type Role } from "@/types/role";

export async function RoleHome({ role }: { role: Role }) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || roleLabel[role];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">
          {roleLabel[role]}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-muted-foreground">
          {`Anda masuk sebagai ${roleLabel[role]}.`}
        </p>
      </header>
      <LogoutButton />
    </main>
  );
}
