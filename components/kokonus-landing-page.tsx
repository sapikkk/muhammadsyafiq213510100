import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { ArrowUpRight, Leaf, LineChart, Sprout, Wallet } from "lucide-react";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";
import "@/app/styles/kokonus-landing.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-kokonus-display",
  display: "swap",
});

const NAV = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara kerja" },
  { href: "#untuk-siapa", label: "Untuk siapa" },
] as const;

const FITUR = [
  {
    title: "Stok & paket siap pakai",
    body: "Barang, sisa pack, dan biaya per unit — jelas di satu tempat.",
    icon: Sprout,
    wide: true,
  },
  {
    title: "Siklus & panen",
    body: "Jadwal rakit apung dari benih sampai panen.",
    icon: Leaf,
    wide: false,
  },
  {
    title: "Penjualan & piutang",
    body: "Pesanan jual, pengiriman, dan tagihan pelanggan.",
    icon: Wallet,
    wide: false,
  },
  {
    title: "Laporan keuangan",
    body: "Arus kas, laba rugi, jurnal — untuk owner dan admin.",
    icon: LineChart,
    wide: true,
  },
] as const;

export async function KokonusLandingPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as Role | undefined;
  const appHref = role ? roleHome[role] : "/login";

  return (
    <div
      className={`kokonus-landing ${display.variable} min-h-screen font-[family-name:var(--font-manrope),ui-sans-serif,sans-serif]`}
    >
      <div className="relative overflow-hidden">
        <div
          className="kokonus-landing__blob -left-32 -top-24 h-80 w-80 bg-[#d3fa53]/25"
          aria-hidden
        />
        <div
          className="kokonus-landing__blob right-[-4rem] top-32 h-96 w-96 bg-[#1a3d2e]"
          aria-hidden
        />

        <header className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 pb-4 pt-6 sm:px-8 sm:pt-8">
          <div className="flex w-full items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5 text-[var(--kl-cream)]">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--kl-green)]">
                <KokonusBrandMark size={24} mark="icon" alt="" />
              </span>
              <span className="font-[family-name:var(--font-kokonus-display)] text-lg font-bold tracking-tight">
                Kokonus Farm
              </span>
            </Link>
            <Link
              href={appHref}
              className="kokonus-landing__pill-btn kokonus-landing__pill-btn--solid hidden sm:inline-flex items-center"
            >
              {role ? "Buka aplikasi" : "Masuk"}
            </Link>
          </div>

          <nav
            className="kokonus-landing__nav-pill flex flex-wrap items-center justify-center gap-1 px-2 py-1.5 text-sm"
            aria-label="Navigasi landing"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[var(--kl-cream)]/90 transition hover:bg-white/10 hover:text-[var(--kl-cream)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-10">
          <div className="flex flex-col gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kl-lime)]/90">
              Hidroponik rakit apung
            </p>
            <h1
              className={`kokonus-landing__display font-[family-name:var(--font-kokonus-display)] text-[clamp(2.35rem,6vw,4.25rem)] font-extrabold text-[var(--kl-cream)]`}
            >
              Kelola produksi{" "}
              <span className="kokonus-landing__display-accent block sm:inline">tanpa ribet.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[var(--kl-cream)]/80 sm:text-lg">
              Biaya benih, stok, panen, dan keuangan dalam satu aplikasi. Teks sederhana, untuk tim
              di lapangan dan di meja kerja.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={appHref}
                className="kokonus-landing__pill-btn kokonus-landing__pill-btn--solid inline-flex items-center gap-2"
              >
                Mulai
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <a
                href="#fitur"
                className="kokonus-landing__pill-btn kokonus-landing__pill-btn--ghost inline-flex items-center"
              >
                Lihat fitur
              </a>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--kl-cream)]/75">
              <span className="kokonus-landing__stat-orbit">Peran: petani · admin · owner</span>
              <span className="kokonus-landing__stat-orbit">Bahasa Indonesia</span>
            </div>
          </div>

          <div className="relative">
            <div className="kokonus-landing__hero-panel relative z-10 p-6 sm:p-8 md:p-10">
              <p className="font-[family-name:var(--font-kokonus-display)] text-sm font-bold uppercase tracking-wide text-[var(--kl-ink)]/70">
                Ringkasan hari ini
              </p>
              <p className="mt-3 font-[family-name:var(--font-kokonus-display)] text-3xl font-extrabold leading-tight text-[var(--kl-ink)] sm:text-4xl">
                Stok, siklus, dan uang — satu layar.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--kl-ink)]/75">
                Dari paket siap pakai sampai laporan arus kas. Cocok untuk kebun skala tim kecil
                yang butuh angka yang bisa dipercaya.
              </p>
            </div>
            <div className="relative z-0 -mt-8 ml-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--kl-green)] shadow-2xl sm:-mt-12 sm:ml-10">
              <Image
                src="/brand/kokonus-wordmark-light.png"
                alt=""
                width={640}
                height={360}
                className="kokonus-landing__photo-cut h-48 w-full opacity-90 sm:h-56"
                priority
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-[var(--kl-cream)] px-4 py-2 text-xs font-semibold text-[var(--kl-ink)] shadow-lg">
                Kokonus Farm
              </div>
            </div>
          </div>
        </section>

        <svg
          className="kokonus-landing__wave text-[var(--kl-cream)]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,64 C360,120 720,0 1080,48 C1260,72 1380,96 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <section
        id="fitur"
        className="bg-[var(--kl-cream)] px-5 py-16 text-[var(--kl-ink)] sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-kokonus-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            Yang bisa Anda{" "}
            <span className="text-[var(--kl-green)]">lakukan</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FITUR.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`kokonus-landing__bento p-6 text-[var(--kl-ink)] ${item.wide ? "sm:col-span-2 lg:col-span-2 kokonus-landing__bento--lime" : ""}`}
                >
                  <Icon className="mb-4 size-8 text-[var(--kl-green)]" strokeWidth={1.75} aria-hidden />
                  <h3 className="font-[family-name:var(--font-kokonus-display)] text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--kl-ink)]/70">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="cara-kerja"
        className="bg-[var(--kl-cream)] px-5 pb-16 text-[var(--kl-ink)] sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] bg-[var(--kl-green)] p-8 text-[var(--kl-cream)] md:grid-cols-3 md:p-12">
          {[
            { step: "1", title: "Catat stok", body: "Barang masuk, paket dibuat, sisa terpantau." },
            { step: "2", title: "Jalankan siklus", body: "Tanam, rawat, panen — terhubung ke biaya." },
            { step: "3", title: "Lihat keuangan", body: "Owner cek laporan tanpa export manual." },
          ].map((row) => (
            <div key={row.step} className="space-y-2">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--kl-lime)] font-[family-name:var(--font-kokonus-display)] text-lg font-extrabold text-[var(--kl-ink)]">
                {row.step}
              </span>
              <h3 className="font-[family-name:var(--font-kokonus-display)] text-xl font-bold">{row.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--kl-cream)]/85">{row.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="untuk-siapa" className="bg-[var(--kl-deep)] px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-[family-name:var(--font-kokonus-display)] text-2xl font-extrabold text-[var(--kl-cream)] sm:text-3xl">
              Siap dipakai tim Anda?
            </h2>
            <p className="mt-2 max-w-md text-sm text-[var(--kl-cream)]/75">
              Masuk dengan akun yang sudah dibagikan pengelola. Butuh akses baru? Hubungi admin
              kebun.
            </p>
          </div>
          <Link
            href={appHref}
            className="kokonus-landing__pill-btn kokonus-landing__pill-btn--solid inline-flex shrink-0 items-center gap-2"
          >
            Masuk ke aplikasi
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[var(--kl-deep)] px-5 py-8 text-center text-xs text-[var(--kl-cream)]/50 sm:px-8">
        <p>© Kokonus Farm — tata kelola biaya produksi hidroponik.</p>
      </footer>
    </div>
  );
}
