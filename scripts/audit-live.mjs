import { mkdirSync, writeFileSync } from 'node:fs';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import AxeBuilder from '@axe-core/playwright';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= 'node_modules/.cache/ms-playwright';
const { chromium } = await import('playwright');
const url = process.argv[2] || 'https://card-jaads.vercel.app/';
mkdirSync('quality-reports', { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(new URL(url).origin) && response.status() >= 400) errors.push(`HTTP ${response.status()}: ${new URL(response.url()).pathname}`);
    });
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 40000 });
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    checks.push({ width, status: response.status(), errors, overflow, accessibilityViolations: accessibility.violations });
    await page.screenshot({ path: `quality-reports/production-${width}.png`, fullPage: true });
    await context.close();
  }
} finally {
  await browser.close();
}

const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
try {
  const result = await lighthouse(url, { port: chrome.port, output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], logLevel: 'error' });
  writeFileSync('quality-reports/lighthouse.html', result.report);
  writeFileSync('quality-reports/lighthouse.json', JSON.stringify(result.lhr, null, 2));
  const audits = result.lhr.audits;
  const summary = {
    url,
    scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
    metrics: {
      lcp: audits['largest-contentful-paint'].displayValue,
      cls: audits['cumulative-layout-shift'].displayValue,
      tbt: audits['total-blocking-time'].displayValue,
      transfer: audits['total-byte-weight'].displayValue,
    },
    checks,
  };
  writeFileSync('quality-reports/summary.json', JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (checks.some(check => check.status !== 200 || check.errors.length || check.overflow || check.accessibilityViolations.length)) process.exitCode = 1;
} finally {
  await chrome.kill();
}
