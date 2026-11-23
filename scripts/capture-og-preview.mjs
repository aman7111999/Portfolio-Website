import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(path.join(process.env.OG_NODE_MODULES, "capture.cjs"));
const { chromium } = require("playwright");
const sharp = require("sharp");

const siteUrl = process.env.SITE_URL || "https://amanux.vercel.app";
const outputPath = path.resolve("public/og-preview.png");
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
