import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { resolveHppPerLubangUntukOrder } from "../lib/sales-order-hpp";
import { akunPersediaanUntukItemKode, selisihPenyesuaianPackHabis } from "../lib/active-pack-habis-jurnal";

assert.equal(akunPersediaanUntukItemKode("BENIH-SELADA"), "1310");
assert.equal(akunPersediaanUntukItemKode("ROCKWOOL-A"), "1320");

const batch = new Prisma.Decimal("5000");
const rata = new Prisma.Decimal("4800");
assert.ok(resolveHppPerLubangUntukOrder(batch, rata).eq(batch));
assert.ok(resolveHppPerLubangUntukOrder(new Prisma.Decimal(0), rata).eq(rata));

const selisih = selisihPenyesuaianPackHabis(
  new Prisma.Decimal("100000"),
  new Prisma.Decimal("3"),
  new Prisma.Decimal("33333.3333"),
);
assert.ok(selisih.abs().lte(new Prisma.Decimal("0.02")));

console.log("OK varietas-hpp-rata");
