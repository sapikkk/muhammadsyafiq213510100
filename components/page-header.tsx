import { pageLeadClass, pageTitleClass } from "@/lib/ui-typography";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="min-w-0 space-y-1">
      <h1 className={pageTitleClass}>{title}</h1>
      {description ? <p className={pageLeadClass}>{description}</p> : null}
    </header>
  );
}
