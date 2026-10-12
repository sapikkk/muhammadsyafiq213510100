import "server-only";

import { revalidateTag } from "next/cache";

/** Segarkan cache beranda owner (ringkasan 6 bulan + KPI panen). */
export function revalidateOwnerDashboardCaches() {
  revalidateTag("monthly-summary");
  revalidateTag("kpi-hidroponik");
}
