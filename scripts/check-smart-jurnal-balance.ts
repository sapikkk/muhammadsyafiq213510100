import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { buildSmartJurnalBaris } from "../lib/smart-jurnal";

const nominal = new Prisma.Decimal("100000");
const kasId = 1;
const baris = buildSmartJurnalBaris("PRIVE", nominal, kasId, { prive: 2 });
const debit = baris.reduce((s, b) => s.add(b.debit), new Prisma.Decimal(0));
const kredit = baris.reduce((s, b) => s.add(b.kredit), new Prisma.Decimal(0));
assert.ok(debit.eq(kredit));

console.log("OK smart-jurnal-balance");
