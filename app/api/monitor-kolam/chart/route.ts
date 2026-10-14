import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import {
  monitorBandingKolam,
  monitorChartHarian,
  parseMonitorQueryFromSearchParams,
} from "@/lib/monitor-kolam-query";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["PEKERJA", "ADMIN", "OWNER"]);
  if (denied) return denied;

  const url = new URL(request.url);
  const defaultEnd = new Date().toISOString().slice(0, 10);
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 30);
  const defaultStart = defaultStartDate.toISOString().slice(0, 10);

  const filter = parseMonitorQueryFromSearchParams(url.searchParams, defaultStart, defaultEnd);

  const [harian, bandingKolam] = await Promise.all([
    monitorChartHarian(filter, 21),
    monitorBandingKolam(filter, 10),
  ]);

  return Response.json({ harian, bandingKolam });
});
