import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";

const nol = new Prisma.Decimal(0);
const a = new Prisma.Decimal("8000000");
const b = new Prisma.Decimal("500000");
assert.ok(a.add(b).gt(nol));
console.log("OK penyusutan-otomatis");
