import { requireApiRole } from "@/lib/api-auth";
import { apiOk, withApiHandler } from "@/lib/api-response";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export const GET = withApiHandler(async () => {
  const { denied } = await requireApiRole(["ADMIN", "OWNER", "PEKERJA"]);
  if (denied) return denied;
  const items = await listAlertStokMinimum();
  const serialized = items.map(serializeAlertStok);
  return apiOk({ jumlah: serialized.length, items: serialized });
});
