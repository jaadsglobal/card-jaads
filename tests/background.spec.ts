import { test, expect } from '@playwright/test';

test('background animates quietly and becomes static with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const canvas = page.locator('.connection-background');
  await expect(canvas).toHaveAttribute('aria-hidden', 'true');
  await expect(canvas).toHaveCSS('pointer-events', 'none');
  const image = () => canvas.evaluate(element => (element as HTMLCanvasElement).toDataURL());
  const still = await image();
  await page.waitForTimeout(250);
  expect(await image()).toBe(still);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(image).not.toBe(still);
  await expect(page.getByRole('link', { name: 'Reservar una reunión', exact: true })).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  const paused = await image();
  await page.waitForTimeout(250);
  expect(await image()).toBe(paused);
  await page.getByRole('button', { name: 'Activar movimiento del fondo' }).click();
  await expect.poll(image).not.toBe(paused);
  await page.getByRole('button', { name: 'Pausar movimiento del fondo' }).click();
  await expect(page.getByRole('button', { name: 'Activar movimiento del fondo' })).toBeVisible();
});
