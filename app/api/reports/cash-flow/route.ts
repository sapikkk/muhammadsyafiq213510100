import { getServerSession } from "next-auth";
import { isRoleAllowed } from "@/lib/rbac";
import { authOptions } from "@/lib/auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { buildCashFlow, CashFlowError } from "@/lib/cash-flow";

export const GET = withApiHandler(async (request: Request) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  if (!isRoleAllowed(role, ["OWNER", "ADMIN"])) {
    return apiFail("FORBIDDEN", "Akses ditolak.", 403);
  }
  const url = new URL(request.url);
  try {
    const data = await buildCashFlow({
      dari: url.searchParams.get("dari"),
      sampai: url.searchParams.get("sampai"),
    });
    return apiOk(data);
  } catch (error) {
    if (error instanceof CashFlowError) {
      return apiFail("CASH_FLOW_ERROR", error.message, error.status);
    }
    throw error;
  }
});
