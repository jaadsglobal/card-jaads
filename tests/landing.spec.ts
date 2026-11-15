import { test, expect } from '@playwright/test';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), 'VITE_');

for (const width of [320, 360, 375, 390, 414, 580, 768, 1024, 1440]) {
  test(`company card layout at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('JaaDs Global');
    await expect(page.locator('.profile-content')).toHaveCSS('opacity', '1');
    await expect(page.getByText(/Juan Guillermo|Fundador y CEO/)).toHaveCount(0);
    await expect(page.locator('.primary-actions .action-button')).toHaveText(['Reservar una reunión', 'Contactar por WhatsApp', 'Página web']);
    const booking = page.getByRole('link', { name: 'Reservar una reunión' });
    await expect(booking).toHaveAttribute('href', env.VITE_BOOKING_URL);
    await expect(booking).toHaveAttribute('target', '_blank');
    const whatsapp = page.getByRole('link', { name: 'Contactar por WhatsApp' });
    const whatsappLink = new URL((await whatsapp.getAttribute('href'))!);
    expect(whatsappLink.origin).toBe('https://wa.me');
    expect(whatsappLink.pathname).toBe(`/${env.VITE_WHATSAPP_NUMBER.replace(/\D/g, '')}`);
    expect(whatsappLink.searchParams.get('text')).toBe('Hola Guillermo, he visto tu tarjeta digital y me gustaría conocer más sobre los servicios de JaaDs Global.');
    await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.getByRole('button', { name: /Compartir|Guardar/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Nuestros servicios' })).toHaveCount(0);
    await expect(page.locator('.brand-image')).toHaveAttribute('src', '/brand/logo-jaads-256.webp');
    await expect(page.locator('.social-icon')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /LinkedIn de JaaDs Global/ })).toHaveAttribute('href', env.VITE_LINKEDIN_COMPANY_URL);
    await expect(page.getByRole('link', { name: /Facebook/ })).toHaveAttribute('href', env.VITE_FACEBOOK_URL);
    await expect(page.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', 'https://www.instagram.com/jaadsglobal/');
    const positions = await page.locator('.social-icon').evaluateAll(els => els.map(el => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(positions).size).toBe(1);
    for (const icon of await page.locator('.social-icon').all()) {
      await expect(icon).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await expect(icon).toHaveCSS('border-top-width', '0px');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/brand/favicon-64.png');
    await expect(page).toHaveTitle('JaaDs Global | Inteligencia Artificial y Automatización');
    expect(errors).toEqual([]);
    if (width === 390 || width === 1440) await page.screenshot({ path: `test-results/${testInfo.project.name}-landing-${width}.png`, fullPage: true });
  });
}

test('old services route redirects to the only card', async ({ page }) => {
  await page.goto('/servicios');
  await expect(page).toHaveURL('http://127.0.0.1:5173/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('JaaDs Global');
});

test('keyboard navigation and reduced motion', async ({ page, browserName }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // WebKit on macOS uses Option+Tab to include links in keyboard navigation.
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#contenido')).toBeFocused();
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
});
