import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireExportRole(allowed: ("ADMIN" | "OWNER")[]) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role || !allowed.includes(role as "ADMIN" | "OWNER")) {
    return null;
  }
  return session;
}

export function parsePeriodParams(url: URL) {
  const dari = url.searchParams.get("dari")?.trim() ?? "";
  const sampai = url.searchParams.get("sampai")?.trim() ?? "";
  const now = new Date();
  const def = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const dariOk = /^\d{4}-\d{2}$/.test(dari) ? dari : def;
  const sampaiOk = /^\d{4}-\d{2}$/.test(sampai) ? sampai : def;
  const [y1, m1] = dariOk.split("-").map(Number);
  const [y2, m2] = sampaiOk.split("-").map(Number);
  const start = new Date(y1, m1 - 1, 1);
  const end = new Date(y2, m2, 0);
  return { dari: dariOk, sampai: sampaiOk, start, end };
}
