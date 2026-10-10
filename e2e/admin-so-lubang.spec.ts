import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

test("admin penjualan: form SO punya lubang terpakai (v2-D.1)", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin/);

  await page.goto("/admin/penjualan");
  await expect(page.getByText(/lubang terpakai/i).first()).toBeVisible();
  await expect(page.getByLabel("Lubang terpakai").first()).toBeVisible();
});
