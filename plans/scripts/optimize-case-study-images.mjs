// One-off converter for the homepage case-study card art.
// Source PNGs are 1000-1700 KB each; the cards render at most ~560 CSS px wide,
// so 1200 px WebP at q=80 is visually identical at 2x and ~10x lighter.
//
// Usage: node plans/scripts/optimize-case-study-images.mjs

import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const TARGET_WIDTH = 1200;
const QUALITY = 80;

const files = [
  "public/images/case-study/nutrijell.png",
  "public/images/case-study/kredivo.png",
  "public/images/case-study/top-coffee.png",
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of files) {
  const out = file.replace(/\.png$/i, ".webp");

  const before = (await stat(file)).size;

  const info = await sharp(file)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;

  console.log(
    `${path.basename(file)} ${info.width}x${info.height}  ${kb(before)} -> ${path.basename(
      out
    )} ${kb(after)}  (${Math.round((after / before) * 100)}%)`
  );
}
