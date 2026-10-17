import Link from "next/link";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { loadLandingBundle } from "@/lib/landing";
import "@/app/styles/kokonus-landing.css";

export async function TentangKamiPage() {
  const { kartu } = await loadLandingBundle();
  const cards = kartu.TENTANG;

  return (
    <div className="kokonus-landing-ref min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <KokonusBrandMark size={28} mark="icon" alt="" />
            <span className="text-sm font-semibold">Kokonus Farm</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="kl-muted hover:text-foreground">
              Beranda
            </Link>
            <Link href="/login" className="font-medium hover:underline">
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tentang kami</h1>
        <p className="mt-2 max-w-2xl text-sm kl-muted">
          Susun kartu di Pengaturan → Landing → bagian &quot;Tentang kami&quot;. Urutan dan foto bebas
          menurut kebutuhan kebun Anda.
        </p>

        {cards.length === 0 ? (
          <p className="mt-8 text-sm kl-muted">Belum ada kartu tentang kami.</p>
        ) : (
          <ul className="mt-8 flex flex-col gap-6">
            {cards.map((c) => (
              <li
                key={c.id}
                className="kl-surface overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={c.gambar} className="kl-img-cover max-h-80 w-full object-cover" />
                <div className="space-y-2 p-5">
                  {c.label ? (
                    <span className="kl-badge inline-block px-3 py-1 text-xs">{c.label}</span>
                  ) : null}
                  <h2 className="text-lg font-semibold">{c.judul}</h2>
                  {c.teks ? <p className="text-sm leading-relaxed kl-muted">{c.teks}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
