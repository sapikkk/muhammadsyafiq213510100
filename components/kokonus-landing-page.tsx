import Link from "next/link";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  LANDING_ASSET,
  LANDING_BENTO,
  LANDING_FACILITIES,
  LANDING_HERO,
  LANDING_NAV,
  LANDING_ROLES,
} from "@/lib/kokonus-landing-content";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";
import "@/app/styles/kokonus-landing.css";

const heroBg = `${LANDING_ASSET}/3ccb6.png`;
const previewThumb = `${LANDING_ASSET}/ecc85.png`;

export async function KokonusLandingPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as Role | undefined;
  const appHref = role ? roleHome[role] : "/login";

  return (
    <div className="kokonus-landing-ref min-h-dvh bg-[var(--kl-cream)] text-[var(--kl-ink)]">
      {/* —— Road Freight hero (reference 2:383) —— */}
      <div className="mx-auto w-full max-w-[1200px] p-4 md:p-5">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] p-5 md:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[10px]">
            <div className="absolute inset-0 rounded-[10px] bg-[#1a3d2e]" />
            <img
              alt=""
              className="absolute size-full rounded-[10px] object-cover"
              src={heroBg}
            />
            <div className="absolute inset-0 rounded-[10px] bg-[#0a1210]/45" />
          </div>

          <header className="relative z-10 flex w-full shrink-0 items-center justify-between gap-3 rounded-[60px] border border-white bg-white/20 p-2.5">
            <Link href="/" className="flex shrink-0 items-center gap-2.5 px-4">
              <KokonusBrandMark size={24} mark="icon" alt="" />
              <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white">
                Kokonus Farm
              </span>
            </Link>
            <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
              <nav
                className="hidden items-center gap-5 rounded-[20px] border border-white bg-white/80 px-5 py-2.5 text-sm text-black md:flex"
                aria-label="Navigasi"
              >
                {LANDING_NAV.slice(0, 2).map((item) => (
                  <a key={item.href} href={item.href} className="leading-none hover:opacity-70">
                    {item.label}
                  </a>
                ))}
              </nav>
              <Link
                href={appHref}
                id="masuk"
                className="flex items-center gap-2 rounded-[20px] border border-white bg-white/80 px-5 py-2.5 text-sm font-medium text-black"
              >
                {role ? "Aplikasi" : "Masuk"}
              </Link>
            </div>
          </header>

          <div className="relative z-10 mt-16 flex w-full flex-col gap-12 pb-4 lg:mt-24 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="flex max-w-[519px] flex-col gap-10 lg:gap-12">
              <div className="flex flex-col gap-6">
                <h1 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.35] text-white">
                  {LANDING_HERO.title}
                </h1>
                <p className="max-w-md text-sm leading-[1.45] text-white/90">{LANDING_HERO.lead}</p>
                <Link
                  href={appHref}
                  className="inline-flex w-fit items-center gap-2.5 rounded-[20px] bg-[var(--kl-green)] px-5 py-2.5 text-sm uppercase text-white"
                >
                  {LANDING_HERO.cta}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="size-4" src={`${LANDING_ASSET}/5dc65.svg`} />
                </Link>
              </div>

              <div className="flex w-full max-w-[432px] gap-5 rounded-[10px] bg-white p-5">
                <div className="min-w-0 flex-1 text-black">
                  <div className="flex items-end whitespace-nowrap text-sm">
                    <span className="text-base font-extrabold">{LANDING_HERO.previewTitle.split(" ")[0]}</span>
                    <span>{LANDING_HERO.previewTitle.slice(2)}</span>
                  </div>
                  <p className="mt-2 line-clamp-4 text-xs leading-snug">{LANDING_HERO.previewBody}</p>
                </div>
                <div className="relative h-24 w-[170px] shrink-0 overflow-hidden rounded-[10px] bg-[#d9d9d9]">
                  <img alt="" className="size-full object-cover" src={previewThumb} />
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative flex w-[250px] flex-col items-center">
                {LANDING_HERO.stack.map((card, i) => {
                  const opacities = ["opacity-60", "opacity-80", "opacity-100"];
                  const widths = ["w-[210px]", "w-[230px]", "w-full"];
                  const margins = ["mb-[-190px]", "mb-[-190px]", ""];
                  return (
                    <div
                      key={card.title}
                      className={`relative flex shrink-0 flex-col gap-5 rounded-[10px] bg-white p-2.5 shadow-[0_0_5px_rgba(0,0,0,0.2)] ${widths[i]} ${margins[i]} ${opacities[i]} max-lg:mb-3 max-lg:w-full max-lg:opacity-100`}
                    >
                      <div className="flex w-full flex-col gap-2.5">
                        <img
                          alt=""
                          className="size-10 rounded-full object-cover"
                          height={40}
                          src={card.image}
                          width={40}
                        />
                        <div className="flex w-full items-end justify-between text-base font-extrabold text-black">
                          <span>{card.title}</span>
                          <span className="text-sm font-normal">{card.meta.split(" ")[0]}</span>
                        </div>
                        <div className="flex w-full justify-between text-xs text-black">
                          <span>{card.meta}</span>
                          <span>{card.date}</span>
                        </div>
                      </div>
                      <div className="relative h-[88px] w-full overflow-hidden rounded-[10px] bg-[#d9d9d9]">
                        {i === 2 ? (
                          <img
                            alt=""
                            className="size-full object-cover"
                            src={`${LANDING_ASSET}/7fa27.png`}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* —— Facilities explorer (reference 2:1175) —— */}
      <section id="modul" className="mx-auto mt-6 w-full max-w-[1080px] px-4 pb-8 md:px-10">
        <div className="flex flex-col gap-5 rounded-[20px] bg-[#f3f3f3] p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-[20px] border-2 border-black/20 bg-white px-4 py-2 text-sm font-bold">
                Modul
              </span>
              <h2 className="text-xl font-semibold md:text-2xl">Alur kebun hidroponik</h2>
            </div>
            <Link
              href={appHref}
              className="inline-flex h-[34px] items-center gap-2.5 rounded-[20px] bg-black px-4 text-sm font-bold text-white"
            >
              Lihat aplikasi
              <img alt="" className="size-4" src={`${LANDING_ASSET}/3d064.svg`} />
            </Link>
          </div>

          <div
            id="fasilitas"
            className="grid gap-2.5 sm:grid-cols-2 lg:flex lg:gap-2.5"
          >
            {LANDING_FACILITIES.map((fac, idx) => (
              <article
                key={fac.title}
                className="relative flex min-h-[220px] flex-1 flex-col justify-center overflow-hidden rounded-[20px] p-5 lg:h-[267px]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[20px]">
                  <div className="absolute inset-0 rounded-[20px] bg-[#a0d6f8]" />
                  <img
                    alt=""
                    className="absolute size-full rounded-[20px] object-cover"
                    src={fac.image}
                  />
                  <div className="absolute inset-0 rounded-[20px] bg-black/25" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <span className="w-fit rounded-[20px] border-2 border-white px-4 py-2 text-sm font-bold text-white">
                    {idx === 0 ? "Greenhouse" : idx === 1 ? "Rakit apung" : idx === 2 ? "Penjualan" : "Keuangan"}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <p className="flex-1 text-base font-semibold leading-snug text-white">{fac.title}</p>
                    <span className="grid size-8 shrink-0 place-items-center rounded-[20px] bg-black">
                      <img alt="" className="size-4" src={`${LANDING_ASSET}/6ba99.svg`} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* —— Charity bento (reference 2:729) —— */}
      <section className="mx-auto w-full max-w-[960px] px-4 pb-16 md:px-6">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-end">
          <div className="flex flex-1 flex-col gap-2.5">
            <div className="w-full rounded-[30px] bg-[var(--kl-deep)] p-1.5">
              <div className="relative overflow-hidden px-2.5 pb-2.5 pt-8">
                <p className="text-[32px] leading-tight text-white">{LANDING_BENTO.stat}</p>
                <p className="mt-2 max-w-sm text-xs leading-normal text-white/80">{LANDING_BENTO.statNote}</p>
              </div>
              <Link
                href={appHref}
                className="flex w-full items-center justify-between rounded-[30px] bg-[#1d5242] py-1.5 pl-4 pr-1.5 text-xs font-bold text-white"
              >
                <span>{LANDING_BENTO.button}</span>
                <span className="rounded-full bg-[var(--kl-lime)] p-1.5">
                  <img alt="" className="size-5" src={`${LANDING_ASSET}/143e7.svg`} />
                </span>
              </Link>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {LANDING_ROLES.map((r) => (
                <div
                  key={r.title}
                  className="rounded-[20px] border border-black/10 bg-white p-4 text-sm"
                >
                  <strong className="text-[var(--kl-green)]">{r.title}</strong>
                  <p className="mt-1 text-xs leading-relaxed text-black/65">{r.line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[20px] lg:min-h-[301px]">
            <img alt="" className="size-full object-cover" src={`${LANDING_ASSET}/7faac.png`} />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--kl-green)]/90 to-transparent p-5">
              <p className="text-lg font-bold text-white">{LANDING_BENTO.darkTitle}</p>
              <p className="mt-1 text-sm text-white/85">{LANDING_BENTO.darkBody}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 py-6 text-center text-[10px] uppercase tracking-widest text-black/40">
        Kokonus Farm — hidroponik · rakit apung
      </footer>
    </div>
  );
}
