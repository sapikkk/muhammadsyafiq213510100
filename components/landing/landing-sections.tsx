import Link from "next/link";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { LANDING_NAV } from "@/lib/kokonus-landing-content";
import type { LandingBundle, LandingKartuView } from "@/lib/landing";
import { LANDING_ASSET } from "@/lib/kokonus-landing-content";

const arrowIcon = `${LANDING_ASSET}/5dc65.svg`;
const arrowDark = `${LANDING_ASSET}/3d064.svg`;
const arrowCard = `${LANDING_ASSET}/6ba99.svg`;
const arrowLime = `${LANDING_ASSET}/143e7.svg`;

type SectionProps = {
  konten: LandingBundle["konten"];
  kartu: LandingBundle["kartu"];
  appHref: string;
};

export function LandingHeroSection({ konten, kartu, appHref }: SectionProps) {
  const stack = kartu.HERO_STACK;

  return (
    <div className="mx-auto w-full max-w-[min(100%,1200px)] p-3 sm:p-4 md:p-5">
      <div className="relative flex flex-col overflow-hidden rounded-[20px] p-4 sm:p-6 md:p-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[10px]">
          <div className="absolute inset-0 rounded-[10px] bg-[var(--kl-green)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute size-full rounded-[10px] object-cover"
            src={konten.heroGambarLatar}
          />
          <div className="absolute inset-0 rounded-[10px] bg-[#0a1210]/45" />
        </div>

        <header className="relative z-10 flex w-full shrink-0 flex-col gap-2 rounded-[60px] border border-white bg-white/20 p-2.5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 px-2 sm:px-4">
            <KokonusBrandMark size={24} mark="icon" alt="" />
            <span className="text-sm font-medium tracking-wide text-white">Kokonus Farm</span>
          </Link>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
            <nav
              className="hidden items-center gap-4 rounded-[20px] border border-white bg-white/80 px-4 py-2 text-sm text-black md:flex"
              aria-label="Navigasi"
            >
              {LANDING_NAV.map((item) =>
                item.href.startsWith("#") ? (
                  <a key={item.href} href={item.href} className="leading-none hover:opacity-70">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className="leading-none hover:opacity-70">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <Link
              href={appHref}
              id="masuk"
              className="flex min-h-11 items-center gap-2 rounded-[20px] border border-white bg-white/80 px-4 py-2.5 text-sm font-medium text-black"
            >
              Masuk aplikasi
            </Link>
          </div>
        </header>

        <div className="relative z-10 mt-10 flex w-full flex-col gap-10 pb-2 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-[clamp(1.65rem,5vw,2.75rem)] font-extrabold leading-[1.25] text-white">
                {konten.heroJudul}
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-white/90">{konten.heroLead}</p>
              <Link
                href={appHref}
                className="kl-btn text-sm uppercase"
              >
                {konten.heroCta}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="size-4" src={arrowIcon} />
              </Link>
            </div>

            <div className="flex w-full max-w-md flex-col gap-4 rounded-[10px] bg-white p-4 sm:flex-row sm:gap-5">
              <div className="min-w-0 flex-1 text-black">
                <p className="text-sm font-extrabold">Pratinjau alur</p>
                <p className="mt-2 text-xs leading-snug">
                  Siklus tanam, stok pack, pesanan jual — berurutan, bukan di akhir bulan.
                </p>
              </div>
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-[10px] bg-[#d9d9d9] sm:w-[170px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="size-full object-cover" src={konten.heroGambarPratinjau} />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center lg:max-w-[280px] lg:justify-end">
            <div className="flex w-full flex-col gap-3 lg:relative lg:w-[250px] lg:items-center">
              {stack.map((card, i) => (
                <HeroStackCard key={card.id} card={card} index={i} total={stack.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStackCard({
  card,
  index,
  total,
}: {
  card: LandingKartuView;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  const lgOverlap = !isLast ? "lg:mb-[-140px]" : "";
  const lgWidth =
    index === 0 ? "lg:w-[210px]" : index === 1 ? "lg:w-[230px]" : "lg:w-full";
  const lgOpacity = isLast ? "lg:opacity-100" : "lg:opacity-80";

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-[10px] bg-white p-2.5 shadow-[0_0_5px_rgba(0,0,0,0.15)] ${lgWidth} ${lgOverlap} ${lgOpacity}`}
    >
      <div className="flex w-full flex-col gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="size-10 rounded-full object-cover" src={card.gambar} />
        <div className="flex w-full items-end justify-between gap-2 text-base font-extrabold text-black">
          <span>{card.judul}</span>
          {card.label ? <span className="text-sm font-normal">{card.label}</span> : null}
        </div>
        {card.meta ? (
          <div className="flex w-full justify-between text-xs text-black">
            <span>{card.meta}</span>
          </div>
        ) : null}
      </div>
      {isLast ? (
        <div className="relative h-[88px] w-full overflow-hidden rounded-[10px] bg-[#d9d9d9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-full object-cover" src={card.gambar} />
        </div>
      ) : null}
    </div>
  );
}

export function LandingVerificationSection({ konten, kartu }: Pick<SectionProps, "konten" | "kartu">) {
  const metrics = kartu.VERIFICATION;
  if (metrics.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[min(100%,960px)] px-3 py-6 sm:px-6">
      <div className="kl-surface flex flex-col gap-5 px-4 py-6 sm:px-5">
        <h2 className="text-[clamp(1.35rem,4vw,2rem)] font-semibold leading-tight tracking-tight">
          {konten.verificationJudul}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-[var(--kl-shape-lg)] border border-border bg-muted p-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-[20px] border border-black/20 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="size-5" src={m.gambar} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-black/80">{m.judul}</p>
                <p className="text-2xl font-bold leading-tight">
                  {m.meta}{" "}
                  {m.label ? <span className="text-sm font-normal text-black/60">{m.label}</span> : null}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingSportsFeatureSection({ kartu, appHref }: Pick<SectionProps, "kartu" | "appHref">) {
  const features = kartu.SPORTS_FEATURE;
  if (features.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[min(100%,1080px)] px-3 py-4 sm:px-6">
      <div className="flex flex-col gap-5">
        {features.map((feature, i) => (
          <div key={feature.id} className="flex flex-col gap-4">
            {feature.label ? (
              <span className="kl-badge w-fit px-4 py-2">{feature.label}</span>
            ) : (
              <span className="kl-badge w-fit px-4 py-2">{`Modul ${i + 1}`}</span>
            )}
            <div className="kl-feature-panel flex min-h-[280px] flex-col gap-4 rounded-[var(--kl-shape-lg)] p-4 sm:flex-row sm:p-5">
              <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[var(--kl-shape-lg)] sm:min-h-[260px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="kl-img-cover size-full object-cover" src={feature.gambar} />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold leading-snug sm:text-2xl">{feature.judul}</h2>
                  {feature.teks ? (
                    <p className="mt-2 text-xs leading-relaxed opacity-90 sm:text-sm">{feature.teks}</p>
                  ) : null}
                </div>
                <Link href={appHref} className="kl-btn kl-btn-outline w-fit bg-background/90">
                  Lihat modul
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingFacilitiesSection({ kartu, appHref }: Pick<SectionProps, "kartu" | "appHref">) {
  const facilities = kartu.FACILITIES;
  if (facilities.length === 0) return null;

  return (
    <section id="modul" className="mx-auto w-full max-w-[min(100%,1080px)] px-3 pb-6 sm:px-6 md:px-10">
      <div className="kl-panel flex flex-col gap-5 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="kl-badge px-4 py-2">Modul</span>
            <h2 className="text-lg font-semibold tracking-tight sm:text-2xl">Alur kebun hidroponik</h2>
          </div>
          <Link href={appHref} className="kl-btn">
            Lihat aplikasi
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="size-4" src={arrowDark} />
          </Link>
        </div>

        <div
          id="fasilitas"
          className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5"
        >
          {facilities.map((fac) => (
            <article
              key={fac.id}
              className="relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[20px] p-4 sm:min-h-[240px] sm:p-5 xl:min-h-[267px]"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[20px]">
                <div className="absolute inset-0 rounded-[20px] bg-[#a0d6f8]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute size-full rounded-[20px] object-cover" src={fac.gambar} />
                <div className="absolute inset-0 rounded-[20px] bg-black/25" />
              </div>
              <div className="relative flex h-full flex-col justify-between gap-4">
                {fac.label ? (
                  <span className="w-fit rounded-[20px] border-2 border-white px-4 py-2 text-sm font-bold text-white">
                    {fac.label}
                  </span>
                ) : null}
                <div className="flex items-center gap-2.5">
                  <p className="flex-1 text-base font-semibold leading-snug text-white">{fac.judul}</p>
                  <span className="grid size-8 shrink-0 place-items-center rounded-[20px] bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="size-4" src={arrowCard} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingFundraisingSection({ konten, kartu, appHref }: SectionProps) {
  const roles = kartu.ROLES;
  const extra = kartu.FUNDRAISING;

  return (
    <section className="mx-auto w-full max-w-[min(100%,960px)] px-3 pb-10 sm:px-6">
      <div className="grid gap-2.5 lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-2.5">
          <div className="w-full rounded-[30px] bg-[var(--kl-deep)] p-1.5">
            <div className="overflow-hidden px-2.5 pb-2.5 pt-6 sm:pt-8">
              <p className="text-[clamp(1.5rem,4vw,2rem)] leading-tight text-white">{konten.fundraisingStat}</p>
              <p className="mt-2 max-w-sm text-xs leading-normal text-white/80">{konten.fundraisingCatatan}</p>
            </div>
            <Link
              href={appHref}
              className="flex min-h-11 w-full items-center justify-between rounded-[30px] bg-[#1d5242] py-1.5 pl-4 pr-1.5 text-xs font-bold text-white"
            >
              <span>{konten.fundraisingTombol}</span>
              <span className="rounded-full bg-[var(--kl-lime)] p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="size-5" src={arrowLime} />
              </span>
            </Link>
          </div>

          {roles.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-3">
              {roles.map((r) => (
                <div key={r.id} className="rounded-[20px] border border-black/10 bg-white p-4 text-sm">
                  <strong className="text-[var(--kl-green)]">{r.judul}</strong>
                  {r.teks ? <p className="mt-1 text-xs leading-relaxed text-black/65">{r.teks}</p> : null}
                </div>
              ))}
            </div>
          ) : null}

          {extra.length > 0 ? (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {extra.map((c) => (
                <FundraisingCard key={c.id} card={c} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[220px] overflow-hidden rounded-[20px] lg:min-h-[301px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-full object-cover" src={konten.fundraisingGambarGelap} />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--kl-green)]/90 to-transparent p-5">
            <p className="text-lg font-bold text-white">{konten.fundraisingJudulGelap}</p>
            <p className="mt-1 text-sm text-white/85">{konten.fundraisingTeksGelap}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FundraisingCard({ card }: { card: LandingKartuView }) {
  const variant = card.meta ?? "gelap";
  if (variant === "muda") {
    return (
      <div className="rounded-[30px] bg-[#d2dcdb] p-1.5">
        <p className="px-2.5 py-4 text-center text-lg text-black">{card.judul}</p>
        {card.teks ? <p className="px-2.5 pb-2 text-xs text-black/70">{card.teks}</p> : null}
      </div>
    );
  }
  if (variant === "komunitas") {
    return (
      <div className="rounded-[30px] bg-[#bcc2c0] p-4">
        <p className="font-bold text-black">{card.judul}</p>
        {card.teks ? <p className="mt-1 text-xs text-black/70">{card.teks}</p> : null}
      </div>
    );
  }
  return (
    <div className="relative min-h-[160px] overflow-hidden rounded-[30px] p-4 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="absolute inset-0 size-full object-cover" src={card.gambar} />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative">
        <p className="font-semibold">{card.judul}</p>
        {card.teks ? <p className="mt-1 text-xs text-white/85">{card.teks}</p> : null}
      </div>
    </div>
  );
}

export function LandingAthleteSection({ konten, kartu }: Pick<SectionProps, "konten" | "kartu">) {
  const lead = kartu.ATHLETE.find((a) => a.judul.trim().length > 0 && a.judul !== "—");
  const avatars = kartu.ATHLETE.filter((a) => a.judul.trim().length === 0 || a.judul === "—");

  return (
    <section className="mx-auto w-full max-w-[min(100%,960px)] px-3 py-8 sm:px-6">
      <div className="flex flex-col gap-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-snug">{konten.athleteJudul}</h2>
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[20px] p-5 text-white sm:min-h-[310px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 size-full object-cover" src={konten.athleteGambar} />
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative flex flex-wrap gap-1 rounded-full bg-white/40 p-1">
            {avatars.slice(0, 4).map((a) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={a.id} alt="" className="-mr-1 size-10 rounded-full border-2 border-white object-cover" src={a.gambar} />
            ))}
          </div>
          <div className="relative mt-auto flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {lead?.judul ? <h3 className="text-3xl font-semibold sm:text-4xl">{lead.judul}</h3> : null}
              <p className="mt-2 max-w-md text-xs sm:text-sm">{lead?.teks ?? konten.athleteTeks}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingSportsFooterSection({ konten, kartu }: Pick<SectionProps, "konten" | "kartu">) {
  const links = kartu.FOOTER;

  return (
    <footer className="border-t border-border bg-muted py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-[min(100%,1080px)] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2">
            <KokonusBrandMark size={40} mark="icon" alt="" />
            <span className="text-sm font-bold uppercase">Kokonus Farm</span>
          </div>
          <p className="mt-6 text-xl font-bold leading-snug sm:text-2xl">
            <span className="kl-accent-text">{konten.footerJudul}</span>
            {" — "}
            {konten.footerTeks}
          </p>
        </div>
        {links.length > 0 ? (
          <nav aria-label="Tautan footer" className="flex flex-wrap gap-6">
            {links.map((link) => {
              const href = link.meta?.startsWith("/") ? link.meta : `/${link.meta ?? ""}`;
              return (
                <Link
                  key={link.id}
                  href={href}
                  className="flex items-center gap-2 text-sm font-bold hover:opacity-70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="size-5" src={link.gambar} />
                  {link.judul}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
      <p className="mx-auto mt-10 max-w-[1080px] px-4 text-center text-[10px] uppercase tracking-widest text-black/40">
        Kokonus Farm — hidroponik · rakit apung
      </p>
    </footer>
  );
}
