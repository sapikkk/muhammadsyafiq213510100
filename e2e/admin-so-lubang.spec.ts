import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

test("admin penjualan: form SO punya lubang terpakai (v2-D.1)", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin/);

  await page.goto("/admin/penjualan");
  await expect(page.getByRole("heading", { name: /Sales order/i })).toBeVisible();

  const lubangField = page.getByPlaceholder("Lubang terpakai");
  const noBatch = page.getByText(/Tidak ada batch siap jual/);
  await expect(lubangField.or(noBatch).first()).toBeVisible({ timeout: 10_000 });

  if (await lubangField.isVisible()) {
    await expect(page.getByText(/v2-D\.1/i)).toBeVisible();
  }
});
