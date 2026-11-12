// Contoh warna rata-rata (edge & full) dari aset PNG kartu case study.
// Dipakai untuk memutuskan dari mana warna overlay sebaiknya diambil.
import fs from "node:fs";
import zlib from "node:zlib";

const decodePng = (file) => {
  const buf = fs.readFileSync(file);
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + len);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + len;
  }

  if (bitDepth !== 8) throw new Error(`bitDepth ${bitDepth} tidak didukung`);
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (!channels) throw new Error(`colorType ${colorType} tidak didukung`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    const cur = out.subarray(y * stride, (y + 1) * stride);

    for (let x = 0; x < stride; x += 1) {
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= channels ? prev[x - channels] : 0;
      const v = line[x];

      let val;
      if (filter === 0) val = v;
      else if (filter === 1) val = v + a;
      else if (filter === 2) val = v + b;
      else if (filter === 3) val = v + ((a + b) >> 1);
      else {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        val = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      }
      cur[x] = val & 0xff;
    }
  }

  return { width, height, channels, pixels: out };
};

const average = (img, edgeOnly) => {
  const { width, height, channels, pixels } = img;
  const pad = Math.round(Math.min(width, height) * 0.08);
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (edgeOnly) {
        const onEdge =
          x < pad || x >= width - pad || y < pad || y >= height - pad;
        if (!onEdge) continue;
      }
      const i = (y * width + x) * channels;
      if (channels === 4 && pixels[i + 3] < 128) continue;
      r += pixels[i];
      g += pixels[i + 1];
      b += pixels[i + 2];
      count += 1;
    }
  }

  if (!count) return null;
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
};

const luminance = ([r, g, b]) => {
  const lin = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const files = [
  "public/images/case-study/nutrijell.png",
  "public/images/case-study/top-coffee.png",
  "public/images/case-study/kredivo.png",
];

for (const file of files) {
  try {
    const img = decodePng(file);
    const full = average(img, false);
    const edge = average(img, true);
    const l = luminance(full);
    console.log(
      `${file}  ${img.width}x${img.height}\n  full ${full}  edge ${edge}  lum ${l.toFixed(3)}  -> ${
        l > 0.35 ? "DARK text" : "WHITE text"
      }`
    );
  } catch (error) {
    console.log(`${file}  (skip: ${error.message})`);
  }
}
