import "server-only";

import {
  kirimNotifikasiPeran,
  kirimNotifikasiUser,
  type NotifikasiPayload,
} from "@/lib/notifikasi";
import { labelPelaku, pesanAktivitas } from "@/lib/notifikasi-pelaku";
import { prisma } from "@/lib/prisma";

export const NotifJenis = {
  PASSWORD_RESET_PENDING: "PASSWORD_RESET_PENDING",
  PASSWORD_RESET_APPROVED: "PASSWORD_RESET_APPROVED",
  PASSWORD_RESET_REJECTED: "PASSWORD_RESET_REJECTED",
  HARVEST_PENDING: "HARVEST_PENDING",
  HARVEST_APPROVED: "HARVEST_APPROVED",
  HARVEST_REJECTED: "HARVEST_REJECTED",
  JURNAL_PENDING: "JURNAL_PENDING",
  JURNAL_APPROVED: "JURNAL_APPROVED",
  JURNAL_REJECTED: "JURNAL_REJECTED",
  KEGAGALAN_BARU: "KEGAGALAN_BARU",
  STOK_RENDAH: "STOK_RENDAH",
  PETANI_BARU: "PETANI_BARU",
  SALES_ORDER_DRAFT: "SALES_ORDER_DRAFT",
  SALES_ORDER_CONFIRMED: "SALES_ORDER_CONFIRMED",
  AKUN_BARU: "AKUN_BARU",
  SANDI_DIRESET_OWNER: "SANDI_DIRESET_OWNER",
  SIKLUS_ABORT: "SIKLUS_ABORT",
} as const;

async function toAdmin(
  payload: NotifikasiPayload,
  opts?: { excludeUserId?: number; dedupeUnread?: boolean },
) {
  await kirimNotifikasiPeran(["ADMIN"], payload, opts);
}

async function toOwner(
  payload: NotifikasiPayload,
  opts?: { excludeUserId?: number; dedupeUnread?: boolean },
) {
  await kirimNotifikasiPeran(["OWNER"], payload, opts);
}

export async function emitPasswordResetPending(requestId: number, nama: string) {
  await toAdmin({
    jenis: NotifJenis.PASSWORD_RESET_PENDING,
    judul: "Permintaan reset sandi",
    pesan: `${nama} meminta reset sandi.`,
    href: "/admin#reset-sandi",
    entitas: "PasswordResetRequest",
    entitasId: requestId,
  });
}

export async function emitPasswordResetApproved(userId: number) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.PASSWORD_RESET_APPROVED,
    judul: "Reset sandi disetujui",
    pesan: "Admin menyetujui reset sandi. Masuk dengan sandi sementara, lalu ganti sandi.",
    href: "/ganti-sandi",
  });
}

export async function emitPasswordResetRejected(userId: number) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.PASSWORD_RESET_REJECTED,
    judul: "Reset sandi ditolak",
    pesan: "Permintaan reset sandi ditolak Admin. Hubungi Admin jika masih perlu bantuan.",
    href: "/pengaturan",
  });
}

export async function emitHarvestPending(
  laporanId: number,
  lokasiTanam: string,
  petaniNama: string,
) {
  await toAdmin({
    jenis: NotifJenis.HARVEST_PENDING,
    judul: "Laporan panen perlu ditinjau",
    pesan: pesanAktivitas(`Petani ${petaniNama}`, `mengirim laporan panen (${lokasiTanam}).`),
    href: `/admin/harvest/${laporanId}`,
    entitas: "Laporan_Panen",
    entitasId: laporanId,
  });
  await toOwner({
    jenis: NotifJenis.HARVEST_PENDING,
    judul: "Panen menunggu tinjauan Admin",
    pesan: pesanAktivitas(`Petani ${petaniNama}`, `mengirim laporan panen (${lokasiTanam}).`),
    href: `/owner/produksi`,
    entitas: "Laporan_Panen",
    entitasId: laporanId,
  });
}

export async function emitHarvestApproved(
  userId: number,
  lokasiTanam: string,
  laporanId: number,
  siklusId: number,
) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.HARVEST_APPROVED,
    judul: "Panen disetujui",
    pesan: `Panen ${lokasiTanam} disetujui. Biaya produksi (HPP) sudah dihitung.`,
    href: `/petani/siklus/${siklusId}`,
    entitas: "Laporan_Panen",
    entitasId: laporanId,
  });
}

export async function emitHarvestRejected(
  userId: number,
  lokasiTanam: string,
  laporanId: number,
  alasan: string,
  siklusId: number,
) {
  const ringkas = alasan.trim().slice(0, 120);
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.HARVEST_REJECTED,
    judul: "Panen ditolak",
    pesan: `Panen ${lokasiTanam} ditolak: ${ringkas}`,
    href: `/petani/siklus/${siklusId}`,
    entitas: "Laporan_Panen",
    entitasId: laporanId,
  });
}

export async function emitJurnalPending(jurnalId: number, keterangan: string, olehId?: number) {
  await toAdmin(
    {
      jenis: NotifJenis.JURNAL_PENDING,
      judul: "Catatan keuangan menunggu persetujuan",
      pesan: keterangan.slice(0, 200),
      href: `/admin/jurnal/${jurnalId}`,
      entitas: "Jurnal",
      entitasId: jurnalId,
    },
    { excludeUserId: olehId, dedupeUnread: true },
  );
}

async function hrefJurnalUntukUser(userId: number, jurnalId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (user?.role === "OWNER") return `/owner/jurnal/${jurnalId}`;
  if (user?.role === "ADMIN") return `/admin/jurnal/${jurnalId}`;
  return `/pengaturan`;
}

export async function emitJurnalApproved(userId: number, jurnalId: number, keterangan: string) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.JURNAL_APPROVED,
    judul: "Catatan keuangan disetujui",
    pesan: keterangan.slice(0, 200),
    href: await hrefJurnalUntukUser(userId, jurnalId),
    entitas: "Jurnal",
    entitasId: jurnalId,
  });
}

export async function emitJurnalRejected(userId: number, jurnalId: number, keterangan: string) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.JURNAL_REJECTED,
    judul: "Catatan keuangan ditolak",
    pesan: keterangan.slice(0, 200),
    href: await hrefJurnalUntukUser(userId, jurnalId),
    entitas: "Jurnal",
    entitasId: jurnalId,
  });
}

export async function emitKegagalanBaru(logId: number, lokasiTanam: string, tahapLabel: string) {
  await toAdmin({
    jenis: NotifJenis.KEGAGALAN_BARU,
    judul: "Catatan kegagalan baru",
    pesan: `${lokasiTanam}: ${tahapLabel}. Perlu klasifikasi susut.`,
    href: `/admin/susut#log-kegagalan-${logId}`,
    entitas: "Log_Kegagalan",
    entitasId: logId,
  });
}

export async function emitStokRendah(itemId: number, _kode: string, nama: string) {
  const detail = `Stok ${nama} sudah di bawah minimum. Perlu isi ulang.`;
  const payload = {
    jenis: NotifJenis.STOK_RENDAH,
    judul: "Stok di bawah minimum",
    pesan: detail,
    entitas: "ItemInventaris",
    entitasId: itemId,
  } satisfies Omit<NotifikasiPayload, "href">;
  await toAdmin(
    { ...payload, href: `/admin/inventaris/${itemId}` },
    { dedupeUnread: true },
  );
  await toOwner(
    { ...payload, href: `/owner/inventaris/${itemId}` },
    { dedupeUnread: true },
  );
}

export async function emitPetaniBaru(
  userId: number,
  nama: string,
  email: string,
  olehId?: number,
) {
  const pelaku = await labelPelaku(olehId);
  await toOwner({
    jenis: NotifJenis.PETANI_BARU,
    judul: "Petani baru ditambahkan",
    pesan: pesanAktivitas(pelaku, `mendaftarkan petani ${nama} (${email}).`),
    href: `/pengaturan?bagian=tim&tim=pengguna&user=${userId}`,
    entitas: "User",
    entitasId: userId,
  });
}

export async function emitSalesOrderDraft(soId: number, nomor: string, olehId?: number) {
  const pelaku = await labelPelaku(olehId);
  await toAdmin(
    {
      jenis: NotifJenis.SALES_ORDER_DRAFT,
      judul: "Pesanan jual sementara",
      pesan: pesanAktivitas(pelaku, `membuat ${nomor}. Perlu konfirmasi stok.`),
      href: `/admin/penjualan/${soId}`,
      entitas: "Sales_Order",
      entitasId: soId,
    },
    { excludeUserId: olehId, dedupeUnread: true },
  );
}

export async function emitSalesOrderConfirmed(
  soId: number,
  nomor: string,
  olehId?: number,
) {
  const pelaku = await labelPelaku(olehId);
  await toOwner({
    jenis: NotifJenis.SALES_ORDER_CONFIRMED,
    judul: "Pesanan jual dikonfirmasi",
    pesan: pesanAktivitas(pelaku, `mengonfirmasi ${nomor}.`),
    href: `/owner/penjualan/${soId}`,
    entitas: "Sales_Order",
    entitasId: soId,
  });
}

export async function emitAkunBaru(userId: number, roleLabel: string) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.AKUN_BARU,
    judul: "Akun Kokonus Farm",
    pesan: `Owner membuat akun ${roleLabel} untuk Anda. Masuk dan ganti sandi awal.`,
    href: "/ganti-sandi",
    entitas: "User",
    entitasId: userId,
  });
}

export async function emitSandiResetOwner(userId: number) {
  await kirimNotifikasiUser(userId, {
    jenis: NotifJenis.SANDI_DIRESET_OWNER,
    judul: "Sandi direset Owner",
    pesan: "Sandi akun direset. Masuk dengan sandi baru dari Owner, lalu ganti sandi.",
    href: "/ganti-sandi",
  });
}

export async function emitSiklusAbort(
  petaniUserId: number,
  lokasiTanam: string,
  siklusId: number,
  alasan: string,
) {
  await kirimNotifikasiUser(petaniUserId, {
    jenis: NotifJenis.SIKLUS_ABORT,
    judul: "Siklus tanam dibatalkan",
    pesan: `Siklus ${lokasiTanam} gagal total: ${alasan.slice(0, 120)}`,
    href: `/petani/siklus/${siklusId}`,
    entitas: "Siklus_Produksi",
    entitasId: siklusId,
  });
}
