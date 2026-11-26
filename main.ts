// The World in One Image — 26 November 2026.
// Entrypoint for make.fun's news-image-20261126 bounty.
// The infographic is a fixed, verified summary of 26 November 2026 world
// news: thirty-one stories, researched from the day's reporting and laid out as
// a newspaper front page (render.html), screenshotted to image.png.
// This program is deterministic: it copies the fixed image bytes and the
// fixed news data into the output directory, with no network, no clock
// and no randomness, so two runs produce byte-identical output.
//
// Usage: node main.ts [out-dir]
// Defaults: $MAKEFUN_OUTPUT_DIR, else ./out

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.argv[2] ?? process.env.MAKEFUN_OUTPUT_DIR ?? join(repoDir, 'out'));

type Story = { n: number; kicker: string; headline: string; summary: string; stats?: string[] };
type News = { date: string; title: string; sources: string; stories: Story[] };

const b64: string = readFileSync(join(repoDir, 'image.b64'), 'utf8').replace(/\s+/g, '');
const png: Buffer = Buffer.from(b64, 'base64');
const news: News = JSON.parse(readFileSync(join(repoDir, 'news.json'), 'utf8'));

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

mkdirSync(outDir, { recursive: true });

// 1. image.png — the one-image summary itself.
writeFileSync(join(outDir, 'image.png'), png);

// 1b. entry.png — byte-identical copy of image.png; the harness scores
// the artifact named entry.png, so it must be present in the output.
writeFileSync(join(outDir, 'entry.png'), png);

// 2. index.html — the same image, plus a machine-readable list of the
// thirty-one stories it carries, so the content is checkable as text too.
const hero: Story = news.stories[0];
const rest: Story[] = news.stories.slice(1);
const chips: string = (hero.stats ?? []).map((s: string) => `<span>${esc(s)}</span>`).join('');
const items: string = rest
  .map((s: Story) => `<li><b>${s.n}. ${esc(s.kicker)} — ${esc(s.headline)}</b><br>${esc(s.summary)}</li>`)
  .join('\n');
const html: string = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(news.title)}</title>
<style>
  body { margin: 0; background: #f7f3ea; font-family: Georgia, 'Times New Roman', serif; color: #1c1a16; }
  figure { margin: 0 auto; max-width: 1600px; }
  img { display: block; width: 100%; height: auto; }
  main { max-width: 1000px; margin: 0 auto; padding: 32px 24px 48px 24px; }
  h1 { font-size: 30px; margin: 0 0 6px 0; }
  p.lede { font-size: 18px; line-height: 1.5; color: #33302a; }
  .chips span { display: inline-block; border: 2px solid #1c1a16; border-radius: 999px; padding: 4px 14px; margin: 0 10px 8px 0; font-family: Arial, sans-serif; font-size: 15px; font-weight: bold; }
  ol { font-size: 17px; line-height: 1.55; padding-left: 22px; }
  ol li { margin-bottom: 12px; }
  footer { font-size: 14px; color: #6b6455; font-family: Arial, sans-serif; margin-top: 24px; }
</style>
</head>
<body>
<figure><img src="data:image/png;base64,${b64}" alt="${esc(news.title)}" width="1600" height="2000"></figure>
<main>
<h1>${esc(hero.headline)}</h1>
<p class="lede">${esc(hero.summary)}</p>
<p class="chips">${chips}</p>
<ol>
${items}
</ol>
<footer>Sources: ${esc(news.sources)} Figures as reported at the time; claims are attributed to their sources.</footer>
</main>
</body>
</html>
`;
writeFileSync(join(outDir, 'index.html'), html);

// 3. news.json — the verified story data behind the image.
writeFileSync(join(outDir, 'news.json'), JSON.stringify(news, null, 2) + '\n');

console.log(`news-image-20261126 OK — ${news.stories.length} stories, ${news.date}, image.png ${(png.length / 1024).toFixed(0)} KiB`);
