/**
 * Pre-renders Open Graph share images to public/og/*.png.
 *
 * Next's ImageResponse (satori + resvg) fails on this project's toolchain with
 * "colourspace: parameter space not set", so images are rasterised here with
 * sharp instead — which the app already depends on for the Photo Humanizer.
 * Running this ahead of time also means the production build has no image
 * generation step at all: it just serves static files.
 *
 * Run with `npm run og` after adding or retitling an article.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src/content/blog");
const OUT_DIR = path.join(ROOT, "public/og");

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
  paper: "#fbf8f3",
  ink: "#211d1a",
  inkSoft: "#58514a",
  accent: "#d9622b",
  accentDark: "#b34e20",
  teal: "#2f6f5e",
};

const CATEGORY_LABELS = {
  writing: "Writing craft",
  detection: "AI detection",
  photography: "Photography",
  guides: "Practical guides",
};

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Greedy word wrap. Character width is approximated from the font size, which
 * is close enough for a display face at these sizes and avoids needing real
 * font metrics.
 */
function wrap(text, fontSize, maxWidth) {
  const charWidth = fontSize * 0.52;
  const maxChars = Math.floor(maxWidth / charWidth);
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function buildSvg({ eyebrow, title, footerLeft }) {
  // Longer headlines step down so they always fit above the footer.
  const fontSize = title.length > 78 ? 52 : title.length > 50 ? 60 : 70;
  const lines = wrap(title, fontSize, WIDTH - 160).slice(0, 4);
  const lineHeight = Math.round(fontSize * 1.18);
  const blockTop = 190;

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" y="${blockTop + i * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.paper}"/>
  <rect width="${WIDTH}" height="16" fill="${COLORS.accent}"/>
  <text x="80" y="118" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="4" fill="${COLORS.accentDark}">${escapeXml(eyebrow.toUpperCase())}</text>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="600" fill="${COLORS.ink}">${titleTspans}</text>
  <text x="80" y="562" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" fill="${COLORS.inkSoft}">${escapeXml(footerLeft)}</text>
  <text x="${WIDTH - 80}" y="562" text-anchor="end" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="${COLORS.teal}">humanetext.com</text>
</svg>`;
}

async function render(svg, outPath) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Site-wide default, used by the home page and anything without its own.
  await render(
    buildSvg({
      eyebrow: "Humanetext",
      title: "Make AI content sound and look natural",
      footerLeft: "Free tools and guides for writers",
    }),
    path.join(OUT_DIR, "default.png"),
  );
  let count = 1;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const words = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    const label = CATEGORY_LABELS[data.category] ?? "Guides";

    await render(
      buildSvg({
        eyebrow: `Humanetext  ·  ${label}`,
        title: data.title ?? slug,
        footerLeft: `Humanetext Editorial  ·  ${minutes} min read`,
      }),
      path.join(OUT_DIR, `${slug}.png`),
    );
    count++;
  }

  console.log(`Generated ${count} OG images in public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
