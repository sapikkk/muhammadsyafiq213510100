import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { KokonusLandingGreenhouseScene } from "@/components/kokonus-landing-greenhouse-scene";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  LANDING_DOMAIN_TAGS,
  LANDING_FEATURES,
  LANDING_FLOW,
  LANDING_KEBUN_COPY,
  LANDING_NAV,
  LANDING_ROLES,
} from "@/lib/kokonus-landing-content";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";
import "@/app/styles/kokonus-landing.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-kokonus-display",
  display: "swap",
});

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
              className="kokonus-landing__pill-btn kokonus-landing__pill-btn--solid hidden items-center sm:inline-flex"
            >
              {role ? "Buka aplikasi" : "Masuk"}
            </Link>
          </div>

          <nav
            className="kokonus-landing__nav-pill flex max-w-full flex-wrap items-center justify-center gap-1 px-2 py-1.5 text-sm"
            aria-label="Navigasi landing"
          >
            {LANDING_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-[var(--kl-cream)]/90 transition hover:bg-white/10 hover:text-[var(--kl-cream)] sm:px-4"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section
          id="kebun"
          className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-6 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:pb-16 lg:pt-8"
        >
          <div className="flex flex-col gap-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--kl-lime)]/90">
              {LANDING_KEBUN_COPY.eyebrow}
            </p>
            <h1
              className={`kokonus-landing__display font-[family-name:var(--font-kokonus-display)] text-[clamp(2.35rem,6vw,4.25rem)] font-extrabold text-[var(--kl-cream)]`}
            >
              {LANDING_KEBUN_COPY.titleLead}{" "}
              <span className="kokonus-landing__display-accent block sm:inline">
                {LANDING_KEBUN_COPY.titleAccent}
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[var(--kl-cream)]/80 sm:text-lg">
              {LANDING_KEBUN_COPY.lead}
            </p>
            <ul className="flex flex-wrap gap-2">
              {LANDING_DOMAIN_TAGS.map((tag) => (
                <li key={tag}>
                  <span className="kokonus-landing__tag">{tag}</span>
                </li>
              ))}
            </ul>
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
          </div>

          <div className="relative flex flex-col gap-4">
            <div className="kokonus-landing__hero-panel relative z-10 p-6 sm:p-8">
              <p className="font-[family-name:var(--font-kokonus-display)] text-sm font-bold uppercase tracking-wide text-[var(--kl-ink)]/70">
                {LANDING_KEBUN_COPY.panelTitle}
              </p>
              <p className="mt-3 font-[family-name:var(--font-kokonus-display)] text-2xl font-extrabold leading-tight text-[var(--kl-ink)] sm:text-3xl">
                {LANDING_KEBUN_COPY.panelBody}
              </p>
            </div>
            <div className="kokonus-landing__scene-wrap relative z-0 -mt-6 sm:-mt-10">
              <KokonusLandingGreenhouseScene className="h-auto w-full" />
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
            Fitur untuk{" "}
            <span className="text-[var(--kl-green)]">seluruh alur kebun</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--kl-ink)]/65 sm:text-base">
            Hidroponik rakit apung di greenhouse, lalu penjualan dan pengantaran sayur — dicatat
            bertahap, bukan sekali di akhir bulan.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LANDING_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className={`kokonus-landing__bento kokonus-landing__bento--on-cream p-6 ${item.wide ? "sm:col-span-2 lg:col-span-2 kokonus-landing__bento--lime-cream" : ""}`}
                >
                  {item.tag ? (
                    <span className="kokonus-landing__feature-tag mb-3 inline-block">{item.tag}</span>
                  ) : null}
                  <Icon className="mb-3 size-8 text-[var(--kl-green)]" strokeWidth={1.75} aria-hidden />
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

      <section id="alur" className="bg-[var(--kl-cream)] px-5 pb-16 text-[var(--kl-ink)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-kokonus-display)] text-2xl font-extrabold sm:text-3xl">
            Alur dari kolam ke pelanggan
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {LANDING_FLOW.map((row) => (
              <div
                key={row.step}
                className="kokonus-landing__flow-card rounded-[2rem] bg-[var(--kl-green)] p-8 text-[var(--kl-cream)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--kl-lime)] font-[family-name:var(--font-kokonus-display)] text-lg font-extrabold text-[var(--kl-ink)]">
                  {row.step}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-kokonus-display)] text-xl font-bold">
                  {row.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--kl-cream)]/85">{row.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="peran" className="bg-[var(--kl-deep)] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-kokonus-display)] text-2xl font-extrabold text-[var(--kl-cream)] sm:text-3xl">
            Dibuat untuk <span className="text-[var(--kl-lime)]">petani</span> dan tim kebun
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LANDING_ROLES.map((card) => (
              <article
                key={card.title}
                className="kokonus-landing__role-card flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-7"
              >
                <h3 className="font-[family-name:var(--font-kokonus-display)] text-xl font-bold text-[var(--kl-lime)]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--kl-cream)]/80">{card.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {card.highlights.map((h) => (
                    <li key={h}>
                      <span className="kokonus-landing__tag kokonus-landing__tag--dark">{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--kl-deep)] px-5 pb-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-[var(--kl-lime)]/30 bg-[var(--kl-lime)]/10 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-[family-name:var(--font-kokonus-display)] text-2xl font-extrabold text-[var(--kl-cream)] sm:text-3xl">
              Masuk ke aplikasi kebun
            </h2>
            <p className="mt-2 max-w-md text-sm text-[var(--kl-cream)]/75">
              Akun petani, admin, atau owner — langsung ke beranda peran Anda.
            </p>
          </div>
          <Link
            href={appHref}
            className="kokonus-landing__pill-btn kokonus-landing__pill-btn--solid inline-flex shrink-0 items-center gap-2"
          >
            Masuk
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[var(--kl-deep)] px-5 py-8 text-center text-xs text-[var(--kl-cream)]/50 sm:px-8">
        <p>© Kokonus Farm — greenhouse, rakit apung, hidroponik.</p>
      </footer>
    </div>
  );
}
