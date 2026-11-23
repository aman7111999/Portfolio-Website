import { createRequire } from "node:module";
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(path.join(process.env.OG_NODE_MODULES, "capture.cjs"));
const { chromium } = require("playwright");
const sharp = require("sharp");

const siteUrl = process.env.SITE_URL || "https://amanux.vercel.app";
const outputPath = path.resolve("public/og-preview.png");

const publicDir = path.resolve("public");
const brandSvg = readFileSync(path.join(publicDir, "favicon.svg"));

async function renderBrandIcon(size) {
  return sharp(brandSvg, { density: 768 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Regenerate every installable and browser icon from the portfolio's own AM mark.
// This prevents an old builder-provided favicon or PWA icon from surviving in caches.
const icon192 = await renderBrandIcon(192);
const icon512 = await renderBrandIcon(512);
const appleIcon = await renderBrandIcon(180);
const faviconPng = await renderBrandIcon(48);

writeFileSync(path.join(publicDir, "icon-192.png"), icon192);
writeFileSync(path.join(publicDir, "icon-512.png"), icon512);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleIcon);

// ICO container with an embedded 48px PNG image for legacy browser support.
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // icon resource
icoHeader.writeUInt16LE(1, 4); // image count

const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(48, 0); // width
icoEntry.writeUInt8(48, 1); // height
icoEntry.writeUInt8(0, 2); // palette size
icoEntry.writeUInt8(0, 3); // reserved
icoEntry.writeUInt16LE(1, 4); // color planes
icoEntry.writeUInt16LE(32, 6); // bits per pixel
icoEntry.writeUInt32LE(faviconPng.length, 8); // image byte length
icoEntry.writeUInt32LE(22, 12); // image offset after header + entry
writeFileSync(path.join(publicDir, "favicon.ico"), Buffer.concat([icoHeader, icoEntry, faviconPng]));

console.log("Regenerated browser, Android, and iOS icons from the Aman Mishra AM brand mark.");

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 840 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    reducedMotion: "reduce",
  });

  let verifiedHeading = "";
  let lastError = null;

  // Vercel deploys in parallel with this workflow. Retry until the new hero is live.
  for (let attempt = 1; attempt <= 24; attempt += 1) {
    try {
      await page.goto(siteUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
      await page.locator("h1").first().waitFor({ state: "visible", timeout: 20_000 });
      verifiedHeading = await page.locator("h1").first().innerText();
      if (/5 years/i.test(verifiedHeading)) break;
    } catch (error) {
      lastError = error;
    }

    if (attempt < 24) await page.waitForTimeout(10_000);
  }

  if (!/5 years/i.test(verifiedHeading)) {
    throw new Error(
      `The deployed hero did not show the updated five-year headline. Last heading: "${verifiedHeading}". ${lastError ? String(lastError) : ""}`,
    );
  }

  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  });
  await page.waitForTimeout(900);

  const screenshot = await page.screenshot({
    type: "png",
    fullPage: false,
    animations: "disabled",
  });

  await sharp(screenshot)
    .resize(1200, 630, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const dimensions = await sharp(outputPath).metadata();
  if (dimensions.width !== 1200 || dimensions.height !== 630) {
    throw new Error(`Unexpected preview dimensions: ${dimensions.width}x${dimensions.height}`);
  }
  console.log(`Captured ${siteUrl}: "${verifiedHeading}" -> ${outputPath} (1200x630)`);
} finally {
  await browser.close();
}
