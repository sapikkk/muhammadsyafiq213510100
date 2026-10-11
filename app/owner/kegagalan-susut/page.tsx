import { CrudPageLayout } from "@/components/crud-page-layout";
import { KegagalanSusutOwnerPanel } from "@/components/kegagalan-susut-owner-panel";

export const dynamic = "force-dynamic";

export default function OwnerKegagalanSusutPage() {
  return (
    <CrudPageLayout
      eyebrow="3.0 Pencatatan Kegagalan & Susut"
      title="Kegagalan & susut"
      description="Antrian kegagalan menunggu klasifikasi Admin — susut normal/abnormal mempengaruhi HPP."
      flowSteps={[
        { label: "Kegagalan", detail: "Petani catat per tahap produksi." },
        { label: "Klasifikasi", detail: "Admin di /admin/susut — Owner pantau antrian." },
        { label: "Panen", detail: "Layak vs tidak layak jual — masuk perhitungan susut siklus." },
      ]}
      list={<KegagalanSusutOwnerPanel />}
      listTitle="Menunggu klasifikasi (read-only)"
    />
  );
}
