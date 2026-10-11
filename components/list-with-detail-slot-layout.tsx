import type { ReactNode } from "react";

/** Layout paralel `@detail` — daftar + sheet intercept `[id]`. */
export default function ListWithDetailSlotLayout({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  return (
    <>
      {children}
      {detail}
    </>
  );
}
