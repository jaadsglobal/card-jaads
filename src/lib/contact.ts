export type Contact = { name: string; firstName: string; lastName: string; brand: string; role: string; website: string; phone: string; email: string };
const escapeVCard = (text: string) => text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');

export function createVCard(contact: Contact) {
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `N:${escapeVCard(contact.lastName)};${escapeVCard(contact.firstName)};;;`,
    `FN:${escapeVCard(contact.name)}`, `ORG:${escapeVCard(contact.brand)}`,
    `TITLE:${escapeVCard(contact.role)}`, `URL:${contact.website}`,
    ...(contact.phone ? [`TEL;TYPE=WORK,VOICE:${escapeVCard(contact.phone)}`] : []),
    ...(contact.email ? [`EMAIL;TYPE=WORK:${escapeVCard(contact.email)}`] : []),
    'END:VCARD',
  ];
  // vCard 3.0: fold long lines at 75 UTF-8 octets without splitting characters.
  return lines.map(line => {
    let folded = ''; let length = 0;
    for (const char of line) {
      const bytes = new TextEncoder().encode(char).length;
      if (length + bytes > 75) { folded += '\r\n '; length = 1; }
      folded += char; length += bytes;
    }
    return folded;
  }).join('\r\n') + '\r\n';
}

export function whatsappUrl(number: string, message: string) {
  const clean = number.replace(/\D/g, '');
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}` : '';
}
