import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import type { Role } from "@/types/role";
import type { Session } from "next-auth";

export async function requireActionRole(allowed: readonly Role[]): Promise<
  | { session: Session; error: null }
  | { session: null; error: string }
> {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return { session: null, error: "Belum masuk." };
  if (!isRoleAllowed(role, allowed)) {
    return { session: null, error: "Peran Anda tidak berhak." };
  }
  return { session, error: null };
}
