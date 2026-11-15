import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getServiceContact } from './service-contact.ts';
import { canonicalUrl } from '../config/seo.ts';

const empty = { whatsappNumber: '', email: '', bookingUrl: '', website: '', brand: 'JaaDs Global' };
test('WhatsApp receives the selected service and encoded message', () => {
  for (const service of ['Inteligencia Artificial', 'Automatización Empresarial', 'CRM y Gestión Comercial', 'Marketing Digital', 'Desarrollo Web', 'SEO y Posicionamiento']) {
    const contact = getServiceContact(service, { ...empty, whatsappNumber: '+34 123 456 789', email: 'test@example.test' });
    const url = new URL(contact.href);
    assert.equal(url.origin + url.pathname, 'https://wa.me/34123456789');
    assert.equal(url.searchParams.get('text'), `Hola Guillermo, he visto vuestra tarjeta digital y me gustaría recibir información sobre el servicio de ${service} de JaaDs Global.`);
    assert.equal(contact.channel, 'WhatsApp');
  }
});
test('contact fallback uses only configured email, calendar, or website in order', () => {
  const config = { ...empty, email: 'test@example.test', bookingUrl: 'https://calendar.example.test', website: 'https://company.example.test' };
  const email = getServiceContact('Desarrollo Web', config);
  assert.ok(email.href.startsWith('mailto:test@example.test?'));
  assert.ok(decodeURIComponent(email.href).includes('servicio de Desarrollo Web de JaaDs Global.'));
  assert.equal(getServiceContact('SEO', { ...config, email: '' }).href, config.bookingUrl);
  assert.equal(getServiceContact('SEO', { ...config, email: '', bookingUrl: '' }).href, config.website);
  assert.equal(getServiceContact('SEO', empty).href, '');
});
test('services canonical uses the configured public card domain only', () => {
  assert.equal(canonicalUrl('', '/servicios'), '');
  assert.equal(canonicalUrl('https://card.example.test/', '/servicios'), 'https://card.example.test/servicios');
});
