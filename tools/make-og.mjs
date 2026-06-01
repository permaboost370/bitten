import sharp from "sharp";

const W = 1200,
  H = 630;

// Cinematic backrooms background + text, kitten composited on top.
const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="room" cx="62%" cy="40%" r="85%">
      <stop offset="0%" stop-color="#cdbf7a"/>
      <stop offset="45%" stop-color="#9a8f55"/>
      <stop offset="100%" stop-color="#1c1a10"/>
    </radialGradient>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="0.4"/></filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#room)"/>

  <!-- faint wallpaper grid -->
  <g opacity="0.07" stroke="#000" stroke-width="2">
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 95}" y1="0" x2="${i * 95}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 95}" x2="${W}" y2="${i * 95}"/>`).join("")}
  </g>

  <!-- ceiling light strip glow -->
  <rect x="${W * 0.55}" y="40" width="260" height="22" rx="6" fill="#fff7d6" opacity="0.55" filter="url(#soft)"/>

  <rect width="${W}" height="${H}" fill="url(#vig)"/>

  <!-- text block -->
  <text x="64" y="248" font-family="'Arial Black','Helvetica Neue',Arial,sans-serif" font-weight="900"
        font-size="116" fill="#f5e9b6" letter-spacing="-3">$BITTEN</text>
  <text x="68" y="248" font-family="'Arial Black','Helvetica Neue',Arial,sans-serif" font-weight="900"
        font-size="116" fill="#b41e1e" opacity="0.5" letter-spacing="-3">$BITTEN</text>

  <text x="68" y="304" font-family="'Helvetica Neue',Arial,sans-serif" font-weight="700"
        font-size="33" fill="#e9dca0" letter-spacing="9">BACKROOMS KITTEN</text>

  <text x="68" y="382" font-family="'Courier New',monospace" font-size="23" fill="#d8ca8e">
    kitten in the backroom</text>
  <text x="68" y="414" font-family="'Courier New',monospace" font-size="23" fill="#d8ca8e">
    brutally biting the anon</text>

  <rect x="68" y="452" width="540" height="52" rx="10" fill="#0c0b07" opacity="0.62" stroke="#7a6f3e"/>
  <text x="86" y="486" font-family="'Courier New',monospace" font-size="20" fill="#9be39b">
    CA: 42hwVBvYP8FnDKBNDhoinyTB3hSLK6UzwCTDZr5ppump</text>
</svg>`);

const KW = 470;
// feather the left edge of the kitten photo so it blends into the room
const feather = Buffer.from(
  `<svg width="${KW}" height="${KW}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="28%" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><rect width="${KW}" height="${KW}" fill="url(#g)"/></svg>`
);
const kitten = await sharp("../assets/logo-1024.png")
  .resize(KW, KW, { kernel: "lanczos3" })
  .composite([{ input: feather, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(bg)
  .composite([{ input: kitten, left: W - KW - 20, top: Math.round((H - KW) / 2) }])
  .jpeg({ quality: 90 })
  .toFile("../assets/og-image.jpg");

console.log("OG image done.");
