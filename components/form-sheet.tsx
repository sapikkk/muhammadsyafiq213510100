"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type FormSheetProps = {
  title: string;
  description?: string;
  trigger?: ReactNode;
  children: ReactNode | ((helpers: { close: () => void }) => ReactNode);
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Pass true or truthy feedback when server action succeeds to close sheet automatically */
  isSuccess?: boolean;
  className?: string;
  side?: "right" | "left" | "top" | "bottom";
};

export function FormSheet({
  title,
  description,
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  isSuccess,
  className,
  side = "right",
}: FormSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const close = () => handleOpenChange(false);

  useEffect(() => {
    if (isSuccess) {
      handleOpenChange(false);
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
      <SheetContent side={side} className={className}>
        <SheetHeader className="mb-6 space-y-1 border-b pb-4">
          <SheetTitle>{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="py-2">
          {typeof children === "function" ? children({ close }) : children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
