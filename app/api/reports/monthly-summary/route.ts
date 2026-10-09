import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { monthlySummary } from "@/lib/monthly-summary";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }
  const url = new URL(request.url);
  const months = Number(url.searchParams.get("months") ?? "6");
  const data = await monthlySummary(Number.isFinite(months) ? months : 6);
  return NextResponse.json(data);
}
