import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  if (!isRoleAllowed(role, ["ADMIN", "OWNER"])) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }
  const pohon = await listInfrastrukturPohon();
  return NextResponse.json(serializeInfrastruktur(pohon));
}
