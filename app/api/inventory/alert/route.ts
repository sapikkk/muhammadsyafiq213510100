import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { listAlertStokMinimum, serializeAlertStok } from "@/lib/inventaris";

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  if (!["ADMIN", "OWNER", "PEKERJA"].includes(role)) {
    return NextResponse.json({ error: "Peran Anda tidak berhak." }, { status: 403 });
  }

  const items = await listAlertStokMinimum();
  const serialized = items.map(serializeAlertStok);
  return NextResponse.json({
    jumlah: serialized.length,
    items: serialized,
  });
}
