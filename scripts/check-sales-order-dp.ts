import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { parseJumlahDp } from "../lib/sales-order-pembayaran";

assert.ok(parseJumlahDp("").eq(0));
assert.ok(parseJumlahDp("150000.50").eq(new Prisma.Decimal("150000.50")));

let threw = false;
try {
  parseJumlahDp("-1");
} catch {
  threw = true;
}
assert.ok(threw, "negatif harus error");

console.log("OK sales-order-dp");
