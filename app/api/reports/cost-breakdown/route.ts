import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { authOptions } from "@/lib/auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { CostBreakdownError, costBreakdown } from "@/lib/cost-breakdown";

export const GET = withApiHandler(async (request: Request) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return apiFail("FORBIDDEN", "Akses ditolak.", 403);
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
    return apiOk(data);
  } catch (error) {
    if (error instanceof CostBreakdownError) {
      return apiFail("COST_BREAKDOWN_ERROR", error.message, error.status);
    }
    throw error;
  }
});
