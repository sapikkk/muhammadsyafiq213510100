/* eslint-disable no-console -- self-check script */
import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { splitPenerimaanPenjualan } from "./sales-order-penerimaan";
import { selaraskanPendapatanJurnal } from "./sales-order-jurnal-pendapatan";

const d = (n: number) => new Prisma.Decimal(n);

assert.deepEqual(
  splitPenerimaanPenjualan(d(100_000), d(0), d(100_000)),
  { kas: d(100_000), piutang: d(0) },
);

assert.deepEqual(
  splitPenerimaanPenjualan(d(100_000), d(0), d(40_000)),
  { kas: d(40_000), piutang: d(60_000) },
);

assert.deepEqual(
  splitPenerimaanPenjualan(d(100_000), d(20_000), d(30_000)),
  { kas: d(30_000), piutang: d(50_000) },
);

const s = selaraskanPendapatanJurnal(d(100), d(33.33), d(33.33));
assert.equal(s.curah.add(s.pack).toString(), "100");

console.log("OK sales-order-delivery-split");
