"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  SalesOrderError,
  confirmSalesOrder,
  createSalesOrderDraft,
  parseSalesOrderInput,
} from "@/lib/sales-order";
import { deliverSalesOrder, shipSalesOrder } from "@/lib/sales-order-delivery";

type FormState = { error?: string; ok?: string };

export async function submitSalesOrder(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Belum masuk." };
  if (session.user.role !== "ADMIN") return { error: "Hanya Admin." };

  try {
    const barisJson = formData.get("barisJson");
    const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
    if (typeof barisJson === "string") {
      raw.baris = JSON.parse(barisJson) as unknown[];
    }
    const input = parseSalesOrderInput(raw);
    const row = await createSalesOrderDraft(Number(session.user.id), input);
    revalidatePath("/admin/penjualan");
    return { ok: `SO ${row.nomor_so} dibuat (DRAFT).` };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    if (err instanceof SyntaxError) return { error: "Format baris pesanan tidak valid." };
    throw err;
  }
}

export async function confirmSalesOrderAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return { error: "Hanya Admin." };

  try {
    const id = Number(formData.get("salesOrderId"));
    if (!Number.isInteger(id) || id <= 0) return { error: "SO tidak valid." };
    const row = await confirmSalesOrder(id);
    revalidatePath("/admin/penjualan");
    return { ok: `${row.nomor_so} dikonfirmasi (CONFIRMED).` };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}

function deliveryRoleOk(role: string | undefined) {
  return role === "ADMIN" || role === "PEKERJA";
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
    if (!Number.isInteger(id) || id <= 0) return { error: "SO tidak valid." };
    const catatan = formData.get("catatan");
    const row = await shipSalesOrder(id, Number(session.user.id), catatan);
    revalidatePath("/admin/penjualan");
    revalidatePath("/petani/pengiriman");
    return { ok: `${row.nomor_so} dikirim (SHIPPED).` };
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
    if (!Number.isInteger(id) || id <= 0) return { error: "SO tidak valid." };
    const catatan = formData.get("catatan");
    const row = await deliverSalesOrder(id, Number(session.user.id), catatan);
    revalidatePath("/admin/penjualan");
    revalidatePath("/petani/pengiriman");
    revalidatePath("/admin/jurnal");
    return {
      ok: `${row.nomor_so} terkirim (DELIVERED). Jurnal #${row.jurnal_pendapatan?.id ?? "?"} menunggu persetujuan.`,
    };
  } catch (err) {
    if (err instanceof SalesOrderError) return { error: err.message };
    throw err;
  }
}
