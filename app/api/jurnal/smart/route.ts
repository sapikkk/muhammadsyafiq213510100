import { requireApiRole } from "@/lib/api-auth";
import { apiFail, apiOk, withApiHandler } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createSmartJurnal, SmartJurnalError } from "@/lib/smart-jurnal";

export const POST = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["ADMIN"]);
  if (denied) return denied;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiFail("UNAUTHORIZED", "Belum masuk.", 401);
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const adminOverridePeriod = body.adminOverridePeriod === true;
    const row = await createSmartJurnal(body, Number(session.user.id), {
      adminOverridePeriod,
    });
    return apiOk({ id: row.id, status: row.status, sumber: row.sumber });
  } catch (error) {
    if (error instanceof SmartJurnalError) {
      return apiFail("SMART_JURNAL_ERROR", error.message, error.status);
    }
    throw error;
  }
});
