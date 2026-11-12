// One-off utility: recolor purple/lavender/magenta regions toward the brand
// orange (--primary-color #ff7425) without touching skin, red hair, or pink UI.
//
// Usage:
//   node plans/scripts/recolor-agency-images.mjs <input.jpg> [output.jpg] [--preview]
//
// With no output path the file is rewritten in place. --preview writes next to
// the input with a -orange suffix instead, so results can be compared safely.

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

// --- target ----------------------------------------------------------------
// #ff7425 exactly: r255 g116 b37 -> h 21.7deg, s 1.0, l 0.573
// (saturation must be 1.0; 0.855 produces a washed-out salmon #ec9462)
const TARGET_HUE = 21.7;
const TARGET_SAT = 1.0;
const TARGET_L = 0.573;

// Lightness is normalised against a blurred local mean rather than forced flat.
// Flat background areas (whose blurred mean equals their own lightness) land
// exactly on TARGET_L, while gradients and the shirt's folds keep their
// relative shading because only the offset from the local mean is preserved.
const BLUR_SIGMA = 12;

// --- hue window that gets remapped ---------------------------------------
// Measured backgrounds:
//   images1.jpg  hue 256-264 (sat 0.43-0.65, lum 0.78-0.85)
//   banner.jpg   hue 286     (sat 0.50,    lum 0.66)
// JPEG 4:2:0 chroma subsampling drags background pixels near the subject and
// near white UI text down to ~240, which used to fall outside the window and
// survive as blocky lavender patches. The window therefore starts at 232.
// Protected: blue UI/logos at 210-225, skin at 12-45, red hair and LIVE badge
// at 348-10, pink hearts at ~346. The high edge stops at 334 so hearts survive.
const HUE_LO = 232;
const HUE_HI = 334;
const HUE_FEATHER = 20; // degrees of soft edge inside each boundary

// --- guards so neutrals and near-white UI stay neutral --------------------
const SAT_MIN = 0.075; // below this the pixel is basically grey
const SAT_FEATHER = 0.12;

// Near-black shadows and near-white surfaces keep their exact tone.
const L_LO = [0.04, 0.14];
const L_HI = [0.86, 0.96];

// ---------------------------------------------------------------------------

function smoothstep(edge0, edge1, x) {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** rgb 0-255 -> [h 0-360, s 0-1, l 0-1] */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return [0, 0, l];

  const s = d / (1 - Math.abs(2 * l - 1));

  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;

  h *= 60;
  if (h < 0) h += 360;
  return [h, s, l];
}

/** [h 0-360, s 0-1, l 0-1] -> [r, g, b] 0-255 */
function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function maskWeight(h, s, l) {
  const hueW =
    smoothstep(HUE_LO, HUE_LO + HUE_FEATHER, h) *
    (1 - smoothstep(HUE_HI - HUE_FEATHER, HUE_HI, h));

  if (hueW === 0) return 0;

  const satW = smoothstep(SAT_MIN, SAT_MIN + SAT_FEATHER, s);
  if (satW === 0) return 0;

  const lW =
    smoothstep(L_LO[0], L_LO[1], l) * (1 - smoothstep(L_HI[0], L_HI[1], l));

  return hueW * satW * lW;
}

async function recolor(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data); // working copy

  // Blurred copy used as the local lightness reference for normalisation.
  const { data: blurData } = await sharp(inputPath)
    .ensureAlpha()
    .blur(BLUR_SIGMA)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let changed = 0;
  const total = width * height;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);
    const w = maskWeight(h, s, l);
    if (w === 0) continue;

    // Local mean lightness from the blurred copy.
    const [, , lb] = rgbToHsl(
      blurData[i],
      blurData[i + 1],
      blurData[i + 2]
    );

    // Shift lightness so this pixel's local area centres on the brand value,
    // while the pixel's own deviation from that local mean is preserved.
    let newL = l + (TARGET_L - lb);
    newL = Math.min(1, Math.max(0, newL));

    const [nr, ng, nb] = hslToRgb(TARGET_HUE, TARGET_SAT, newL);

    out[i] = Math.round(r + (nr - r) * w);
    out[i + 1] = Math.round(g + (ng - g) * w);
    out[i + 2] = Math.round(b + (nb - b) * w);
    changed++;
  }

  // 4:4:4 keeps full chroma so large flat orange fields stay smooth instead of
  // picking up the blocky chroma artifacts that 4:2:0 adds on top of the source.
  await sharp(out, { raw: { width, height, channels } })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);

  const pct = ((changed / total) * 100).toFixed(1);
  console.log(
    `${path.basename(inputPath)} -> ${path.basename(outputPath)}  ` +
      `${width}x${height}  remapped ${changed.toLocaleString()} px (${pct}%)`
  );
}

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const isPreview = process.argv.includes("--preview");

if (args.length === 0) {
  console.error("Usage: node recolor-agency-images.mjs <input.jpg> [output.jpg]");
  process.exit(1);
}

const input = args[0];
const output = isPreview
  ? path.join(
      path.dirname(input),
      `${path.basename(input, path.extname(input))}-orange${path.extname(input)}`
    )
  : args[1] || input;

await fs.access(input);
await recolor(input, output);
