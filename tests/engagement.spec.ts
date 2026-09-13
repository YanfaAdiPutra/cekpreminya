import { test, expect } from "@playwright/test";

test("quiz preserves answers, transfers context and shares the selected plan", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await page.getByRole("button", { name: /Punya keluarga/ }).click();
  await expect(
    page.getByRole("radio", { name: "Punya keluarga" }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Lanjut" }).click();
  await page
    .getByRole("radio", { name: "Penghasilan keluarga & warisan" })
    .check();
  await page.getByRole("button", { name: "Lanjut" }).click();
  await page
    .getByRole("radio", { name: "Asuransi kantor (dengan/tanpa BPJS)" })
    .check();
  await page.getByRole("button", { name: "Lanjut" }).click();
  await page.getByRole("radio", { name: "2 orang", exact: true }).check();
  await page.getByRole("button", { name: "Lanjut" }).click();
  await page.getByRole("radio", { name: "Rp 500 ribu – 1 juta" }).check();
  await page.getByRole("button", { name: "← Kembali", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "2 orang", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Lanjut" }).click();
  await page.getByRole("button", { name: /Lihat ringkasan/ }).click();
  await expect(
    page.getByRole("heading", { name: "Mulai dari asuransi jiwa (warisan)." }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Bandingkan estimasi →/ }).click();
  await expect(page.locator("#calc-product")).toHaveValue("asuransi-jiwa");
  await page.locator("#calc-dob").fill("1994-06-15");
  await page.getByRole("button", { name: "Lihat estimasi premi →" }).click();
  await expect(page.locator(".plan-card")).toHaveCount(3);
  await page.locator(".plan-card").first().getByRole("button").click();
  const href = await page
    .getByRole("link", { name: "Diskusi plan ini ↗" })
    .getAttribute("href");
  const message = new URL(href!).searchParams.get("text")!;
  expect(message).toContain("Punya keluarga");
  expect(message).toContain("2 orang");
  expect(message).toContain("Plan: Dasar");
  expect(message).not.toContain("1994-06-15");
  if (testInfo.project.name === "desktop") {
    await page
      .getByRole("button", { name: /Buka di ponsel dengan QR/ })
      .click();
    await expect(page.getByRole("img", { name: /Kode QR/ })).toBeVisible();
  }
  await page.locator(".plan-handoff").scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("plans.png") });
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "↓ Simpan estimasi" }).click();
  expect((await download).suggestedFilename()).toBe(
    "ringkasan-cekpreminya.txt",
  );
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  expect(errors).toEqual([]);
});

test("calculator rejects invalid age, filters retirement maturity, and updates payment totals", async ({
  page,
}) => {
  await page.goto("./cek-premi/");
  await page.getByRole("button", { name: "Lihat estimasi premi →" }).click();
  await expect(page.locator("#calc-error")).toContainText(
    "tanggal lahir yang valid",
  );
  await page.locator("#calc-product").selectOption("asuransi-dana-pensiun");
  const now = new Date();
  await page.locator("#calc-dob").fill(`${now.getFullYear() - 60}-01-01`);
  await page.getByRole("button", { name: "Lihat estimasi premi →" }).click();
  await expect(page.locator(".plan-card")).toHaveCount(1);
  await expect(page.locator(".plan-card h4")).toHaveText("Cair di 75 Tahun");
  await page.getByRole("button", { name: "Tahunan", exact: true }).click();
  await expect(page.locator(".plan-price")).toContainText("Rp 4.320.000");
  await page.locator("#calc-product").selectOption("asuransi-kesehatan");
  await expect(page.locator(".plan-card")).toHaveCount(0);
});

test("all skipped questions yield an editable result", async ({ page }) => {
  await page.goto("./cek-kebutuhan/");
  for (let i = 0; i < 5; i++)
    await page.getByRole("button", { name: "Lewati", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Mulai dari asuransi kesehatan." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ubah jawaban" }).click();
  await expect(
    page.getByRole("heading", { name: "Kamu sedang di fase apa?" }),
  ).toBeVisible();
});

test("education tools, search, navigation and layout work on the static export", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  await page.locator(".product-photo").scrollIntoViewIfNeeded();
  await expect(page.locator(".product-photo img")).toHaveJSProperty(
    "complete",
    true,
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: testInfo.outputPath("homepage.png"),
    fullPage: true,
  });
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  await page.locator("#faq-search").fill("zzzznoquestion");
  await expect(
    page.getByRole("status").filter({ hasText: "Belum ada jawaban" }),
  ).toBeVisible();
  await page.locator("#faq-search").fill("klaim");
  await expect(page.locator(".faq-list details")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Sudah punya asuransi kantor, berarti selalu cukup?",
    })
    .click();
  await expect(page.locator("#myth-0")).toBeVisible();
  await page.locator("#expenses").fill("10000000");
  await expect(page.locator(".scenario-total strong")).toHaveText(
    "Rp 360.000.000",
  );
  await page.locator("#savings").fill("400000000");
  await expect(page.locator(".scenario-total strong")).toHaveText("Rp 0");
  for (const route of [
    "produk/asuransi-jiwa/",
    "produk/asuransi-kesehatan/",
    "produk/asuransi-kritis/",
    "produk/asuransi-dana-pensiun/",
    "panduan-klaim/",
    "privasi/",
    "tentang-kharis/",
    "artikel/",
    "artikel/sebelum-memilih-asuransi/",
    "artikel/membaca-estimasi-premi/",
  ]) {
    const response = await page.goto(`./${route}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Buka menu navigasi" }).click();
  const nav =
    testInfo.project.name === "mobile"
      ? page.locator("header nav").last()
      : page.getByRole("navigation", { name: "Navigasi utama" });
  await nav.getByRole("link", { name: "Produk", exact: true }).click();
  await expect(page).toHaveURL(/\/cekpreminya\/#produk$/);
});
