/* eslint-disable no-console -- self-check script */
import assert from "node:assert/strict";
import { tindakanDariBacaanAir } from "./air-kolam-tindakan";
import { lubangDariSemaiSingkat, parseBaki, parseKisaranSemai } from "./petani-semai-angka";

assert.equal(parseBaki("12"), 12);
assert.deepEqual(parseKisaranSemai("800-1000"), { min: 800, max: 1000, tengah: 900 });
assert.equal(parseKisaranSemai("800").tengah, 800);
assert.equal(lubangDariSemaiSingkat({ baki: 10, kisaranTengah: 400, kapasitasKolam: 480 }), 400);

const aman = tindakanDariBacaanAir({ ph: 6.0, ppm: 900, suhuC: 24 });
assert.equal(aman.tingkat, "aman");

const asam = tindakanDariBacaanAir({ ph: 5.0, ppm: 900, suhuC: 24 });
assert.equal(asam.tingkat, "bahaya");
assert.match(asam.langkah[0] ?? "", /pH rendah/);

console.log("OK air-kolam-tindakan");
