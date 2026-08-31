import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourcePath = resolve("src/data/portfolioAnalysisCoverAsset.ts");
const outputPath = resolve("public/projects/portfolio-analysis/portfolio-analysis-cover.webp");
const source = await readFile(sourcePath, "utf8");
const stringParts = [...source.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
const dataUrl = stringParts.join("");
const prefix = "data:image/webp;base64,";

if (!dataUrl.startsWith(prefix)) {
  throw new Error("Portfolio Analysis cover source is invalid");
}

const image = Buffer.from(dataUrl.slice(prefix.length), "base64");
if (image.length < 10000 || image.subarray(0, 4).toString("ascii") !== "RIFF") {
  throw new Error("Portfolio Analysis cover failed WebP validation");
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, image);
console.log(`Materialized Portfolio Analysis cover: ${image.length} bytes`);
