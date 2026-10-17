import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LANDING_FEATURES, LANDING_ROLES } from "@/lib/kokonus-landing-content";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";
import "@/app/styles/kokonus-landing.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-kokonus-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kokonus-serif",
  display: "swap",
});

/** Urutan & span bento — layout fixed, copy dari content. */
const BENTO_LAYOUT: Record<
  string,
  { span: string; row?: string; offset?: string; variant: string }
> = {
  greenhouse: { span: "kl-span-7", row: "kl-row-2", variant: "kl-card--lime kl-card--notch-br" },
  rakit: { span: "kl-span-5", offset: "kl-offset-down", variant: "kl-card--black kl-card--notch-tab" },
  stok: { span: "kl-span-4", variant: "kl-card--mint kl-card--notch-br" },
  penjualan: { span: "kl-span-8", offset: "kl-offset-up", variant: "kl-card--powder" },
  pengantaran: { span: "kl-span-4", variant: "kl-card--glass kl-card--notch-br" },
  keuangan: { span: "kl-span-6", offset: "kl-offset-down", variant: "kl-card--black" },
};

export async function KokonusLandingPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as Role | undefined;
  const appHref = role ? roleHome[role] : "/login";

  return (
    <div
      className={`kokonus-landing ${display.variable} ${serif.variable} min-h-screen font-[family-name:var(--font-manrope),ui-sans-serif,sans-serif]`}
    >
      <div className="kokonus-landing__canvas">
        <div className="kokonus-landing__gridlines" aria-hidden />

        <div className="px-3 pt-3">
          <nav className="kl-nav-float" aria-label="Navigasi">
            <Link href="/" className="flex items-center gap-2 pr-2">
              <KokonusBrandMark size={20} mark="icon" alt="" />
              <span className="hidden font-[family-name:var(--font-kokonus-display)] text-sm font-bold sm:inline">
                Kokonus
              </span>
            </Link>
            <a href="#fitur">Fitur</a>
            <a href="#peran">Peran</a>
            <Link href={appHref} className="kl-nav-cta">
              {role ? "Aplikasi" : "Masuk"}
            </Link>
          </nav>
        </div>

        <section id="kebun" className="kl-hero">
          <div className="kl-hero__type">
            <p className="kl-hero__micro">Greenhouse · rakit apung · hidroponik</p>
            <div
              className="kl-hero__bleed font-[family-name:var(--font-kokonus-display)]"
              aria-hidden
            >
              RA<span>KIT</span>
            </div>
            <h1 className="kl-hero__title font-[family-name:var(--font-kokonus-display)]">
              Kebun{" "}
              <em className="font-[family-name:var(--font-kokonus-serif)]">hidroponik</em>
              <span className="kl-hero__hl"> catat uangnya.</span>
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--kl-cream)]/70">
              Stok, panen, jual, antar — satu aplikasi. Bahasa Indonesia, layar sederhana.
            </p>
            <Link href={appHref} className="kl-dogbone group">
              <span className="kl-dogbone__cap">{role ? "Buka aplikasi" : "Masuk"}</span>
              <span className="kl-dogbone__neck" aria-hidden />
              <span className="kl-dogbone__cap kl-dogbone__cap--arrow">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </Link>
            <div className="kl-stat-dash">
              <strong>3</strong>
              <span>Peran — petani, admin, owner</span>
            </div>
          </div>

          <div className="kl-hero__visual">
            <div
              className="kl-photo-slot"
              data-label="Slot foto — kebun / farmland"
              role="img"
              aria-label="Placeholder foto kebun"
            />
            <div className="kl-lime-slab">
              <p className="font-[family-name:var(--font-kokonus-display)]">
                Dari kolam sampai pelanggan. Tanpa spreadsheet.
              </p>
            </div>
            <span className="kl-sticker kl-sticker--squircle">Petani</span>
            <span className="kl-sticker kl-sticker--circle">
              Rakit
              <br />
              apung
            </span>
            <span className="kl-sticker kl-sticker--pill">Penjualan · antar</span>
            <span className="kl-sticker kl-sticker--triangle">GH</span>
          </div>
        </section>

        <section id="fitur" className="kl-bento-section">
          <div className="kl-bento-section__head">
            <h2 className="font-[family-name:var(--font-kokonus-display)]">
              MODUL
              <span>kebun</span>
            </h2>
          </div>
          <div className="kl-bento">
            {LANDING_FEATURES.map((item, i) => {
              const layout = BENTO_LAYOUT[item.id] ?? {
                span: "kl-span-6",
                variant: "kl-card--notch-br",
              };
              return (
                <article
                  key={item.id}
                  className={`kl-card ${layout.variant} ${layout.span} ${layout.row ?? ""} ${layout.offset ?? ""}`}
                >
                  {i === 0 ? <span className="kl-starburst">NEW</span> : null}
                  <span className="kl-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-[family-name:var(--font-kokonus-display)]">{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="peran" className="kl-footer-collage">
          <div className="kl-footer-collage__inner">
            <div>
              <p className="kl-hero__micro mb-4">Masuk ke aplikasi</p>
              <p className="kl-footer-big font-[family-name:var(--font-kokonus-display)]">
                Tim
                <br />
                <em className="font-[family-name:var(--font-kokonus-serif)]">lapangan.</em>
              </p>
              <Link href={appHref} className="kl-dogbone mt-8 inline-flex">
                <span className="kl-dogbone__cap">Masuk</span>
                <span className="kl-dogbone__neck" aria-hidden />
                <span className="kl-dogbone__cap kl-dogbone__cap--arrow">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </Link>
            </div>
            <div className="kl-role-stack">
              {LANDING_ROLES.map((card) => (
                <div key={card.title} className="kl-role-chip">
                  <strong className="font-[family-name:var(--font-kokonus-display)]">
                    {card.title}
                  </strong>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="kl-copyright">Kokonus Farm</p>
        </section>
      </div>
    </div>
  );
}
