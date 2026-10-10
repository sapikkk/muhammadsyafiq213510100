import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

test("admin akuntansi: period lock + penyusutan form", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin/);

  await page.goto("/admin/akuntansi");
  await expect(page.getByRole("heading", { name: /Pengaturan akuntansi/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Catat penyusutan bulan/i })).toBeVisible({
    timeout: 15_000,
  });
});
