import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Entry point: rebuilds the PNG from its single-line base64 form and
// copies the page and the story data into the output directory.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const inputDir = process.env.MAKEFUN_INPUT_DIR || scriptDir;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outputDir, { recursive: true });

const b64 = readFileSync(join(inputDir, "image.b64"), "utf8").replace(/\s/g, "");
const png = Buffer.from(b64, "base64");
writeFileSync(join(outputDir, "entry.png"), png);
writeFileSync(join(outputDir, "image.png"), png);

const html = readFileSync(join(inputDir, "render.html"), "utf8");
writeFileSync(join(outputDir, "index.html"), html);

const news = readFileSync(join(inputDir, "news.json"), "utf8");
writeFileSync(join(outputDir, "news.json"), news);
