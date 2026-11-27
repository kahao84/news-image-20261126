// The World in One Image — 26 November 2026
// Entry program: restores the broadsheet image from its single-line base64
// copy and writes the outputs the grader reads. Deterministic: no clock,
// no network, no randomness — the same input bytes give the same outputs.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? here;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");

const b64 = readFileSync(join(inputDir, "image.b64"), "utf8").replace(/\s+/g, "");
const png = Buffer.from(b64, "base64");
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "image.png"), png);
writeFileSync(join(outputDir, "entry.png"), png);
const html = readFileSync(join(inputDir, "render.html"), "utf8");
writeFileSync(join(outputDir, "index.html"), html);
const news = readFileSync(join(inputDir, "news.json"), "utf8");
writeFileSync(join(outputDir, "news.json"), news);
