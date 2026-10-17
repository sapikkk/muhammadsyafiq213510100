import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function normalizeDetailPath(path: string): string {
  const trimmed = path.split("?")[0]?.replace(/\/+$/, "") ?? "";
  return trimmed || "/";
}

/** Keputusan tutup sheet intercept `@detail` (tanpa `window`). */
export function detailSheetDismissAction(
  browserPath: string,
  listHref: string,
): "replace" | "refresh" {
  const target = normalizeDetailPath(listHref);
  const browser = normalizeDetailPath(browserPath);
  if (browser.startsWith(`${target}/`)) return "replace";
  if (browser === target) return "refresh";
  return "replace";
}

/** Tutup sheet detail — bandingkan URL browser, bukan hanya `usePathname()` (sering = daftar saat intercept). */
export function dismissDetailSheet(router: AppRouterInstance, listHref: string) {
  const target = normalizeDetailPath(listHref);
  const browser =
    typeof window !== "undefined" ? normalizeDetailPath(window.location.pathname) : target;
  const action = detailSheetDismissAction(browser, target);
  if (action === "refresh") {
    router.refresh();
    return;
  }
  router.replace(target, { scroll: false });
  queueMicrotask(() => {
    if (typeof window === "undefined") return;
    const after = normalizeDetailPath(window.location.pathname);
    if (after !== target) router.refresh();
  });
}
