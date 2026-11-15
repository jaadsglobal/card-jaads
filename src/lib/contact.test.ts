import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createVCard, whatsappUrl } from './contact.ts';

const contact = { name: 'Juan Guillermo Márquez', firstName: 'Juan Guillermo', lastName: 'Márquez', brand: 'JaaDs Global', role: 'Fundador y CEO', website: 'https://jaadsglobal.com', phone: '', email: '' };
test('vCard preserves accents and omits unavailable contact data', () => {
  const card = createVCard(contact);
  assert.ok(card.includes('FN:Juan Guillermo Márquez\r\n'));
  assert.ok(card.includes('N:Márquez;Juan Guillermo;;;\r\n'));
  assert.ok(!card.includes('TEL;'));
  assert.ok(!card.includes('EMAIL;'));
  assert.ok(card.endsWith('END:VCARD\r\n'));
});
test('vCard escapes separators and folds UTF-8 lines at 75 bytes', () => {
  const card = createVCard({ ...contact, brand: 'A;B,C\\D\nE', name: 'Márquez'.repeat(30), phone: '+34123456789', email: 'contact@example.test' });
  assert.ok(card.includes('ORG:A\\;B\\,C\\\\D\\nE'));
  assert.ok(card.includes('TEL;TYPE=WORK,VOICE:+34123456789'));
  for (const line of card.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
});
test('WhatsApp ignores empty numbers and encodes the message', () => {
  assert.equal(whatsappUrl('', 'Hola'), '');
  assert.equal(whatsappUrl('+34 123 456 789', 'Hola, ¿qué tal?'), 'https://wa.me/34123456789?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F');
});
