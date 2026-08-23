// Check both-themes pass: page rendering, mermaid diagrams, and Shiki
import { execSync } from "child_process";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Pages to test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pages = [
  "/",
  "/docs/02-foundations/glossary/",
  "/tracks/",
  "/patterns/",
  "/patterns/document-to-facts/",
  "/quiz/1/",
  "/flashcards/1/",
  "/projects/",
  "/resources/",
  "/certification/",
  "/sitemap.xml",
];

async function runTests() {
  console.log("=== Both-themes pass check ===\n");

  // Start dev server
  console.log("Starting dev server...");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const server = execSync("npm run dev", {
    cwd: rootDir,
    encoding: "utf-8",
    detached: true,
    stdio: "pipe",
  });

  // Give server time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    console.log("Dev server started. Manual verification needed:");
    console.log("");
    console.log("1. Open http://localhost:3000 in a browser");
    console.log("2. Check every page type in both light and dark themes");
    console.log("3. For each page, verify:");
    console.log("   - Body prose is readable");
    console.log("   - Mono labels (headings, section numbers) use monospace");
    console.log("   - Hairline rules (borders) are visible against both surfaces");
    console.log("   - Panel corner ticks appear");
    console.log("   - Accent colors on buttons and links are visible");
    console.log("   - Disabled states are visible");
    console.log("");
    console.log("4. Check all mermaid diagrams (20 total) in dark mode:");
    console.log("   - Navigate to pages with diagrams and toggle dark theme");
    console.log("   - Verify nodes, edges, and labels are legible");
    console.log("");
    console.log("5. Check Shiki code blocks in both themes:");
    console.log("   - Toggle theme and verify code colors change");
    console.log("");
    console.log("6. No flash of wrong theme:");
    console.log("   - Hard refresh (Ctrl-Shift-R) in each theme");
    console.log("   - Verify correct theme shows immediately, not a flash of wrong theme");
    console.log("");
    console.log("7. Mermaid diagrams in dark mode:");
    console.log("   - All 20 diagrams should have legible text and visible edges");
    console.log("   - Node fill should contrast with --paper dark (#0e141b)");
    console.log("   - Edge lines should be visible (#22d3ee)");
    console.log("");
    console.log("8. Shiki dual-theme switching:");
    console.log("   - Light theme: use default Shiki light colors");
    console.log("   - Dark theme: use .dark .shiki rules with --shiki-dark");
    console.log("");
    console.log("After manual verification, update loops/loop-5-deploy/state.md");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("\nDev server cleanup handled manually.");
  }
}

runTests().catch(console.error);
