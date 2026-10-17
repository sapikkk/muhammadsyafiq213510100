"use client";

import { Banknote, MoreHorizontal, Package, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFormState } from "react-dom";
import {
  cancelSalesOrderAction,
  catatDpSalesOrderAction,
  catatPelunasanSalesOrderAction,
  confirmSalesOrderAction,
  deliverSalesOrderAction,
  recordPackingCostAction,
  shipSalesOrderAction,
} from "@/app/actions/sales-order";
import { KasSumberSelect } from "@/components/kas-sumber-select";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import type { RekeningKasOption } from "@/lib/rekening-kas-types";
import type { SoRow } from "@/lib/sales-order-detail-types";
import {
  adminPrimarySalesOrderStep,
  adminShowCancel,
  adminShowCatatDp,
  adminShowPackingForm,
  pengirimanPrimaryStep,
  type SalesOrderAdminPrimary,
} from "@/lib/sales-order-admin-step";

function PelunasanForm({ id, rekeningOptions }: { id: number; rekeningOptions: RekeningKasOption[] }) {
  const [state, formAction] = useFormState(catatPelunasanSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="nominal" placeholder="Nominal pelunasan (Rp)" className="h-11" required />
      <KasSumberSelect rekeningOptions={rekeningOptions} />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…">
        Simpan pelunasan
      </SubmitButton>
    </form>
  );
}

function CatatDpForm({ id, rekeningOptions }: { id: number; rekeningOptions: RekeningKasOption[] }) {
  const [state, formAction] = useFormState(catatDpSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <KasSumberSelect rekeningOptions={rekeningOptions} />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…">
        Catat uang muka
      </SubmitButton>
    </form>
  );
}

function ConfirmForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(confirmSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction}>
      <input type="hidden" name="salesOrderId" value={id} />
      <SubmitButton className="h-11" pendingLabel="…">
        Konfirmasi stok
      </SubmitButton>
    </form>
  );
}

function ShipForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(shipSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="catatan" placeholder="Catatan kirim (opsional)" className="h-11" />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…">
        Tandai sudah kirim
      </SubmitButton>
    </form>
  );
}

function DeliverForm({ id, rekeningOptions }: { id: number; rekeningOptions: RekeningKasOption[] }) {
  const [state, formAction] = useFormState(deliverSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="catatan" placeholder="Catatan serah terima (opsional)" className="h-11" />
      <Input
        name="uangDiterima"
        inputMode="decimal"
        placeholder="Uang diterima (kosong = lunas penuh)"
        className="h-11"
      />
      <KasSumberSelect rekeningOptions={rekeningOptions} />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…">
        Tandai sudah sampai
      </SubmitButton>
    </form>
  );
}

function PackingCostForm({
  id,
  defaultValue,
  rekeningOptions,
}: {
  id: number;
  defaultValue: string;
  rekeningOptions: RekeningKasOption[];
}) {
  const [state, formAction] = useFormState(recordPackingCostAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input
        name="biayaPacking"
        type="text"
        inputMode="decimal"
        defaultValue={defaultValue === "0" ? "" : defaultValue}
        placeholder="Biaya packing (Rp)"
        className="h-11"
      />
      <KasSumberSelect rekeningOptions={rekeningOptions} />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…">
        Catat biaya packing
      </SubmitButton>
    </form>
  );
}

function CancelForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(cancelSalesOrderAction, {});
  useActionToast({ error: state.error, ok: state.ok });
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="salesOrderId" value={id} />
      <Input name="alasan" placeholder="Alasan pembatalan" className="h-11" required />
      <SubmitButton className="h-11 w-full sm:w-auto" pendingLabel="…" variant="destructive">
        Batalkan pesanan
      </SubmitButton>
    </form>
  );
}

const PRIMARY_LABEL: Record<Exclude<SalesOrderAdminPrimary, null>, string> = {
  confirm: "Konfirmasi stok",
  ship: "Tandai sudah kirim",
  deliver: "Tandai sudah sampai",
  pelunasan: "Catat pelunasan",
};

function PrimaryDialog({
  kind,
  row,
  rekeningOptions,
}: {
  kind: Exclude<SalesOrderAdminPrimary, null> | "ship" | "deliver";
  row: SoRow;
  rekeningOptions: RekeningKasOption[];
}) {
  const [open, setOpen] = useState(false);
  const label =
    kind === "confirm"
      ? PRIMARY_LABEL.confirm
      : kind === "ship"
        ? PRIMARY_LABEL.ship
        : kind === "deliver"
          ? PRIMARY_LABEL.deliver
          : PRIMARY_LABEL.pelunasan;

  if (kind === "confirm") {
    return <ConfirmForm id={row.id} />;
  }

  return (
    <>
      <Button type="button" className="h-11" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            {kind === "ship" ? <ShipForm id={row.id} /> : null}
            {kind === "deliver" ? (
              <DeliverForm id={row.id} rekeningOptions={rekeningOptions} />
            ) : null}
            {kind === "pelunasan" ? (
              <PelunasanForm id={row.id} rekeningOptions={rekeningOptions} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function LainnyaMenu({ items }: { items: { key: string; label: string; icon: ReactNode; body: ReactNode; title: string }[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  if (items.length === 0) return null;
  const active = items.find((i) => i.key === activeKey);

  return (
    <>
      <div ref={wrapRef} className="relative shrink-0">
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-1.5 px-3"
          aria-expanded={menuOpen}
          aria-label="Aksi lain"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Lainnya</span>
        </Button>
        {menuOpen ? (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-md border border-border bg-card p-1 shadow-md">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveKey(item.key);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {active ? (
        <Dialog open={Boolean(activeKey)} onOpenChange={(o) => !o && setActiveKey(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{active.title}</DialogTitle>
            </DialogHeader>
            <div className="pt-2">{active.body}</div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}

export function SalesOrderDetailActions({
  row,
  mode,
  rekeningOptions = [],
}: {
  row: SoRow;
  mode: "admin" | "pengiriman" | "owner";
  rekeningOptions?: RekeningKasOption[];
}) {
  if (mode === "owner") return null;

  const adminPrimary = mode === "admin" ? adminPrimarySalesOrderStep(row) : null;
  const pengirimanPrimary = mode === "pengiriman" ? pengirimanPrimaryStep(row) : null;

  const lainnya: {
    key: string;
    label: string;
    icon: ReactNode;
    title: string;
    body: ReactNode;
  }[] = [];

  if (mode === "admin") {
    if (adminShowCatatDp(row) && adminPrimary !== "pelunasan") {
      lainnya.push({
        key: "dp",
        label: "Catat uang muka",
        icon: <Banknote className="h-4 w-4 shrink-0" aria-hidden />,
        title: "Catat uang muka",
        body: <CatatDpForm id={row.id} rekeningOptions={rekeningOptions} />,
      });
    }
    if (adminShowPackingForm(row)) {
      lainnya.push({
        key: "packing",
        label: "Biaya packing",
        icon: <Package className="h-4 w-4 shrink-0" aria-hidden />,
        title: "Catat biaya packing",
        body: (
          <PackingCostForm
            id={row.id}
            defaultValue={row.biaya_packing ?? "0"}
            rekeningOptions={rekeningOptions}
          />
        ),
      });
    }
    if (adminShowCancel(row)) {
      lainnya.push({
        key: "cancel",
        label: "Batalkan pesanan",
        icon: <XCircle className="h-4 w-4 shrink-0" aria-hidden />,
        title: "Batalkan pesanan",
        body: <CancelForm id={row.id} />,
      });
    }
  }

  const primaryKind = adminPrimary ?? pengirimanPrimary;
  if (!primaryKind && lainnya.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {primaryKind ? (
        <PrimaryDialog kind={primaryKind} row={row} rekeningOptions={rekeningOptions} />
      ) : (
        <p className="text-sm text-muted-foreground">Tidak ada langkah wajib — cek riwayat di bawah.</p>
      )}
      <LainnyaMenu items={lainnya} />
    </div>
  );
}
