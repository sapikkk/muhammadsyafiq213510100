# Deploy Vercel (Kokonus Farm)

Production: [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app)

## Env wajib

`DATABASE_URL` (pooled), `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — lihat `.env.example`.

Build di Vercel: `npx prisma generate && npm run build` (`vercel.json`).

## CLI (lokal)

```bash
cp scripts/env.vercel.example .env.vercel   # isi URL cloud, jangan commit
bash scripts/vercel-go-live.sh            # env → db push → seed → deploy
vercel deploy --prod --yes --archive=tgz  # deploy ulang tanpa seed
```

Upload CLI besar: pakai `--archive=tgz` dan `.vercelignore`.
