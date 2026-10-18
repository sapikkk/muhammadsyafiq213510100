import Link from "next/link";
import { KokonusBrandMark } from "@/components/kokonus-brand-mark";
import { LANDING_ASSET } from "@/lib/kokonus-landing-content";
import type { LandingBundle } from "@/lib/landing";
import { groupFooterLinks, parseFooterHeadline } from "@/lib/landing-footer-headline";

const arrowOut = `${LANDING_ASSET}/ce81f.svg`;

type Props = {
  konten: LandingBundle["konten"];
  kartu: LandingBundle["kartu"];
  appHref: string;
};

function FooterLinkColumn({
  title,
  items,
}: {
  title: string;
  items: { id: number; judul: string; meta: string | null }[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="min-w-[7.5rem] flex-1 space-y-4">
      <p className="text-base font-semibold tracking-tight">{title}</p>
      <ul className="space-y-1.5 text-sm leading-relaxed">
        {items.map((item) => {
          const href = item.meta?.startsWith("http")
            ? item.meta
            : item.meta?.startsWith("/")
              ? item.meta
              : item.meta
                ? `/${item.meta}`
                : "#";
          const external = href.startsWith("http");
          return (
            <li key={item.id}>
              <Link
                href={href}
                className="kl-muted hover:text-foreground"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.judul}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LandingSportsFooterSection({ konten, kartu, appHref }: Props) {
  const links = kartu.FOOTER;
  const groups = groupFooterLinks(links);
  const headline = parseFooterHeadline(konten.footerJudul);

  return (
    <footer className="kl-panel mx-3 mb-6 mt-8 max-w-[1080px] overflow-hidden sm:mx-auto">
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex max-w-[290px] flex-col justify-between gap-6 lg:min-h-[280px]">
          <div className="relative space-y-6">
            <div className="flex items-center gap-2.5">
              <KokonusBrandMark size={40} mark="icon" alt="" />
              <span className="text-base font-bold uppercase tracking-wide">Kokonus Farm</span>
            </div>
            <p className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              {headline.map((part, i) =>
                part.type === "pill" ? (
                  <span key={i} className="kl-footer-pill mx-0.5 inline-block align-baseline">
                    {part.value}
                  </span>
                ) : (
                  <span key={i}>{part.value}</span>
                ),
              )}
            </p>
            {konten.footerTeks ? (
              <p className="text-sm leading-relaxed kl-muted">{konten.footerTeks}</p>
            ) : null}
          </div>
          {groups.ikon.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {groups.ikon.map((icon) => (
                <Link
                  key={icon.id}
                  href={icon.meta?.startsWith("http") ? icon.meta : icon.meta ?? "#"}
                  className="flex items-center gap-1.5 text-xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={icon.gambar} className="size-[18px]" />
                  <span>{icon.judul}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid min-w-0 flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(210px,263px)] lg:gap-7">
          <FooterLinkColumn title="Modul kebun" items={groups.fasilitas} />
          <FooterLinkColumn title="Tentang" items={groups.tentang} />
          <FooterLinkColumn title="Sosial" items={groups.sosial} />

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <p className="text-base font-semibold tracking-tight">Gabung</p>
            <div className="flex flex-col gap-2">
              <div className="kl-footer-field">Email Anda</div>
              <div className="kl-footer-field">Nama lengkap</div>
              <div className="kl-footer-field">Peran (petani / admin)</div>
              <Link href={appHref} className="kl-footer-cta group">
                <span className="flex-1 text-sm font-semibold">Masuk aplikasi</span>
                <span className="grid size-8 place-items-center rounded-[var(--kl-shape-lg)] bg-background text-foreground">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={arrowOut} className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
