import type { ReactNode } from "react";
import { OwnerKeuanganChrome } from "@/components/owner-keuangan-chrome";
import ListWithDetailSlotLayout from "@/components/list-with-detail-slot-layout";

export default function OwnerJurnalLayout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return (
    <OwnerKeuanganChrome>
      <ListWithDetailSlotLayout detail={detail}>{children}</ListWithDetailSlotLayout>
    </OwnerKeuanganChrome>
  );
}
