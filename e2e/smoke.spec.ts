import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

test("halaman login tampil", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /masuk/i })).toBeVisible();
});

test("login admin mengarah ke dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin(\/)?$/);
  await expect(page.getByText(/Admin/i).first()).toBeVisible();
});

async function loginAdmin(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@kokonus.farm");
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(/\/admin/);
}

test("admin stok rendah memuat tabel", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/stok-rendah");
  await expect(page.getByRole("heading", { name: /Alert stok minimum/i })).toBeVisible();
  await expect(page.getByPlaceholder(/Cari kode atau nama item/i)).toBeVisible();
});

test("jurnal admin memuat tabel", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/jurnal");
  await expect(page.getByRole("heading", { name: /^Jurnal$/ })).toBeVisible();
  await expect(page.getByPlaceholder(/Cari keterangan/i)).toBeVisible();
});
