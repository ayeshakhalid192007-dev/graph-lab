/**
 * Draws public/og-image.png — 1200×630, original artwork in the Blueprint palette.
 *
 * Committed alongside the PNG so the image can be regenerated rather than becoming
 * an unexplained binary, which is what the plan's Task 18 Step 4 asks for. Run it
 * with `npm run build:og`.
 *
 * SVG first, then rasterised with sharp. The geometry is deterministic — dot
 * positions and node coordinates are computed, not hand-placed — so re-running
 * this produces the same picture. Text is the one part that depends on the host's
 * fonts: a machine without a monospace face will substitute one. See D14.
 *
 * Palette and rules are the light Blueprint tokens from app/globals.css, kept in
 * step by hand because a PNG cannot read CSS custom properties. No shadows, no
 * gradients, no glow (C11).
 */
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "og-image.png");

const W = 1200;
const H = 630;
const PAPER = "#f7f5f0";
const SURFACE = "#fffdf8";
const INK = "#16324f";
const GRAPHITE = "#3d4450";
const MUTED = "#6b7280";
const RULE = "#cfc9bd";
const ACCENT = "#1d4ed8";
const DOT = "#d6d0c4";
const MONO = "ui-monospace, 'DejaVu Sans Mono', 'Liberation Mono', monospace";

/** The same 24px dot pitch the site body uses. */
const dots = [];
for (let y = 24; y < H; y += 24) {
  for (let x = 24; x < W; x += 24) dots.push(`<rect x="${x}" y="${y}" width="2" height="2"/>`);
}

const M = 48;
const TICK = 32;
const corners = [
  [M, M, 1, 1],
  [W - M, M, -1, 1],
  [M, H - M, 1, -1],
  [W - M, H - M, -1, -1],
]
  .map(([x, y, dx, dy]) => `M ${x + dx * TICK} ${y} L ${x} ${y} L ${x} ${y + dy * TICK}`)
  .join(" ");

/** A small node-and-edge motif, laid out on a circle so it is reproducible. */
const CX = 980;
const CY = 400;
const R = 96;
const N = 6;
const pts = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
});
const motifEdges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4]]
  .map(([a, b]) => `<line x1="${pts[a].x.toFixed(1)}" y1="${pts[a].y.toFixed(1)}" x2="${pts[b].x.toFixed(1)}" y2="${pts[b].y.toFixed(1)}" stroke="${ACCENT}" stroke-width="1.5"/>`)
  .join("");
const motifNodes = pts
  .map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="${SURFACE}" stroke="${INK}" stroke-width="2"/>`)
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <g fill="${DOT}">${dots.join("")}</g>
  <rect x="${M}" y="${M}" width="${W - M * 2}" height="${H - M * 2}" fill="none" stroke="${RULE}" stroke-width="2"/>
  <path d="${corners}" fill="none" stroke="${ACCENT}" stroke-width="4"/>

  <text x="104" y="164" font-family="${MONO}" font-size="22" letter-spacing="6" fill="${MUTED}">GRAPH ENGINEERING</text>
  <text x="104" y="256" font-family="${MONO}" font-size="76" font-weight="bold" fill="${INK}">graph-lab</text>
  <line x1="104" y1="298" x2="740" y2="298" stroke="${RULE}" stroke-width="2"/>
  <text x="104" y="352" font-family="${MONO}" font-size="26" fill="${GRAPHITE}">Memory more than one agent can trust</text>
  <text x="104" y="470" font-family="${MONO}" font-size="21" letter-spacing="2" fill="${MUTED}">86 PAGES · 23 PATTERNS · 24 STARTER KITS</text>
  <text x="104" y="504" font-family="${MONO}" font-size="21" letter-spacing="2" fill="${MUTED}">7 QUIZZES · 6 FLASHCARD SETS · 8 PROJECTS</text>

  ${motifEdges}${motifNodes}
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);
const { width, height } = await sharp(png).metadata();
console.log(`build:og OK — ${width}×${height}, ${png.length} bytes → public/og-image.png`);
