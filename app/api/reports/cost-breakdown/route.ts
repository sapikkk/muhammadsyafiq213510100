import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { CostBreakdownError, costBreakdown } from "@/lib/cost-breakdown";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const url = new URL(request.url);
  const akunIdRaw = url.searchParams.get("akunId");
  const akunId = akunIdRaw ? Number(akunIdRaw) : null;
  try {
    const data = await costBreakdown({
      dari: url.searchParams.get("dari"),
      sampai: url.searchParams.get("sampai"),
      akunId: akunId != null && Number.isInteger(akunId) ? akunId : null,
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof CostBreakdownError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
