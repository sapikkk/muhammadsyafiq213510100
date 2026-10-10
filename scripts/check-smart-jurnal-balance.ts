import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "../lib/akun-kode";
import { buildSmartJurnalBaris, smartJurnalTipe } from "../lib/smart-jurnal";

const nominal = new Prisma.Decimal("100000");

function assertBalance(baris: ReturnType<typeof buildSmartJurnalBaris>) {
  const debit = baris.reduce((s, b) => s.add(b.debit), new Prisma.Decimal(0));
  const kredit = baris.reduce((s, b) => s.add(b.kredit), new Prisma.Decimal(0));
  assert.ok(debit.eq(kredit));
}

const kasMap = new Map([
  [AKUN_KODE.KAS, 1],
  [AKUN_KODE.BANK, 2],
  ["3200", 3],
  ["5230", 4],
  ["3100", 5],
  ["2100", 6],
  ["1500", 7],
  ["5500", 8],
  ["5210", 9],
  ["1510", 10],
]);

for (const tipe of smartJurnalTipe) {
  if (tipe === "TRANSFER_KAS") {
    assertBalance(
      buildSmartJurnalBaris(tipe, nominal, kasMap, AKUN_KODE.KAS, AKUN_KODE.BANK),
    );
  } else if (tipe === "PENYUSUTAN_GREENHOUSE") {
    assertBalance(buildSmartJurnalBaris(tipe, nominal, kasMap, AKUN_KODE.KAS));
  } else if (tipe === "PRIVE") {
    assertBalance(buildSmartJurnalBaris(tipe, nominal, kasMap, AKUN_KODE.KAS));
  } else {
    assertBalance(buildSmartJurnalBaris(tipe, nominal, kasMap, AKUN_KODE.BANK));
  }
}

console.log("OK smart-jurnal-balance");
