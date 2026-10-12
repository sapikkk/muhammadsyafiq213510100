import { CrudPageLayout } from "@/components/crud-page-layout";
import { KegagalanSusutOwnerPanel } from "@/components/kegagalan-susut-owner-panel";

export const dynamic = "force-dynamic";

export default function OwnerKegagalanSusutPage() {
  return (
    <CrudPageLayout
      eyebrow="3.0 Pencatatan Kegagalan & Susut"
      title="Kegagalan & susut"
      list={<KegagalanSusutOwnerPanel />}
      listTitle="Menunggu klasifikasi (hanya lihat)"
    />
  );
}
