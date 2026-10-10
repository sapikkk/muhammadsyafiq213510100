import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

const auditEnabled =
  process.env.AUDIT_BYPASS_RBAC === "true" && process.env.NODE_ENV !== "production";

test.describe("sidebar audit (lokal only)", () => {
  test.skip(
    !auditEnabled || !!process.env.CI,
    "Butuh AUDIT_BYPASS_RBAC=true di env proses dev server; tidak di CI",
  );

  test("semua link Menu (audit) memuat tanpa error boundary", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[name="email"]').fill("admin@kokonus.farm");
    await page.locator('input[name="password"]').fill(demoPassword);
    await page.getByRole("button", { name: /masuk/i }).click();
    await page.waitForURL(/\/admin/);

    await expect(page.getByText("Menu (audit)")).toBeVisible();

    const hrefs = await page.locator("nav ul a[href]").evaluateAll((anchors) => {
      const set = new Set<string>();
      for (const a of anchors) {
        const href = a.getAttribute("href");
        if (href?.startsWith("/")) set.add(href);
      }
      return Array.from(set).sort();
    });

    expect(hrefs.length).toBeGreaterThan(15);

    for (const href of hrefs) {
      await page.goto(href);
      await expect(page.locator("body")).not.toContainText("Application error");
      await expect(page.locator("body")).not.toContainText("Internal Server Error");
      const title = await page.title();
      expect(title).toContain("Kokonus");
    }
  });
});
