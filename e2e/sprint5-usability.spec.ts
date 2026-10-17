import { test, expect } from "@playwright/test";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

test.describe.configure({ mode: "serial" });

const demoPassword = process.env.E2E_PASSWORD ?? "1";
const root = path.join(__dirname, "..");

function demoSiklusId() {
  if (process.env.E2E_DEMO_SIKLUS_ID?.trim()) {
    return process.env.E2E_DEMO_SIKLUS_ID.trim();
  }
  return fs.readFileSync(path.join(__dirname, ".demo-siklus-id"), "utf8").trim();
}

function resetDemoSiklus() {
  execSync("node scripts/reset-e2e-siklus.js", {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  });
}

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

test.beforeEach(() => {
  resetDemoSiklus();
});

test("T5.1 petani HP: pindah fase batch demo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loginAs(page, "petani@kokonus.farm", /\/petani/);
  const id = demoSiklusId();

  await page.goto(`/petani/siklus/${id}`);
  await expect(page.getByText("E2E-S5-DEMO")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Selada/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Langkah berikutnya/i })).toBeVisible();

  const detail = await page.request.get(`/api/production/${id}/phase`);
  expect(detail.ok()).toBeTruthy();
  const before = await detail.json();
  expect(before.ok).toBe(true);
  expect(before.data.status).toBe("SEMAI");

  const advance = await page.request.put(`/api/production/${id}/phase`, {
    data: { konfirmasi: "on" },
  });
  expect(advance.ok()).toBeTruthy();
  const after = await advance.json();
  expect(after.ok).toBe(true);
  expect(after.data.fase_ke).toBe("SPROUT_DAUN");

  await page.reload();
  await expect(page.getByText(/Sprout \/ daun/i).first()).toBeVisible();
});

test("T5.2 admin: filter jurnal tanggal + cari", async ({ page }) => {
  await loginAs(page, "admin@kokonus.farm", /\/admin/);
  await page.goto("/admin/jurnal");
  await page.locator('input[name="dari"]').fill("2020-01-01");
  await page.locator('input[name="sampai"]').fill("2030-12-31");
  await page.getByRole("button", { name: /Terapkan/i }).click();
  await expect(page.getByText(/sesuai filter/i)).toBeVisible();
  const search = page.getByLabel(/Cari jurnal/i);
  await expect(search).toBeVisible();
  await search.fill("zzz-tidak-ada-xyz");
  await expect(page.getByText(/Tidak ada catatan cocok pencarian/i)).toBeVisible();
});

test("T5.3 owner: KPI, grafik, pie biaya", async ({ page }) => {
  await loginAs(page, "owner@kokonus.farm", /\/owner/);
  await page.goto("/owner");
  await expect(page.getByText(/Pendapatan vs beban/i)).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/owner/biaya");
  await expect(page.getByRole("heading", { name: /Biaya & HPP/i })).toBeVisible();
});
