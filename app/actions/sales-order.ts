"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRoleAllowed } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  SalesOrderError,
  confirmSalesOrder,
  createSalesOrderDraft,
  parseSalesOrderInput,
} from "@/lib/sales-order";
import { cancelSalesOrder } from "@/lib/sales-order-cancel";
import { deliverSalesOrder, shipSalesOrder } from "@/lib/sales-order-delivery";
import { recordPackingCost } from "@/lib/sales-order-packing";
import { catatDpSalesOrder, catatPelunasanSalesOrder } from "@/lib/sales-order-pembayaran";
import { statusJurnalLabel } from "@/lib/jurnal-status";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";

type FormState = { error?: string; ok?: string };

function revalidateSalesOrder(id?: number) {
  revalidatePath("/admin/penjualan");
  revalidatePath("/admin/penjualan/baru");
  revalidatePath("/petani/pengiriman");
  if (id) {
    revalidatePath(`/admin/penjualan/${id}`);
    revalidatePath(`/petani/pengiriman/${id}`);
  }
}

export async function submitSalesOrder(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };

  try {
    const barisJson = formData.get("barisJson");
    const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
    if (typeof barisJson === "string") {
      raw.baris = JSON.parse(barisJson) as unknown[];
    }
    const input = parseSalesOrderInput(raw);
    const row = await createSalesOrderDraft(Number(session.user.id), input);
    revalidateSalesOrder(row.id);
    redirect(`/admin/penjualan/${row.id}`);
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    if (err instanceof SyntaxError) return { error: "Format baris pesanan tidak valid." };
    throw err;
  }
}

export async function catatPelunasanSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const row = await catatPelunasanSalesOrder(id, Number(session.user.id), {
      nominal: formData.get("nominal"),
      sumberKas: formData.get("sumberKas"),
    });
    revalidateSalesOrder(id);
    revalidatePath("/admin/jurnal");
    return {
      ok: `Pelunasan ${row.nomor_so} tercatat. Status: ${row.status_pembayaran}.`,
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

export async function catatDpSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const row = await catatDpSalesOrder(id, Number(session.user.id), {
      sumberKas: formData.get("sumberKas"),
    });
    revalidateSalesOrder(id);
    revalidatePath("/admin/jurnal");
    return {
      ok: `DP ${row.nomor_so} tercatat (Dr Kas Cr uang muka). Status pembayaran: DP_DITERIMA.`,
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

export async function confirmSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isRoleAllowed(session.user.role, "ADMIN")) {
    return { error: "Hanya Admin." };
  }

  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const row = await confirmSalesOrder(id, Number(session.user.id));
    revalidateSalesOrder(id);
    return { ok: `${row.nomor_so} ${labelSalesOrderStatus("CONFIRMED").toLowerCase()}.` };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

function deliveryRoleOk(role: string | undefined) {
  return isRoleAllowed(role, ["ADMIN", "PEKERJA"]);
}

export async function shipSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !deliveryRoleOk(session.user.role)) {
    return { error: "Akses ditolak." };
  }
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const catatan = formData.get("catatan");
    const row = await shipSalesOrder(id, Number(session.user.id), catatan);
    revalidateSalesOrder(id);
    return { ok: `${row.nomor_so} ${labelSalesOrderStatus("SHIPPED").toLowerCase()}.` };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

export async function deliverSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !deliveryRoleOk(session.user.role)) {
    return { error: "Akses ditolak." };
  }
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const catatan = formData.get("catatan");
    const row = await deliverSalesOrder(id, Number(session.user.id), {
      catatan,
      sumberKas: formData.get("sumberKas"),
      uangDiterima: formData.get("uangDiterima"),
    });
    revalidateSalesOrder(id);
    revalidatePath("/admin/jurnal");
    return {
      ok: `${row.nomor_so} ${labelSalesOrderStatus("DELIVERED").toLowerCase()}. Catatan keuangan #${row.jurnal_pendapatan?.id ?? "?"} menunggu persetujuan.`,
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

export async function recordPackingCostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const row = await recordPackingCost(
      id,
      Number(session.user.id),
      formData.get("biayaPacking"),
      { sumberKas: formData.get("sumberKas") },
    );
    revalidateSalesOrder(id);
    const jId = row.jurnal_packing?.id;
    return {
      ok: jId
        ? `Biaya packing tercatat. Jurnal #${jId} menunggu persetujuan.`
        : "Biaya packing diperbarui.",
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

export async function cancelSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (!isRoleAllowed(session.user.role, "ADMIN")) return { error: "Hanya Admin." };
  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "Pesanan tidak valid." };
    const row = await cancelSalesOrder(id, Number(session.user.id), formData.get("alasan"));
    revalidateSalesOrder(id);
    revalidatePath("/admin/jurnal");
    const rev = row.jurnal_reversal?.id;
    return {
      ok: rev
        ? `${row.nomor_so} dibatalkan. Catatan pembalik #${rev} (${statusJurnalLabel.PENDING.toLowerCase()} persetujuan).`
        : `${row.nomor_so} dibatalkan.`,
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}
