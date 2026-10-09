import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { isRoleAllowed } from "@/lib/rbac";
import type { Role } from "@/types/role";

export async function requireApiRole(allowed: readonly Role[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) {
    return {
      denied: NextResponse.json({ error: "Belum masuk." }, { status: 401 }),
      session: null as null,
    };
  }
  if (!isRoleAllowed(role, allowed)) {
    return {
      denied: NextResponse.json(
        { error: "Peran Anda tidak berhak." },
        { status: 403 },
      ),
      session: null as null,
    };
  }
  return { denied: null, session };
}
