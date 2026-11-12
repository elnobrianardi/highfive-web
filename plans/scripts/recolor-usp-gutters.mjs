// Replace the flat pink gutter background of the USP collage with the same
// warm orange used by the About Us banner image (#ec9462).
//
// The collage is not a single flat field: a pink dress, a flamingo, and several
// magenta tiles share the gutter's hue. A global hue remap would wreck them.
// This therefore does a border-seeded flood fill: only gutter pixels that are
// connected to the image edge are repainted, so every photo tile is untouched.
//
// Usage:
//   node plans/scripts/recolor-usp-gutters.mjs <input.webp> [--preview]

import sharp from "sharp";
import path from "node:path";

// Gutter colour measured from the source: #e83278
const PINK = [0xe8, 0x32, 0x78];
// Target measured from public/images/agency/banner.jpg: #ec9462
const TARGET = [0xec, 0x94, 0x62];

// Tight enough that tile content never matches, loose enough to absorb the
// webp chroma noise inside the flat gutter.
const TOLERANCE = 42;
// Halo pass: pixels bordering the fill that are still pinkish get blended.
const HALO_TOLERANCE = 85;
const HALO_BLEND = 0.65;

function dist2(data, i, c) {
  const dr = data[i] - c[0];
  const dg = data[i + 1] - c[1];
  const db = data[i + 2] - c[2];
  return dr * dr + dg * dg + db * db;
}

function recolor(input, output) {
  return sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { width, height, channels } = info;
      const total = width * height;
      const out = Buffer.from(data);

      const tol2 = TOLERANCE * TOLERANCE;
      const visited = new Uint8Array(total);
      const queued = new Uint8Array(total);
      const stack = new Int32Array(total);
      let sp = 0;

      const push = (p) => {
        if (queued[p]) return;
        queued[p] = 1;
        stack[sp++] = p;
      };

      // Seed from every border pixel that looks like the gutter.
      for (let x = 0; x < width; x++) {
        const top = x;
        const bottom = (height - 1) * width + x;
        if (dist2(data, top * channels, PINK) <= tol2) push(top);
        if (dist2(data, bottom * channels, PINK) <= tol2) push(bottom);
      }
      for (let y = 0; y < height; y++) {
        const left = y * width;
        const right = y * width + width - 1;
        if (dist2(data, left * channels, PINK) <= tol2) push(left);
        if (dist2(data, right * channels, PINK) <= tol2) push(right);
      }

      let filled = 0;

      // Iterative 4-neighbour flood fill.
      while (sp > 0) {
        const p = stack[--sp];
        if (visited[p]) continue;
        visited[p] = 1;

        const i = p * channels;
        if (dist2(data, i, PINK) > tol2) continue;

        out[i] = TARGET[0];
        out[i + 1] = TARGET[1];
        out[i + 2] = TARGET[2];
        filled++;

        const x = p % width;
        const y = (p / width) | 0;
        if (x > 0) push(p - 1);
        if (x < width - 1) push(p + 1);
        if (y > 0) push(p - width);
        if (y < height - 1) push(p + width);
      }

      // Soften the 1px anti-aliased halo left at tile boundaries: pixels next
      // to a filled area that are still pinkish get a partial blend so the
      // tile edges do not keep a magenta fringe.
      let halo = 0;
      const halo2 = HALO_TOLERANCE * HALO_TOLERANCE;
      for (let p = 0; p < total; p++) {
        if (!visited[p]) continue;
        const x = p % width;
        const y = (p / width) | 0;
        const neighbours = [];
        if (x > 0) neighbours.push(p - 1);
        if (x < width - 1) neighbours.push(p + 1);
        if (y > 0) neighbours.push(p - width);
        if (y < height - 1) neighbours.push(p + width);

        for (const q of neighbours) {
          if (visited[q]) continue;
          const j = q * channels;
          const d2 = dist2(data, j, PINK);
          if (d2 > halo2) continue;

          const strength = HALO_BLEND * (1 - Math.sqrt(d2) / HALO_TOLERANCE);
          if (strength <= 0) continue;

          out[j] = Math.round(data[j] + (TARGET[0] - data[j]) * strength);
          out[j + 1] = Math.round(data[j + 1] + (TARGET[1] - data[j + 1]) * strength);
          out[j + 2] = Math.round(data[j + 2] + (TARGET[2] - data[j + 2]) * strength);
          halo++;
        }
      }

      const pct = ((filled / total) * 100).toFixed(1);
      console.log(
        `${path.basename(input)} -> ${path.basename(output)}  ${width}x${height}  ` +
          `gutter ${filled.toLocaleString()} px (${pct}%), halo softened ${halo.toLocaleString()} px`
      );

      return sharp(out, { raw: { width, height, channels } })
        .webp({ quality: 92, effort: 6 })
        .toFile(output);
    });
}

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const isPreview = process.argv.includes("--preview");

if (args.length === 0) {
  console.error("Usage: node recolor-usp-gutters.mjs <input.webp> [--preview]");
  process.exit(1);
}

const input = args[0];
const output = isPreview
  ? path.join(
      path.dirname(input),
      `${path.basename(input, path.extname(input))}-orange${path.extname(input)}`
    )
  : args[1] || input;

await recolor(input, output);
