import { requireApiRole } from "@/lib/api-auth";
import { withApiHandler } from "@/lib/api-response";
import type { MonitorKelompokMode } from "@/lib/monitor-kolam-types";
import {
  paginateMonitorAgregat,
  paginateMonitorLogs,
  parseMonitorQueryFromSearchParams,
} from "@/lib/monitor-kolam-query";

export const GET = withApiHandler(async (request: Request) => {
  const { denied } = await requireApiRole(["PEKERJA", "ADMIN", "OWNER"]);
  if (denied) return denied;

  const url = new URL(request.url);
  const defaultEnd = new Date().toISOString().slice(0, 10);
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 90);
  const defaultStart = defaultStartDate.toISOString().slice(0, 10);

  const filter = parseMonitorQueryFromSearchParams(url.searchParams, defaultStart, defaultEnd);
  const tampilan = url.searchParams.get("tampilan") === "rata" ? "rata" : "log";
  const kelompok = (url.searchParams.get("kelompok") || "hari") as MonitorKelompokMode;
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Number(url.searchParams.get("pageSize") || "12");

  if (tampilan === "rata") {
    const result = await paginateMonitorAgregat(filter, kelompok, page, pageSize);
    return Response.json({ tampilan, kelompok, ...result });
  }

  const result = await paginateMonitorLogs(filter, page, pageSize);
  return Response.json({ tampilan: "log", ...result });
});
