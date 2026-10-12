import "server-only";

import { prisma } from "@/lib/prisma";
import { roleLabel, type Role } from "@/types/role";

export async function labelPelaku(userId?: number | null): Promise<string | null> {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { nama: true, role: true },
  });
  if (!user) return null;
  const peran = roleLabel[user.role as Role] ?? user.role;
  return `${peran} ${user.nama}`;
}

/** Kalimat aktivitas: siapa melakukan apa (untuk notifikasi antar user). */
export function pesanAktivitas(pelaku: string | null, detail: string): string {
  const isi = detail.trim();
  if (!pelaku) return isi;
  return `${pelaku} — ${isi}`;
}
