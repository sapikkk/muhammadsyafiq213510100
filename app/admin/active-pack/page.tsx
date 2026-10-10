import Link from "next/link";
import {
  pakaiActivePackAdmin,
  simpanActivePackAdmin,
} from "@/app/actions/active-pack";
import { ActivePackDaftar } from "@/components/active-pack-daftar";
import { ActivePackForm } from "@/components/active-pack-form";
import { ActivePackPakaiForm } from "@/components/active-pack-pakai-form";
import {
  listActivePack,
  serializeActivePack,
  type ActivePackListRow,
} from "@/lib/active-pack";
import { listItemInventaris } from "@/lib/inventaris";

export const dynamic = "force-dynamic";

export default async function AdminActivePackPage() {
  const [items, packsRaw] = await Promise.all([
    listItemInventaris(true),
    listActivePack(false),
  ]);
  const packs: ActivePackListRow[] = packsRaw.map((p) =>
    serializeActivePack(p),
  ) as ActivePackListRow[];

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Admin</p>
        <h1 className="text-3xl font-semibold tracking-tight">Active pack</h1>
        <p className="text-muted-foreground">
          Biaya per unit untuk alokasi HPP nanti (F15).
        </p>
        <Link
          href="/admin"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Kembali ke beranda Admin
        </Link>
      </header>

      <ActivePackDaftar rows={packs} />
      <ActivePackForm items={items} action={simpanActivePackAdmin} />
      <ActivePackPakaiForm packs={packs} action={pakaiActivePackAdmin} />
    </div>
  );
}
