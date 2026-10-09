import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { buildCashFlow, CashFlowError } from "@/lib/cash-flow";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const url = new URL(request.url);
  try {
    const data = await buildCashFlow({
      dari: url.searchParams.get("dari"),
      sampai: url.searchParams.get("sampai"),
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof CashFlowError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
