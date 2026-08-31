/**
 * Generates the site logo mark used for AdSense messaging, social profiles, and
 * anywhere a square icon is needed.
 *
 * Rasterised with sharp for the same reason as the OG images: it is already a
 * dependency and it renders SVG reliably here. Run with `npm run logo`.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public/brand");

const ACCENT = "#d9622b";
const PAPER = "#fbf8f3";
const INK = "#211d1a";

/**
 * A serif H on the accent ground. The letterform is the site's display voice —
 * the whole brand is about writing, so a typographic mark says more than an
 * abstract symbol would, and it stays legible at favicon size.
 */
function mark({ size, bg, fg, radius }) {
  const r = radius ?? Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.62);
  // Optical centring: cap height sits above the true vertical middle.
  const baseline = Math.round(size * 0.5 + fontSize * 0.35);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${bg}"/>
  <text x="50%" y="${baseline}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${fontSize}" font-weight="600" fill="${fg}">H</text>
</svg>`;
}

/** Transparent ground, accent letter — for light surfaces. */
function markBare({ size, fg }) {
  const fontSize = Math.round(size * 0.78);
  const baseline = Math.round(size * 0.5 + fontSize * 0.35);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <text x="50%" y="${baseline}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${fontSize}" font-weight="600" fill="${fg}">H</text>
</svg>`;
}

async function render(svg, name) {
  const out = path.join(OUT_DIR, name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  const { size } = fs.statSync(out);
  console.log(`  ${name}  ${(size / 1024).toFixed(1)} KB`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log("Generated:");

  // Primary: accent ground, cream letter. Reads well on white and dark alike.
  await render(mark({ size: 512, bg: ACCENT, fg: PAPER }), "logo-512.png");
  await render(mark({ size: 256, bg: ACCENT, fg: PAPER }), "logo-256.png");
  await render(mark({ size: 128, bg: ACCENT, fg: PAPER }), "logo-128.png");

  // Inverted: cream ground, accent letter, for dark or busy backgrounds.
  await render(mark({ size: 512, bg: PAPER, fg: ACCENT }), "logo-light-512.png");

  // Ink on cream, for print or single-colour contexts.
  await render(mark({ size: 512, bg: PAPER, fg: INK }), "logo-ink-512.png");

  // Transparent ground.
  await render(markBare({ size: 512, fg: ACCENT }), "logo-transparent-512.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
