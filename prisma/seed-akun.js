// Bagan akun standar UMKM pertanian hidroponik. Kode 4 digit: digit pertama = tipe.
// Akun induk (x000) tidak dipakai untuk jurnal, hanya pengelompokan.
const akunInduk = [
  { kode: "1000", nama: "Aset", tipe: "ASET" },
  { kode: "2000", nama: "Kewajiban", tipe: "KEWAJIBAN" },
  { kode: "3000", nama: "Modal", tipe: "MODAL" },
  { kode: "4000", nama: "Pendapatan", tipe: "PENDAPATAN" },
  { kode: "5000", nama: "Beban", tipe: "BEBAN" },
];

const akunAnak = [
  ["1100", "Kas", "1000"],
  ["1110", "Bank", "1000"],
  ["1200", "Piutang Usaha", "1000"],
  ["1310", "Persediaan Benih", "1000"],
  ["1320", "Persediaan Rockwool", "1000"],
  ["1330", "Persediaan Nutrisi", "1000"],
  ["1340", "Persediaan Kemasan", "1000"],
  ["1350", "Persediaan Sayur Siap Jual", "1000"],
  ["1400", "Sewa Lahan Dibayar di Muka", "1000"],
  ["1500", "Greenhouse", "1000"],
  ["1510", "Akumulasi Depresiasi Greenhouse", "1000"],
  ["1520", "Instalasi Listrik dan Pompa", "1000"],
  ["1530", "Akumulasi Depresiasi Instalasi", "1000"],
  ["2100", "Utang Usaha", "2000"],
  ["2200", "Pinjaman Modal", "2000"],
  ["3100", "Modal Pemilik", "3000"],
  ["3200", "Prive", "3000"],
  ["3300", "Laba Ditahan", "3000"],
  ["4100", "Penjualan Sayur Curah", "4000"],
  ["4200", "Penjualan Sayur Pack", "4000"],
  ["5100", "Harga Pokok Penjualan", "5000"],
  ["5110", "Beban Benih", "5000"],
  ["5120", "Beban Rockwool", "5000"],
  ["5130", "Beban Nutrisi", "5000"],
  ["5140", "Beban Listrik Pompa", "5000"],
  ["5150", "Beban Plastik Packing", "5000"],
  ["5200", "Beban Gaji Petani", "5000"],
  ["5210", "Beban Depresiasi Greenhouse", "5000"],
  ["5220", "Beban Depresiasi Instalasi", "5000"],
  ["5230", "Beban Sewa Lahan", "5000"],
  ["5300", "Kerugian Susut Abnormal", "5000"],
  ["5400", "Beban Penjualan", "5000"],
  ["5500", "Beban Bunga Pinjaman", "5000"],
];

async function seedAkun(prisma) {
  await prisma.akun.createMany({ data: akunInduk, skipDuplicates: true });
  const induk = await prisma.akun.findMany({
    where: { parentId: null },
    select: { id: true, kode: true, tipe: true },
  });
  const byKode = new Map(induk.map((a) => [a.kode, a]));
  await prisma.akun.createMany({
    skipDuplicates: true,
    data: akunAnak.map(([kode, nama, kodeInduk]) => ({
      kode,
      nama,
      tipe: byKode.get(kodeInduk).tipe,
      parentId: byKode.get(kodeInduk).id,
    })),
  });
  return akunInduk.length + akunAnak.length;
}

module.exports = { seedAkun };
