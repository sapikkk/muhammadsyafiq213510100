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

test("admin DataTable: pelanggan, inventaris, varietas — cari", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/pelanggan");
  const pelangganSearch = page.getByPlaceholder(/Cari pelanggan/i);
  await expect(pelangganSearch).toBeVisible();
  await pelangganSearch.fill("zzz-tidak-ada");
  await expect(page.getByText(/\d+ baris/)).toBeVisible();

  await page.goto("/admin/inventaris");
  await expect(page.getByPlaceholder(/Cari kode atau nama/i)).toBeVisible();

  await page.goto("/admin/varietas");
  await expect(page.getByPlaceholder(/Cari varietas/i)).toBeVisible();
});

test("404 saat login menampilkan shell dan tombol dashboard", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/halaman-tidak-ada-e2e");
  await expect(page.getByRole("heading", { name: /Halaman tidak ada/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Kembali ke dashboard/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Jurnal$/ })).toBeVisible();
});

test("mobile menu: buka navigasi lalu tutup setelah pilih link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loginAdmin(page);
  await page.getByRole("button", { name: /Buka menu/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: /^Jurnal$/ }).click();
  await page.waitForURL(/\/admin\/jurnal/);
  await expect(page.getByRole("dialog")).toBeHidden();
});
