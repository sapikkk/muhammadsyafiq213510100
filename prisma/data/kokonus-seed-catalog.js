/** Varietas & inventaris — pakcoy (10) + selada Grand Rapids, Jonction RZ, Sementel. */

function mid(a, b) {
  return Math.round((a + b) / 2);
}

/** @returns {import('@prisma/client').Prisma.VarietasCreateManyInput[]} */
function buildVarietasRows() {
  const pakcoy = [
    { nama: "Pakcoy Nauli F1 (Cap Panah Merah)", packRp: mid(25000, 35000), gram: 10, biji: mid(3000, 4000) },
    { nama: "Pakcoy Naura F1 (Cap Panah Merah)", packRp: mid(30000, 40000), gram: 10, biji: mid(3000, 4000) },
    { nama: "Pakcoy Ching Chiang (Known-You)", packRp: mid(25500, 37000), gram: 10, biji: mid(3500, 4000) },
    { nama: "Pakcoy Oprah (Known-You)", packRp: mid(15000, 23000), gram: null, biji: 200 },
    { nama: "Pakcoy Coyo (Garuda Seed)", packRp: mid(20000, 28000), gram: 10, biji: mid(1700, 2000) },
    { nama: "Pakcoy Green (Bintang Asia)", packRp: mid(15000, 25000), gram: 10, biji: mid(3500, 4000) },
    { nama: "Pakcoy Larisa (Ta Fung)", packRp: mid(60000, 65000), gram: 10, biji: 4200 },
    { nama: "Pakcoy White (Cap Bunga Matahari)", packRp: mid(20000, 30000), gram: 10, biji: mid(3500, 4000) },
    { nama: "Pakcoy Nai Bai Mini (Known-You)", packRp: mid(40000, 50000), gram: 10, biji: mid(4000, 4500) },
    { nama: "Pakcoy Green (Takii)", packRp: mid(50000, 70000), gram: 20, biji: mid(7000, 8000) },
  ].map((p) => {
    const gramPack = p.gram ?? 10;
    const bijiPerGram = (p.biji / gramPack).toFixed(2);
    const hargaBenihPerGram = (p.packRp / gramPack).toFixed(2);
    return {
      nama: p.nama,
      harga_benih_per_gram: hargaBenihPerGram,
      biji_per_gram: bijiPerGram,
      daya_kecambah: "88.00",
      lama_semai: 6,
      lama_di_kolam: 25,
      berat_rata_rata_panen: "90.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "20000.00",
      harga_jual_pack: "8000.00",
      status: "AKTIF",
    };
  });

  const selada = [
    {
      nama: "Selada Grand Rapids (Cap Panah Merah)",
      packRp: mid(25000, 35000),
      gram: 15,
      biji: 10000,
      lama_semai: 7,
      lama_kolam: 28,
      berat: "125.000",
    },
    {
      nama: "Selada Jonction (Rijk Zwaan)",
      packRp: mid(450000, 490000),
      gram: null,
      biji: 1000,
      lama_semai: 7,
      lama_kolam: 30,
      berat: "150.000",
    },
    {
      nama: "Selada Sementel (Bejo Seed)",
      packRp: mid(85000, 95000),
      gram: null,
      biji: 100,
      lama_semai: 7,
      lama_kolam: 28,
      berat: "110.000",
    },
  ].map((s) => {
    const gramPack = s.gram ?? 1;
    const bijiPerGram = (s.biji / gramPack).toFixed(2);
    const hargaBenihPerGram = (s.packRp / gramPack).toFixed(2);
    return {
      nama: s.nama,
      harga_benih_per_gram: hargaBenihPerGram,
      biji_per_gram: bijiPerGram,
      daya_kecambah: "90.00",
      lama_semai: s.lama_semai,
      lama_di_kolam: s.lama_kolam,
      berat_rata_rata_panen: s.berat,
      berat_per_pack: "200.000",
      harga_jual_curah: "40000.00",
      harga_jual_pack: "12000.00",
      status: "AKTIF",
    };
  });

  return [...pakcoy, ...selada];
}

const INVENTARIS = [
  {
    kode: "RW-CULTI",
    nama: "Rockwool Cultilene OptimaXX (slab)",
    satuan: "PCS",
    stokSaatIni: "96.000",
    stokMinimum: "16.000",
  },
  {
    kode: "NUT-AB-80",
    nama: "Nutrisi AB mix pekatan (set A+B isi 80 L)",
    satuan: "LITER",
    stokSaatIni: "240.000",
    stokMinimum: "80.000",
  },
  {
    kode: "BNH-PKCY-NAU",
    nama: "Benih pakcoy Nauli F1 (Cap Panah Merah)",
    satuan: "GRAM",
    stokSaatIni: "500.000",
    stokMinimum: "50.000",
  },
  {
    kode: "BNH-SLD-GR",
    nama: "Benih selada Grand Rapids (Cap Panah Merah)",
    satuan: "GRAM",
    stokSaatIni: "400.000",
    stokMinimum: "40.000",
  },
  {
    kode: "BNH-SLD-JON",
    nama: "Benih selada Jonction (Rijk Zwaan)",
    satuan: "GRAM",
    stokSaatIni: "50.000",
    stokMinimum: "5.000",
  },
  {
    kode: "BNH-SLD-SEM",
    nama: "Benih selada Sementel (Bejo)",
    satuan: "GRAM",
    stokSaatIni: "30.000",
    stokMinimum: "3.000",
  },
];

const LISTRIK_BULAN = "500000.00";
const FLOW_PREFIX = "FLOW-";
const SO_PREFIX = "SO-FLOW-";

module.exports = {
  buildVarietasRows,
  INVENTARIS,
  LISTRIK_BULAN,
  FLOW_PREFIX,
  SO_PREFIX,
};
