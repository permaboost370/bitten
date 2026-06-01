# $BITTEN — Backrooms Kitten 🐱🩸

> "kitten in the backroom brutally biting the anon"

The official site for **$BITTEN**, the Backrooms Kitten meme token on Solana — born from the 2019 /x/ "unsettling videos" sighting and now noclipping through the on-chain liminal space.

- **Contract (CA):** `42hwVBvYP8FnDKBNDhoinyTB3hSLK6UzwCTDZr5ppump`
- **Chart:** [Dexscreener](https://dexscreener.com/solana/42hwVBvYP8FnDKBNDhoinyTB3hSLK6UzwCTDZr5ppump)
- **Buy:** [pump.fun](https://pump.fun/coin/42hwVBvYP8FnDKBNDhoinyTB3hSLK6UzwCTDZr5ppump)
- **X / Twitter:** [@BackroomKitten](https://x.com/BackroomKitten)

## Stack
Zero-dependency static site — plain HTML, CSS and JS. Deployed on Vercel.

Cinematic backrooms-horror aesthetic: animated liminal room, fluorescent flicker, film grain, scanlines, glitch title, recovered-footage video, copy-to-clipboard CA, and a live Dexscreener chart embed.

## Structure
```
index.html        # the page
styles.css        # all styling + atmosphere
script.js         # boot screen, copy CA, reveal, video OSD
favicon.ico       # rounded-corner favicon
assets/           # logo (upscaled), favicons, OG image, video, poster
tools/            # build-time asset generation (sharp) + original source files
```

## Regenerate assets
```bash
cd tools && npm install
node process-assets.mjs   # upscale logo + rounded favicons
node make-og.mjs          # 1200x630 social/OG image
```

---
*$BITTEN is a meme coin for entertainment and lore. Not financial advice. DYOR.*
