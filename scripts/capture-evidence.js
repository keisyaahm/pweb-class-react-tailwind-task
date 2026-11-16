import puppeteer from "puppeteer";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const evidenceDir = path.resolve(__dirname, "../docs/evidence");

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

async function run() {
  const server = spawn("cmd.exe", ["/c", "npx vite preview --port 4173 --strictPort"], {
    cwd: path.resolve(__dirname, "..")
  });

  await new Promise((resolve) => setTimeout(resolve, 4000));

  const chromePath = fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const BASE_URL = "http://localhost:4173";

  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(evidenceDir, "01-dashboard.png") });

    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "02-products-grid.png") });

    await page.click('button[aria-label="List Mode"]');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(evidenceDir, "03-products-list.png") });

    await page.click('button[aria-label="Grid Mode"]');
    await new Promise((r) => setTimeout(r, 400));

    await page.type('input[placeholder*="Cari berdasarkan nama"]', "pulpen");
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(evidenceDir, "04-search-filter.png") });

    await page.evaluate(() => {
      const resetBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Reset Filter")
      );
      if (resetBtn) resetBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Tambah Produk")
      );
      if (addBtn) addBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.type === "submit"
      );
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(evidenceDir, "05-modal-tambah-validasi.png") });

    await page.type("#product-name", "Webcam Full HD 1080p 60FPS");
    await page.type("#product-sku", "EL-WC-009");
    await page.type("#product-price", "285000");
    await page.type("#product-stock", "15");
    await page.type("#product-desc", "Webcam USB plug and play dengan sensor presisi, autofocus cepat, dan mikrofon stereo.");
    await page.select("#product-category", "Elektronik");

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.type === "submit"
      );
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(evidenceDir, "06-modal-tambah-success.png") });

    await page.evaluate(() => {
      const editBtn = document.querySelector('button[title="Edit Produk"]');
      if (editBtn) editBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(evidenceDir, "07-modal-edit.png") });

    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));

    await page.evaluate(() => {
      const deleteBtn = document.querySelector('button[title="Hapus Produk"]');
      if (deleteBtn) deleteBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(evidenceDir, "08-modal-hapus-konfirmasi.png") });

    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));

    await page.goto(`${BASE_URL}/products/1`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "09-product-detail.png") });

    await page.goto(`${BASE_URL}/products/999`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "10-product-not-found.png") });

    await page.goto(`${BASE_URL}/alamat-salah-tidak-terdaftar`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "11-fallback-404.png") });

    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "12-settings-page.png") });

    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(evidenceDir, "13-responsive-mobile.png") });

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Tambah Produk")
      );
      if (addBtn) addBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(evidenceDir, "14-keyboard-accessibility.png") });
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
    server.kill();
  }
}

run();
