// Sample background hue/saturation distributions to calibrate the recolor mask.
import sharp from "sharp";

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2, d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60; if (h < 0) h += 360;
  return [h, s, l];
}

const file = process.argv[2];
const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Regions that are pure background in each image.
const regions = {
  "images1.jpg": [
    ["top-left bg", 0, 0, 400, 300],
    ["top-right bg", width - 500, 0, 400, 200],
    ["bottom-left bg", 0, height - 400, 400, 300],
  ],
  "banner.jpg": [
    ["top-left bg", 0, 0, 250, 250],
    ["top-right bg", width - 300, 0, 250, 250],
    ["bottom-left bg", 0, height - 300, 250, 250],
  ],
};
const list = regions[file.split(/[\\/]/).pop()] || [["whole", 0, 0, width, height]];

for (const [name, x0, y0, w, h] of list) {
  const hues = [], sats = [], lums = [];
  for (let y = y0; y < Math.min(y0 + h, height); y += 3) {
    for (let x = x0; x < Math.min(x0 + w, width); x += 3) {
      const i = (y * width + x) * channels;
      const [hh, ss, ll] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
      if (ss < 0.05) continue;
      hues.push(hh); sats.push(ss); lums.push(ll);
    }
  }
  hues.sort((a, b) => a - b);
  sats.sort((a, b) => a - b);
  lums.sort((a, b) => a - b);
  const q = (arr, p) => arr[Math.floor(arr.length * p)];
  console.log(
    `${name.padEnd(15)} n=${String(hues.length).padStart(6)}  ` +
    `hue p5/p50/p95=${q(hues,0.05).toFixed(0)}/${q(hues,0.5).toFixed(0)}/${q(hues,0.95).toFixed(0)}  ` +
    `sat p5/p50/p95=${q(sats,0.05).toFixed(2)}/${q(sats,0.5).toFixed(2)}/${q(sats,0.95).toFixed(2)}  ` +
    `lum p5/p50/p95=${q(lums,0.05).toFixed(2)}/${q(lums,0.5).toFixed(2)}/${q(lums,0.95).toFixed(2)}`
  );
}
