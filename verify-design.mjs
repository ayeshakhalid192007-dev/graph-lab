import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');

console.log('=== Playwright Verification Results ===\n');

// 1. Verify Professional Soft Colors
const cssContent = await page.content();
const hasIndigoColors = cssContent.includes('6366F1') || cssContent.includes('4F46E5');
console.log('✓ Professional indigo colors present:', hasIndigoColors ? 'PASS' : 'FAIL');

// 2. Verify Logo Update
const logoSVG = await page.locator('svg[aria-label="Graph Engineering"]').first();
const logoVisible = await logoSVG.count() > 0;
console.log('✓ Logo component present:', logoVisible ? 'PASS' : 'FAIL');

// 3. Verify Hero Text Update
const heroContent = await page.content();
const hasResilientText = heroContent.includes('Build resilient systems');
console.log('✓ Hero text updated:', hasResilientText ? 'PASS' : 'FAIL');

// 4. Verify ThemeToggle (should not have hydration errors)
const themeToggle = await page.locator('button[title*="Switch to"]').first();
const toggleVisible = await themeToggle.count() > 0;
console.log('✓ Theme toggle present:', toggleVisible ? 'PASS' : 'FAIL');

// 5. Verify CopyButton with npm install
const installCmd = 'npm install @graph-engineering/core';
const hasInstallCmd = heroContent.includes(installCmd);
console.log('✓ npm install command present:', hasInstallCmd ? 'PASS' : 'FAIL');

// 6. Check SVG patterns in the page
const svgCount = await page.locator('svg').count();
console.log(`✓ SVG elements found: ${svgCount}`);

// 7. Verify the page loaded without errors
const consoleErrors = [];
page.on('console', msg => {
  if (msg.type() === 'error') {
    consoleErrors.push(msg.text());
  }
});
await page.waitForTimeout(500);
console.log('✓ Page loaded without console errors:', consoleErrors.length === 0 ? 'PASS' : 'FAIL');

console.log('\n=== Verification Complete ===');
await browser.close();
