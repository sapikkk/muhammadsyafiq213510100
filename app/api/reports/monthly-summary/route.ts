import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { authOptions } from "@/lib/auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { monthlySummary } from "@/lib/monthly-summary";

export const GET = withApiHandler(async (request: Request) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return apiFail("FORBIDDEN", "Akses ditolak.", 403);
  }
  const url = new URL(request.url);
  const months = Number(url.searchParams.get("months") ?? "6");
  const data = await monthlySummary(Number.isFinite(months) ? months : 6);
  return apiOk(data);
});
