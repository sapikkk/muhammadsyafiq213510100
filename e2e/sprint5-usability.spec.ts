import { test, expect } from "@playwright/test";

const demoPassword = process.env.E2E_PASSWORD ?? "KokonusDemo2026";

async function loginAs(
  page: import("@playwright/test").Page,
  email: string,
  home: RegExp,
) {
  await page.goto("/login");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(demoPassword);
  await page.getByRole("button", { name: /masuk/i }).click();
  await page.waitForURL(home);
}

test("T5.1 petani HP: pindah fase batch demo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loginAs(page, "petani@kokonus.farm", /\/petani/);
  await page.goto("/petani/siklus");
  await expect(page.getByText("E2E-S5-DEMO")).toBeVisible();
  await page
    .locator("tr", { hasText: "E2E-S5-DEMO" })
    .getByRole("link", { name: "Pindah fase" })
    .click();
  await page.waitForURL(/\/petani\/siklus\/\d+/);

  const lanjut = page.getByRole("button", { name: /Lanjut ke/i });
  await expect(lanjut).toBeVisible();
  await page.getByRole("checkbox").check();
  await lanjut.click();

  await expect(page.getByText(/Sprout \/ daun/i).first()).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("heading", { name: /Log fase/i })).toBeVisible();
});

test("T5.2 admin: filter jurnal tanggal + cari", async ({ page }) => {
  await loginAs(page, "admin@kokonus.farm", /\/admin/);
  await page.goto("/admin/jurnal");
  await page.locator('input[name="dari"]').fill("2020-01-01");
  await page.locator('input[name="sampai"]').fill("2030-12-31");
  await page.getByRole("button", { name: /Terapkan/i }).click();
  await expect(page.getByText(/sesuai filter/i)).toBeVisible();
  const search = page.getByPlaceholder(/Cari keterangan/i);
  await expect(search).toBeVisible();
  await search.fill("zzz-tidak-ada-xyz");
  await expect(page.getByText(/\d+ baris/)).toBeVisible();
});

test("T5.3 owner: KPI, grafik, pie biaya", async ({ page }) => {
  await loginAs(page, "owner@kokonus.farm", /\/owner/);
  await page.goto("/owner");
  await expect(page.getByText(/Pendapatan vs beban/i)).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("link", { name: /Pie biaya/i })).toBeVisible();
  await page.getByRole("link", { name: /Pie biaya/i }).click();
  await page.waitForURL(/\/owner\/biaya/);
  await expect(page.getByRole("heading", { name: /Breakdown biaya/i })).toBeVisible();
});
