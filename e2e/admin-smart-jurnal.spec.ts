import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

test("admin jurnal baru: tab Smart Jurnal v2-F.1", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin/);

  await page.goto("/admin/jurnal/baru");
  await expect(page.getByRole("heading", { name: /Catat uang masuk/i })).toBeVisible();
  await expect(
    page.getByText(/Penjualan sayur, panen, dan penyusutan tidak perlu/i),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Jurnal manual" })).toHaveCount(0);
});
