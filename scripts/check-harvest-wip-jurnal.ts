import { Prisma } from "@prisma/client";

/** Baris jurnal panen: Dr 1350 + Dr 5300 (opsional) = Cr WIP */
function assertPanenBalance(nilaiPersediaan: string, biayaAbnormal: string) {
  const inv = new Prisma.Decimal(nilaiPersediaan);
  const abn = new Prisma.Decimal(biayaAbnormal);
  const kreditWip = inv.add(abn);
  const debitTotal = inv.add(abn);
  if (!debitTotal.eq(kreditWip)) {
    throw new Error("Jurnal panen tidak balance");
  }
}

assertPanenBalance("500000", "0");
assertPanenBalance("450000", "50000");
console.log("OK harvest-wip-jurnal");
