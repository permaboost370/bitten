import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";

const SRC_LOGO = "source/logobitten.jpg";
const OUT = "../assets";

// rounded-rect mask SVG for a given size + corner radius
const roundedMask = (size, radius) =>
  Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );

// Upscale + enhance the source logo to a target square size (PNG buffer)
async function enhancedLogo(size) {
  return sharp(SRC_LOGO)
    .resize(size, size, { kernel: "lanczos3", fit: "cover", position: "centre" })
    .modulate({ saturation: 1.08 })
    .sharpen({ sigma: 1, m1: 0.6, m2: 2.2 })
    .png()
    .toBuffer();
}

// Rounded square icon from the logo
async function roundedIcon(size, radius) {
  const base = await enhancedLogo(size);
  return sharp(base)
    .composite([{ input: roundedMask(size, radius), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  // 1) Upscaled hi-res logo (overwrites logobitten.jpg-equivalent in assets) + transparent-corner PNG
  const hires = await enhancedLogo(1024);
  await sharp(hires).jpeg({ quality: 92 }).toFile(`${OUT}/logobitten.jpg`);
  await writeFile(`${OUT}/logo-1024.png`, hires);
  await writeFile(`${OUT}/logo-512.png`, await enhancedLogo(512));

  // 2) Rounded favicon set
  const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];
  for (const s of sizes) {
    const r = Math.round(s * 0.22); // ~22% corner radius
    await writeFile(`${OUT}/favicon-${s}.png`, await roundedIcon(s, r));
  }
  // apple-touch-icon (180, rounded)
  await writeFile(`${OUT}/apple-touch-icon.png`, await roundedIcon(180, 40));
  // primary favicon.png (512 rounded)
  await writeFile(`${OUT}/favicon.png`, await roundedIcon(512, 112));

  // multi-size .ico
  const icoSizes = [16, 32, 48, 64];
  const icoBufs = [];
  for (const s of icoSizes) icoBufs.push(await roundedIcon(s, Math.round(s * 0.22)));
  const ico = await pngToIco(icoBufs);
  await writeFile("../favicon.ico", ico);

  console.log("Logo + favicons done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
