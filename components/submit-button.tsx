"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

export function SubmitButton({
  pendingLabel,
  children,
  ...props
}: ButtonProps & { pendingLabel: string }) {
  const { pending } = useFormStatus();
  const { disabled: disabledProp, ...rest } = props;
  return (
    <Button type="submit" disabled={pending || disabledProp} {...rest}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
