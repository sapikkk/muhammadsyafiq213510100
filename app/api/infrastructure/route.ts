import { requireApiRole } from "@/lib/api-auth";
import { apiOk, withApiHandler } from "@/lib/api-response";
import { listInfrastrukturPohon, serializeInfrastruktur } from "@/lib/infrastruktur";

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER"]);
  if (denied) return denied;
  const pohon = await listInfrastrukturPohon();
  return apiOk(serializeInfrastruktur(pohon));
});
