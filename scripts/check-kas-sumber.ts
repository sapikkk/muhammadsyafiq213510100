import { AKUN_KODE } from "../lib/akun-kode";
import { KasSumberError, parseSumberKasKode } from "../lib/kas-sumber";

if (parseSumberKasKode(undefined) !== AKUN_KODE.KAS) {
  throw new Error("default kas");
}
if (parseSumberKasKode("1110") !== AKUN_KODE.BANK) {
  throw new Error("bank");
}
try {
  parseSumberKasKode("9999");
  throw new Error("expected error");
} catch (error) {
  if (!(error instanceof KasSumberError)) throw error;
}
console.log("OK kas-sumber");
