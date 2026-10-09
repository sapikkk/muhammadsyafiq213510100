import type { ReactNode } from "react";

export function StateScreen({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {children ? (
        <div className="mt-6 flex flex-col gap-3">{children}</div>
      ) : null}
    </main>
  );
}
