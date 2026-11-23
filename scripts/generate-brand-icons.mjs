import { createRequire } from "node:module";
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const require = createRequire(path.join(process.env.ICON_NODE_MODULES, "generate.cjs"));
const sharp = require("sharp");

const publicDir = path.resolve("public");
const brandSvg = readFileSync(path.join(publicDir, "favicon.svg"));

async function renderBrandIcon(size) {
  return sharp(brandSvg, { density: 768 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const icon192 = await renderBrandIcon(192);
const icon512 = await renderBrandIcon(512);
const appleIcon = await renderBrandIcon(180);
const faviconPng = await renderBrandIcon(48);

writeFileSync(path.join(publicDir, "icon-192.png"), icon192);
writeFileSync(path.join(publicDir, "icon-512.png"), icon512);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleIcon);

// A standard ICO container with an embedded 48px PNG for legacy browsers.
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(48, 0);
icoEntry.writeUInt8(48, 1);
icoEntry.writeUInt8(0, 2);
icoEntry.writeUInt8(0, 3);
icoEntry.writeUInt16LE(1, 4);
icoEntry.writeUInt16LE(32, 6);
icoEntry.writeUInt32LE(faviconPng.length, 8);
icoEntry.writeUInt32LE(22, 12);

writeFileSync(
  path.join(publicDir, "favicon.ico"),
  Buffer.concat([icoHeader, icoEntry, faviconPng]),
);

console.log("Generated portfolio-branded Android, iOS, and browser icons from public/favicon.svg.");
