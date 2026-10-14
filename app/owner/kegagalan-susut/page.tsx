import { redirect } from "next/navigation";
import { CrudPageLayout } from "@/components/crud-page-layout";
import { KegagalanSusutOwnerPanel } from "@/components/kegagalan-susut-owner-panel";
import { OWNER_KEGAGALAN_BAGIAN } from "@/lib/owner-kegagalan-susut";

export const dynamic = "force-dynamic";

type Search = { bagian?: string };

export default function OwnerKegagalanSusutPage({ searchParams }: { searchParams: Search }) {
  if (!searchParams.bagian) {
    redirect("/owner/kegagalan-susut?bagian=menunggu");
  }
  const valid = OWNER_KEGAGALAN_BAGIAN.some((b) => b.id === searchParams.bagian);
  if (!valid) {
    redirect("/owner/kegagalan-susut?bagian=menunggu");
  }
  return (
    <CrudPageLayout
      title="Kegagalan & susut"
      list={<KegagalanSusutOwnerPanel bagian={searchParams.bagian} />}
      listTitle="Data & riwayat"
    />
  );
}
