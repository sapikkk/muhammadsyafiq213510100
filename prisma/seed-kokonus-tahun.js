/**
 * Seed 1 tahun — pakcoy + selada (Grand Rapids, Jonction, Sementel), 1 GH + 6 kolam.
 * Alur: semai → sprout → tambal → pindah kolam → pendewasaan → panen (layak/tidak layak),
 * log kegagalan, monitor PPM/pH, susut, penjualan (lunas / cicil / konsinyasi).
 *
 * npm run seed:kokonus-tahun
 * Butuh COA + user demo (jalankan seed:demo-lengkap sekali, atau user admin@kokonus.farm).
 */
const { PrismaClient, Prisma } = require("@prisma/client");
const { hash } = require("bcryptjs");
const { seedAkun } = require("./seed-akun");
const {
  buildVarietasRows,
  INVENTARIS,
  LISTRIK_BULAN,
  FLOW_PREFIX,
  SO_PREFIX,
} = require("./data/kokonus-seed-catalog");
const { seedSiklusAktifDanMenunggu } = require("./seed-siklus-aktif");
const { seedPetani } = require("./seed-petani");

const prisma = new PrismaClient();
const DEMO_PASSWORD = "KokonusDemo2026";

/** @param {number} seed */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function addDays(d, n) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

function dateOnly(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function pick(r, arr) {
  return arr[Math.floor(r() * arr.length)];
}

function intBetween(r, lo, hi) {
  return lo + Math.floor(r() * (hi - lo + 1));
}

async function ensureUsers() {
  const passwordHash = await hash(DEMO_PASSWORD, 10);
  const accounts = [
    { nama: "Koko Nuswantoro", email: "owner@kokonus.farm", role: "OWNER" },
    { nama: "Admin pembukuan", email: "admin@kokonus.farm", role: "ADMIN" },
    { nama: "Marzuki", email: "petani@kokonus.farm", role: "PEKERJA" },
  ];
  for (const a of accounts) {
    await prisma.user.upsert({
      where: { email: a.email },
      update: { nama: a.nama, role: a.role, passwordHash, aktif: true },
      create: { ...a, passwordHash, aktif: true },
    });
  }
  const petani = await prisma.user.findUnique({ where: { email: "petani@kokonus.farm" } });
  const admin = await prisma.user.findUnique({ where: { email: "admin@kokonus.farm" } });
  if (!petani || !admin) throw new Error("User demo gagal dibuat.");
  return { petaniId: petani.id, adminId: admin.id };
}

async function wipeFlowData() {
  const sos = await prisma.sales_Order.findMany({
    where: { nomor_so: { startsWith: SO_PREFIX } },
    select: { id: true },
  });
  if (sos.length) {
    await prisma.sales_Order_Baris.deleteMany({
      where: { sales_order_id: { in: sos.map((s) => s.id) } },
    });
    await prisma.sales_Order.deleteMany({ where: { id: { in: sos.map((s) => s.id) } } });
  }

  const siklus = await prisma.siklus_Produksi.findMany({
    where: { kode_batch: { startsWith: FLOW_PREFIX } },
    select: { id: true },
  });
  const ids = siklus.map((s) => s.id);
  if (!ids.length) return 0;

  await prisma.hPP.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.laporan_Panen.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.log_Kegagalan.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.log_Monitor_Kolam.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.log_Produksi.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.biaya_Langsung.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.sales_Order_Baris.deleteMany({ where: { siklus_id: { in: ids } } });
  await prisma.siklus_Produksi.deleteMany({ where: { id: { in: ids } } });
  return ids.length;
}

async function ensureInfra() {
  let lahan = await prisma.lahan.findFirst();
  if (!lahan) {
    lahan = await prisma.lahan.create({
      data: {
        nilai_sewa: "120000000.00",
        masa_sewa: 60,
        amortisasi_per_bulan: "2000000.00",
        biaya_listrik_bulan: LISTRIK_BULAN,
      },
    });
  } else {
    await prisma.lahan.update({
      where: { id: lahan.id },
      data: { biaya_listrik_bulan: LISTRIK_BULAN },
    });
  }

  let gh = await prisma.greenhouse.findFirst({ where: { lahan_id: lahan.id } });
  if (!gh) {
    gh = await prisma.greenhouse.create({
      data: {
        lahan_id: lahan.id,
        nama: "Greenhouse Kokonus",
        nilai_investasi: "960000000.00",
        umur_ekonomis: 120,
        depresiasi_per_bulan: "8000000.00",
      },
    });
  }

  const kolamNames = ["Kolam 1", "Kolam 2", "Kolam 3", "Kolam 4", "Kolam 5", "Kolam 6"];
  const kolams = [];
  for (const nama of kolamNames) {
    let row = await prisma.kolam.findFirst({ where: { greenhouse_id: gh.id, nama } });
    if (!row) {
      row = await prisma.kolam.create({
        data: {
          greenhouse_id: gh.id,
          nama,
          kapasitas_lubang: 400,
          status: "MENGANGGUR",
        },
      });
    } else {
      await prisma.kolam.update({
        where: { id: row.id },
        data: { kapasitas_lubang: 400 },
      });
    }
    kolams.push(row);
  }

  return { lahan, gh, kolams };
}

async function seedCatalog() {
  const names = buildVarietasRows().map((v) => v.nama);
  await prisma.varietas.updateMany({
    where: { nama: { notIn: names } },
    data: { status: "NONAKTIF" },
  });

  const varietasByName = {};
  for (const data of buildVarietasRows()) {
    const existing = await prisma.varietas.findFirst({ where: { nama: data.nama } });
    const row = existing
      ? await prisma.varietas.update({ where: { id: existing.id }, data })
      : await prisma.varietas.create({ data });
    varietasByName[data.nama] = row;
  }

  for (const row of INVENTARIS) {
    await prisma.itemInventaris.upsert({
      where: { kode: row.kode },
      update: {
        nama: row.nama,
        satuan: row.satuan,
        stokSaatIni: row.stokSaatIni,
        stokMinimum: row.stokMinimum,
        aktif: true,
      },
      create: { ...row, aktif: true },
    });
  }

  return varietasByName;
}

function isPakcoy(nama) {
  return nama.toLowerCase().includes("pakcoy");
}

function benihGramPerTanam(r, varietas) {
  return isPakcoy(varietas.nama) ? intBetween(r, 8, 15) / 10 : intBetween(r, 3, 8) / 10;
}

/**
 * @param {{ varietasByName: Record<string, any>, kolams: any[], petaniId: number, adminId: number }} ctx
 */
async function seedSiklusTahun(ctx) {
  const { varietasByName, kolams, petaniId, adminId } = ctx;
  const varietasList = Object.values(varietasByName);
  const r = rng(20261013);
  const yearStart = dateOnly(new Date(Date.UTC(2025, 0, 15)));
  const yearEnd = dateOnly(new Date(Date.UTC(2026, 2, 1)));
  const cycleWeeks = 9;
  const created = [];

  for (let k = 0; k < kolams.length; k++) {
    const kolam = kolams[k];
    let cursor = addDays(yearStart, k * 5);
    let seq = 1;

    while (cursor < yearEnd) {
      const varietas = pick(r, varietasList);
      const gagalTotal = r() < 0.06;
      const kode = `${FLOW_PREFIX}${cursor.getUTCFullYear()}-K${k + 1}-${String(seq).padStart(2, "0")}`;
      seq += 1;

      const jumlahDisemai = intBetween(r, 280, 380);
      const susutAwal = intBetween(r, 12, 45);
      const tambalBibit = r() < 0.22 ? intBetween(r, 8, 28) : 0;
      const susutExtra = intBetween(r, 5, 35);
      const totalSusut = Math.min(jumlahDisemai - 40, susutAwal + susutExtra);
      const layak = jumlahDisemai - totalSusut + tambalBibit;

      const lamaSemai = varietas.lama_semai;
      const lamaKolam = varietas.lama_di_kolam;
      const dSprout = lamaSemai;
      const dTambal = dSprout + 2;
      const dPindah = dSprout + 4;
      const dPendew = dPindah + 3;
      const dPanen = lamaSemai + lamaKolam;

      const tanggalSemai = dateOnly(cursor);
      const tanggalPindah = dateOnly(addDays(tanggalSemai, dPindah));
      const tanggalPanen = dateOnly(addDays(tanggalSemai, dPanen));

      const listrikBulan = new Prisma.Decimal(LISTRIK_BULAN);
      const listrikKolam = listrikBulan.div(6).mul(dPanen / 30);

      const biayaBenih = new Prisma.Decimal(benihGramPerTanam(r, varietas).toFixed(2)).mul(
        new Prisma.Decimal(varietas.harga_benih_per_gram),
      );
      const biayaRw = new Prisma.Decimal(intBetween(r, 45000, 85000));
      const biayaNut = new Prisma.Decimal(intBetween(r, 35000, 70000));

      const statusAkhir = gagalTotal ? "GAGAL_TOTAL" : "SELESAI";

      const siklus = await prisma.siklus_Produksi.create({
        data: {
          kode_batch: kode,
          varietas_id: varietas.id,
          kolam_id: kolam.id,
          tanggal_semai: tanggalSemai,
          tanggal_pindah_kolam: gagalTotal ? null : tanggalPindah,
          tanggal_panen: gagalTotal ? null : tanggalPanen,
          jumlah_disemai: jumlahDisemai,
          total_susut: gagalTotal ? jumlahDisemai : totalSusut,
          jumlah_layak_jual: gagalTotal ? 0 : layak,
          status: gagalTotal ? "GAGAL_TOTAL" : "SELESAI",
          biaya_langsung: {
            create: {
              biaya_benih: biayaBenih.add(tambalBibit > 0 ? biayaBenih.mul(0.15) : 0).toFixed(2),
              biaya_rockwool: biayaRw.toFixed(2),
              biaya_nutrisi: biayaNut.toFixed(2),
              biaya_listrik_pompa: listrikKolam.toFixed(2),
              subtotal: biayaBenih
                .add(biayaRw)
                .add(biayaNut)
                .add(listrikKolam)
                .add(tambalBibit > 0 ? biayaBenih.mul(0.15) : 0)
                .toFixed(2),
            },
          },
        },
      });

      const logs = [
        { dari: "SEMAI", ke: "SPROUT_DAUN", day: dSprout, catatan: "Daun ke-4 terbentuk" },
        { dari: "SPROUT_DAUN", ke: "TAMBAL", day: dTambal, catatan: tambalBibit ? `Tambal: ${tambalBibit} bibit` : "Cek kerapatan" },
        { dari: "TAMBAL", ke: "PINDAH_KOLAM", day: dPindah, catatan: "Pindah ke kolam hidroponik" },
        { dari: "PINDAH_KOLAM", ke: "PENDEWASAAN", day: dPendew, catatan: "Adaptasi air kolam" },
      ];

      if (!gagalTotal) {
        logs.push({ dari: "PENDEWASAAN", ke: "PANEN", day: dPanen, catatan: "Sortasi layak jual" });
        logs.push({ dari: "PANEN", ke: "SELESAI", day: dPanen + 1, catatan: "Panen disetujui admin" });
      } else {
        logs.push({
          dari: "SPROUT_DAUN",
          ke: "GAGAL_TOTAL",
          day: dSprout + 3,
          catatan: "Serangan jamur — batch dibatalkan",
        });
      }

      for (const lg of logs) {
        if (gagalTotal && lg.ke !== "GAGAL_TOTAL" && lg.day > dSprout + 3) continue;
        await prisma.log_Produksi.create({
          data: {
            siklus_id: siklus.id,
            fase_dari: lg.dari,
            fase_ke: lg.ke,
            catatan: lg.catatan,
            userId: petaniId,
            waktu: addDays(tanggalSemai, lg.day),
          },
        });
      }

      if (!gagalTotal) {
        for (let day = dSprout; day < dPanen; day += 4) {
          await prisma.log_Monitor_Kolam.create({
            data: {
              kolam_id: kolam.id,
              siklus_id: siklus.id,
              ppm: (850 + r() * 350).toFixed(2),
              ph: (5.5 + r() * 0.8).toFixed(2),
              suhu_c: (22 + r() * 6).toFixed(2),
              userId: petaniId,
              waktu: addDays(tanggalSemai, day),
            },
          });
        }

        if (r() < 0.18) {
          await prisma.log_Kegagalan.create({
            data: {
              siklus_id: siklus.id,
              tahap: pick(r, ["SEMAI", "SPROUT_DAUN", "PINDAH_KOLAM", "PENDEWASAAN", "PANEN_SORTASI"]),
              jumlah_gagal: intBetween(r, 5, 25),
              hari_hidup: intBetween(r, 4, dPanen),
              penyebab: pick(r, [
                "Biji tidak serempak — susut normal",
                "Daun kuning — EC terlalu tinggi",
                "Layu di siang hari — panas GH",
                "Tidak layak sortasi — ukuran kecil",
              ]),
              kategori_susut: r() < 0.7 ? "NORMAL" : "ABNORMAL",
              jenis_kerugian: r() < 0.7 ? "ALOKASI_HPP" : "KERUGIAN_OPERASIONAL",
              biaya_kerugian: intBetween(r, 15000, 120000).toFixed(2),
            },
          });
        }

        const avgGr = isPakcoy(varietas.nama)
          ? intBetween(r, 70, 110)
          : intBetween(r, 50, 200);
        const jumlahTidakLayak = intBetween(r, 8, 35);
        const jumlahLayak = Math.max(1, layak - jumlahTidakLayak);
        const beratLayak = new Prisma.Decimal((jumlahLayak * avgGr).toFixed(3));
        const beratTidak = new Prisma.Decimal((jumlahTidakLayak * avgGr * 0.6).toFixed(3));

        await prisma.laporan_Panen.create({
          data: {
            siklus_id: siklus.id,
            berat_layak_gram: beratLayak,
            berat_tidak_layak_gram: beratTidak,
            jumlah_layak: jumlahLayak,
            jumlah_tidak_layak: jumlahTidakLayak,
            status: "APPROVED",
            catatan: jumlahTidakLayak > 0 ? "Sebagian tidak layak jual — compost" : "Layak jual penuh",
            userId: petaniId,
            waktu_kirim: addDays(tanggalPanen, 1),
          },
        });

        const bl = await prisma.biaya_Langsung.findUnique({ where: { siklus_id: siklus.id } });
        const totalBiaya = bl ? bl.subtotal : new Prisma.Decimal(100000);
        const beratKg = beratLayak.div(1000);
        await prisma.hPP.create({
          data: {
            siklus_id: siklus.id,
            biaya_langsung_total: totalBiaya,
            overhead_teralokasi: totalBiaya.mul(0.12).toFixed(2),
            biaya_plastik_packing: intBetween(r, 8000, 25000).toFixed(2),
            total_biaya: totalBiaya.mul(1.12).toFixed(2),
            hpp_per_lubang: totalBiaya.div(jumlahLayak).toFixed(2),
            hpp_per_kg: beratKg.gt(0) ? totalBiaya.div(beratKg).toFixed(2) : "0.00",
            hpp_per_pack: totalBiaya.div(Math.max(1, jumlahLayak / 5)).toFixed(2),
          },
        });

        created.push({ siklus, varietas, beratKg, jumlahLayak, tanggalPanen });
      }

      await prisma.kolam.update({
        where: { id: kolam.id },
        data: { status: gagalTotal ? "MENGANGGUR" : "MENGANGGUR" },
      });

      cursor = addDays(cursor, cycleWeeks * 7);
    }
  }

  return created;
}

async function seedPelangganDanPenjualan(selesai, adminId) {
  const pelangganData = [
    { nama: "Pasar Induk Lembang", alamat: "Lembang", no_telepon: "081200010001", email: "flow.pasar@kokonus.local" },
    { nama: "Resto Sayur Segar", alamat: "Dago", no_telepon: "081200010002", email: "flow.resto@kokonus.local" },
    { nama: "Warung Bu Siti (konsinyasi)", alamat: "Cisarua", no_telepon: "081200010003", email: "flow.konsinyasi@kokonus.local" },
    { nama: "Hotel Green Valley", alamat: "Bandung", no_telepon: "081200010004", email: "flow.hotel@kokonus.local" },
  ];

  const pelanggan = [];
  for (const p of pelangganData) {
    let row = await prisma.pelanggan.findFirst({ where: { email: p.email } });
    if (!row) row = await prisma.pelanggan.create({ data: p });
    pelanggan.push(row);
  }

  const r = rng(99);
  let soSeq = 1;
  const modes = ["LUNAS", "CICIL", "KONSINYASI", "LUNAS", "PIUTANG"];

  const urutPanen = [...selesai].sort(
    (a, b) => b.tanggalPanen.getTime() - a.tanggalPanen.getTime(),
  );
  const maxSo = Math.min(urutPanen.length, 40);

  const now = new Date();
  const bulanIni = dateOnly(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)));

  for (let i = 0; i < maxSo; i++) {
    let { siklus, varietas, beratKg, jumlahLayak, tanggalPanen } = urutPanen[i];
    if (i < 8 && tanggalPanen < bulanIni) {
      tanggalPanen = dateOnly(
        new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 3 + (i % 20))),
      );
    }
    const mode = modes[i % modes.length];
    const hargaKg = isPakcoy(varietas.nama)
      ? new Prisma.Decimal("20000.00")
      : new Prisma.Decimal("40000.00");
    const kgJual = beratKg.mul(new Prisma.Decimal(0.55 + r() * 0.4));
    const subtotal = kgJual.mul(hargaKg).toFixed(2);
    const total = subtotal;
    const nomor = `${SO_PREFIX}${tanggalPanen.getUTCFullYear()}-${String(soSeq++).padStart(4, "0")}`;

    let status_pembayaran = "LUNAS";
    let jumlah_dp = "0.00";
    let jumlah_pelunasan = total;
    let catatan = null;

    if (mode === "CICIL") {
      status_pembayaran = "PIUTANG";
      jumlah_dp = new Prisma.Decimal(total).mul(0.3).toFixed(2);
      jumlah_pelunasan = new Prisma.Decimal(total).mul(0.3).toFixed(2);
      catatan = "Cicil — DP 30%, pelunasan bertahap";
    } else if (mode === "PIUTANG") {
      status_pembayaran = "PIUTANG";
      jumlah_pelunasan = "0.00";
      catatan = "Piutang — belum ada pembayaran";
    } else if (mode === "KONSINYASI") {
      status_pembayaran = "PIUTANG";
      jumlah_pelunasan = new Prisma.Decimal(total).mul(0.5).toFixed(2);
      catatan = "Konsinyasi — titip jual di warung, bayar setelah laku";
    }

    const pel = pelanggan[i % pelanggan.length];

    await prisma.sales_Order.create({
      data: {
        nomor_so: nomor,
        pelanggan_id: pel.id,
        status: "DELIVERED",
        total,
        catatan,
        dibuat_pada: addDays(tanggalPanen, 2),
        dibuat_oleh_id: adminId,
        dikirim_pada: addDays(tanggalPanen, 3),
        terkirim_pada: addDays(tanggalPanen, 4),
        status_pembayaran,
        jumlah_dp,
        jumlah_pelunasan,
        baris: {
          create: [
            {
              siklus_id: siklus.id,
              jenis: "CURAH",
              jumlah: kgJual.toFixed(3),
              lubang_terpakai: Math.min(jumlahLayak, 200),
              hpp_order: "0.00",
              harga_satuan: hargaKg.toFixed(2),
              subtotal,
            },
          ],
        },
      },
    });
  }

  return soSeq - 1;
}

async function seedOverheadListrik() {
  const now = new Date();
  const endYear = now.getUTCFullYear();
  const endMonth = now.getUTCMonth();

  for (let y = 2025; y <= endYear; y += 1) {
    const lastM = y === endYear ? endMonth : 11;
    for (let m = 0; m <= lastM; m += 1) {
      const periode = dateOnly(new Date(Date.UTC(y, m, 1)));
      const ada = await prisma.biaya_Overhead.findFirst({ where: { periode } });
      if (ada) continue;
      const listrik = new Prisma.Decimal(LISTRIK_BULAN);
      await prisma.biaya_Overhead.create({
        data: {
          periode,
          depresiasi_greenhouse: "8000000.00",
          depresiasi_listrik: listrik.toFixed(2),
          sewa_lahan: "2000000.00",
          gaji_karyawan: "4500000.00",
          subtotal: listrik.add(14500000).toFixed(2),
        },
      });
    }
  }
}

async function main() {
  await seedAkun(prisma);
  const wiped = await wipeFlowData();
  const { petaniId, adminId } = await ensureUsers();
  const { lahan, kolams } = await ensureInfra();
  const varietasByName = await seedCatalog();
  const selesai = await seedSiklusTahun({ varietasByName, kolams, petaniId, adminId });
  const jumlahSo = await seedPelangganDanPenjualan(selesai, adminId);
  await seedOverheadListrik();
  const jumlahPetani = await seedPetani(prisma);
  const siklusAktif = await seedSiklusAktifDanMenunggu(prisma, {
    kolams,
    varietasByName,
    petaniId,
  });

  console.log(
    `Seed kokonus-tahun: hapus ${wiped} batch lama, ${Object.keys(varietasByName).length} varietas, ${kolams.length} kolam, ${selesai.length} siklus selesai, ${siklusAktif} siklus aktif, ${jumlahSo} pesanan jual, ${jumlahPetani} petani master. Listrik Rp 500.000/bulan.`,
  );
  console.log(`Login demo: admin@kokonus.farm / ${DEMO_PASSWORD}`);
  console.log("Langkah berikut (jurnal & saldo akun): npm run seed:keuangan");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
