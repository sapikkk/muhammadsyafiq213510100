# Data demo lokal

Akun login (seed): sandi **`KokonusDemo2026`**

| Peran | Email |
|-------|--------|
| Owner | owner@kokonus.farm |
| Admin | admin@kokonus.farm |
| Petani | petani@kokonus.farm |

## Isi seed (`prisma/seed.js` + `seed-demo-flow.js`)

- COA, inventaris, infrastruktur, varietas, master petani (modul seed existing).
- **3 pelanggan** demo (Fresh Mart, Resto Sayur Hijau, Toko Tani Online).
- **1 jurnal DRAFT** — setor kas ke bank Rp 500.000 (keterangan: *Setor kas ke rekening operasional (demo seed)*).
- Via browser (Admin): pelanggan **Koperasi Sumber Rejeki** (`koperasi.rejeki@demo.kokonus.farm`).

Jalankan ulang:

```bash
node --env-file=.env prisma/seed.js
# atau hanya alur demo:
node --env-file=.env -e "const {PrismaClient}=require('@prisma/client'); const {seedDemoFlow}=require('./prisma/seed-demo-flow'); const p=new PrismaClient(); seedDemoFlow(p).finally(()=>p.\$disconnect());"
```

Uji CRUD / konsol: dev server `http://localhost:3000`, login Admin → Pelanggan / Jurnal.
