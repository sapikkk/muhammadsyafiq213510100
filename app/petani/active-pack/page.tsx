import Link from "next/link";
import {
  pakaiActivePackPetani,
  simpanActivePackPetani,
} from "@/app/actions/active-pack";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackForm } from "@/components/active-pack-form";
import { ActivePackPakaiForm } from "@/components/active-pack-pakai-form";
import { listActivePack } from "@/lib/active-pack";
import { listItemInventaris } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function PetaniActivePackPage() {
  const [items, packs] = await Promise.all([
    listItemInventaris(true),
    listActivePack(false),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Petani</p>
        <h1 className="text-3xl font-semibold tracking-tight">Active pack</h1>
        <Link
          href="/petani"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Petani
        </Link>
      </header>

      <ActivePackDaftar rows={packs} />
      <ActivePackForm items={items} action={simpanActivePackPetani} />
      <ActivePackPakaiForm packs={packs} action={pakaiActivePackPetani} />
    </main>
  );
}
