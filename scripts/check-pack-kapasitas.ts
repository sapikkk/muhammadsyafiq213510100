import assert from "node:assert/strict";
import { kapasitasLubangBenihPack, kapasitasLubangMediaPack } from "../lib/pack-kapasitas-lubang";

assert.equal(kapasitasLubangBenihPack(10, 800), 8000);
assert.equal(kapasitasLubangMediaPack(2, "RW-SLAB-01"), 1440);
console.log("OK pack-kapasitas");
