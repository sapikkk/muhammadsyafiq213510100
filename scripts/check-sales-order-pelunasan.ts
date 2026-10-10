import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { sisaPiutangSo } from "../lib/sales-order-pembayaran";

const sisa = sisaPiutangSo({
  total: new Prisma.Decimal("1000000"),
  jumlah_dp: new Prisma.Decimal("200000"),
  jumlah_pelunasan: new Prisma.Decimal("300000"),
});
assert.ok(sisa.eq(500000));

console.log("OK sales-order-pelunasan");
