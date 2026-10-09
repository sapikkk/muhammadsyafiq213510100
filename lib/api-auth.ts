import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiFail } from "@/lib/api-response";
import { isRoleAllowed } from "@/lib/rbac";
import type { Role } from "@/types/role";

export async function requireApiRole(allowed: readonly Role[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) {
    return {
      denied: apiFail("UNAUTHORIZED", "Belum masuk.", 401),
      session: null,
    };
  }
  if (!isRoleAllowed(role, allowed)) {
    return {
      denied: apiFail("FORBIDDEN", "Peran Anda tidak berhak.", 403),
      session: null,
    };
  }
  return { denied: null, session };
}
