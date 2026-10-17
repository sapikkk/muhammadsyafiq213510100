import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { loadLandingBundle } from "@/lib/landing";
import { roleHome } from "@/lib/role-home";
import type { Role } from "@/types/role";
import {
  LandingAthleteSection,
  LandingFacilitiesSection,
  LandingFundraisingSection,
  LandingHeroSection,
  LandingSportsFeatureSection,
  LandingSportsFooterSection,
  LandingVerificationSection,
} from "@/components/landing/landing-sections";
import "@/app/styles/kokonus-landing.css";

export async function KokonusLandingPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as Role | undefined;
  const appHref = role ? roleHome[role] : "/login";
  const { konten, kartu } = await loadLandingBundle();

  return (
    <div className="kokonus-landing-ref min-h-dvh bg-background text-foreground">
      <LandingHeroSection konten={konten} kartu={kartu} appHref={appHref} />
      <LandingVerificationSection konten={konten} kartu={kartu} />
      <LandingSportsFeatureSection kartu={kartu} appHref={appHref} />
      <LandingFacilitiesSection kartu={kartu} appHref={appHref} />
      <LandingFundraisingSection konten={konten} kartu={kartu} appHref={appHref} />
      <LandingAthleteSection konten={konten} kartu={kartu} />
      <LandingSportsFooterSection konten={konten} kartu={kartu} appHref={appHref} />
    </div>
  );
}
