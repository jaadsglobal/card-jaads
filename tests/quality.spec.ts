import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('accessible page and touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
  for (const target of await page.locator('.social-icon, .primary-actions .action-button').all()) {
    const box = await target.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await expect(page.locator('.motion-toggle')).toHaveCount(0);
});

for (const [width, height] of [[844, 390], [568, 320]]) {
  test(`landscape layout ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const link of await page.locator('.primary-actions .action-button').all()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
      expect(await link.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return el.contains(document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2));
      })).toBe(true);
    }
  });
}

test('booking pulse respects motion preference and leaves the text steady', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const booking = page.getByRole('link', { name: 'Reservar una reunión', exact: true });
  await expect(booking).toHaveCSS('animation-name', 'booking-attention');
  await expect(booking).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(booking).toHaveCSS('animation-name', 'none');
});
