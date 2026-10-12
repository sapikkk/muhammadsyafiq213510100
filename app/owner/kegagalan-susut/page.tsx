import { CrudPageLayout } from "@/components/crud-page-layout";
import { KegagalanSusutOwnerPanel } from "@/components/kegagalan-susut-owner-panel";

export const dynamic = "force-dynamic";

export default function OwnerKegagalanSusutPage() {
  return (
    <CrudPageLayout
      title="Kegagalan & susut"
      list={<KegagalanSusutOwnerPanel />}
      listTitle="Menunggu klasifikasi (hanya lihat)"
    />
  );
}
