import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { hitungHppOrderBaris } from "../lib/sales-order-hpp";

const hppLubang = new Prisma.Decimal("1000");
const curah = hitungHppOrderBaris(hppLubang, "CURAH", 10, new Prisma.Decimal("5"));
assert.ok(curah.eq(10000));

const pack = hitungHppOrderBaris(hppLubang, "PACK", 10, new Prisma.Decimal("2"));
assert.ok(pack.gt(10000));

console.log("OK sales-order-hpp");
